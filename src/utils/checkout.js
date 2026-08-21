import { jsPDF } from 'jspdf';
import { parseDeliveryPinCode } from '../data/shipping';
import { composeCheckoutIdentity } from '../data/addressOptions';
import { formatWeightFull, getCartWeightGrams, getLineWeightGrams } from './productPricing';
import { getWhatsAppCheckoutUrl, resolveWhatsAppDesk } from './whatsappRouting';

export function generateInvoiceId() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `PJ-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

export function collectCheckoutOrderData(
  cart,
  checkoutForm,
  shippingQuote,
  cartSubtotal,
  shippingFee,
  orderTotal,
  currentUser,
) {
  if (cart.length === 0) {
    alert('Your basket is empty. Add items before checkout.');
    return null;
  }

  const form = composeCheckoutIdentity(checkoutForm);
  const {
    firstName,
    lastName,
    name,
    phone,
    email,
    street,
    apartment,
    city,
    state,
    country,
    pinCode,
    address,
  } = form;

  if (!firstName || !lastName || !phone?.trim() || !street || !city || !country || !pinCode?.trim()) {
    alert('Please fill in all required shipping address fields (name, phone, street, city, country, and PIN / ZIP).');
    return null;
  }

  const destination = parseDeliveryPinCode(pinCode, country);

  if (destination.type === 'domestic' && !state) {
    alert('Please select your state / region.');
    return null;
  }

  if (destination.type !== 'domestic' && destination.type !== 'international') {
    alert(destination.zone === 'International'
      ? 'Please enter your zip / postcode.'
      : 'Please enter a valid 6-digit Indian PIN code, or an international zip/postcode.');
    return null;
  }

  const routing = resolveWhatsAppDesk(pinCode, country);
  const { zone: shippingZone, desk } = routing;
  if (!desk) {
    alert('Please complete your shipping address so we can route this order.');
    return null;
  }

  const items = cart.map((i) => ({
    id: i.id,
    name: i.name,
    nameTe: i.nameTe || '',
    qty: i.qty,
    unitPrice: i.price,
    lineTotal: i.price * i.qty,
    weightGrams: i.weightGrams,
    weightLabel: i.weightLabel,
    lineWeightGrams: getLineWeightGrams(i),
    lineWeightLabel: formatWeightFull(getLineWeightGrams(i)),
    garlic: i.garlic,
  }));

  const totalWeightGrams = shippingQuote.totalWeightGrams ?? getCartWeightGrams(cart);
  const totalWeightLabel = shippingQuote.totalWeightLabel || formatWeightFull(totalWeightGrams);

  return {
    invoiceId: generateInvoiceId(),
    date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    name,
    phone: phone.trim(),
    email: (email || '').trim(),
    address,
    street,
    apartment: apartment || '',
    city,
    state: state || '',
    country,
    pinCode: destination.pinCode,
    shippingZone,
    destinationCountry: country || (destination.type === 'domestic' ? 'India' : 'International'),
    routeLabel: routing.routeLabel,
    shippingLabel: shippingQuote.label,
    shippingBreakdown: shippingQuote.breakdown,
    shippingTransit: shippingQuote.transit,
    shippingDisplay: shippingQuote.displayAmount,
    isCalculatedAtDispatch: shippingQuote.isCalculatedAtDispatch,
    shippingMayVary: Boolean(shippingQuote.mayVary),
    shippingTier: shippingQuote.shippingTier || null,
    totalWeightGrams,
    totalWeightLabel,
    whatsappNumber: desk.wa,
    whatsappDisplay: desk.display,
    items,
    subtotal: cartSubtotal,
    shippingFee,
    total: orderTotal,
    memberBadge: currentUser ? 'Jadi Club Member' : null,
  };
}

function rupees(amount) {
  return `Rs.${amount}`;
}

/** Helvetica cannot draw Telugu; strip it so item names do not scramble over prices. */
function pdfSafeText(value) {
  return String(value || '')
    .replace(/[\u0C00-\u0C7F]/g, '')
    .replace(/[\u0000-\u001F]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\(\s*\)/g, '')
    .trim();
}

function formatInvoiceItemLine(item, idx) {
  const pack = [item.weightLabel, item.garlic].filter(Boolean).join(', ');
  return `${idx + 1}. ${item.name} — ${pack} × ${item.qty} = ${rupees(item.lineTotal)}`;
}

export function buildWhatsAppInvoiceMessage(order) {
  const route = order.shippingZone === 'International' ? 'International' : 'India';
  const lines = [
    '*Pickle Jaadi — New Order*',
    '',
    `Invoice: ${order.invoiceId}`,
    `Date: ${order.date}`,
    `Route: ${route} · ${order.pinCode}`,
    '',
    '*Customer*',
    order.name,
    order.phone,
  ];
  if (order.email) lines.push(order.email);
  lines.push(order.address);
  if (order.country && order.shippingZone === 'International') lines.push(order.country);

  lines.push('', '*Items*');
  order.items.forEach((item, idx) => lines.push(formatInvoiceItemLine(item, idx)));

  lines.push(
    '',
    `Weight: ${order.totalWeightLabel || formatWeightFull(order.totalWeightGrams)}`,
    `Subtotal: ${rupees(order.subtotal)}`,
  );

  if (order.isCalculatedAtDispatch) {
    lines.push('Shipping: To be calculated');
    lines.push(`*Total (excl. freight): ${rupees(order.total)}*`);
  } else {
    lines.push(`Shipping: ${rupees(order.shippingFee)}`);
    lines.push(`*Total: ${rupees(order.total)}*`);
  }

  lines.push(
    '',
    'Please confirm within 12 hours. Share payment details after confirmation. If courier charge differs, inform the customer before they pay.',
  );

  return lines.join('\n');
}

/** Short confirmation kitchen can send after reviewing the order. */
export function buildOrderConfirmedCustomerMessage(order) {
  const shippingNote = order.isCalculatedAtDispatch
    ? `Shipping: to be confirmed · ${order.totalWeightLabel || formatWeightFull(order.totalWeightGrams)}`
    : `Shipping: ${rupees(order.shippingFee)}`;

  return [
    '*Pickle Jaadi — Order Confirmed*',
    '',
    `Hi ${order.name},`,
    '',
    `Your order ${order.invoiceId} is confirmed.`,
    `Amount: ${rupees(order.total)}`,
    shippingNote,
    '',
    'We will share UPI / Google Pay details on this chat. If delivery charges change, we will tell you before you pay.',
    '',
    'Thank you.',
    '— Pickle Jaadi',
  ].join('\n');
}

export function buildCustomerWhatsAppMessage(order) {
  return [
    '*Pickle Jaadi*',
    '',
    `Hi ${order.name},`,
    '',
    'Thank you. Your order has been received.',
    '',
    `Order: ${order.invoiceId}`,
    `Total: ${rupees(order.total)}`,
    `Weight: ${order.totalWeightLabel || formatWeightFull(order.totalWeightGrams)}`,
    '',
    'Our kitchen will confirm within 12 hours and then share payment details on this chat.',
    '',
    'A PDF invoice has been saved on your device.',
    '',
    '— Pickle Jaadi',
  ].join('\n');
}

export function downloadPdfReceipt(order, { autoSave = true } = {}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const brown = [75, 44, 32];
  const gold = [212, 157, 53];
  const green = [85, 124, 62];
  const cream = [246, 243, 236];

  doc.setFillColor(...brown);
  doc.rect(0, 0, 210, 36, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, 36, 210, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Pickle Jaadi', 15, 16);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Premium Andhra Storefront', 15, 23);
  doc.text('picklejaadiindia@gmail.com', 15, 29);
  doc.setFont('helvetica', 'bold');
  doc.text('TAX INVOICE', 155, 16);
  doc.setFont('helvetica', 'normal');
  doc.text(order.invoiceId, 155, 23);
  doc.text(order.date, 155, 29);

  let y = 48;
  doc.setTextColor(...brown);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Details', 15, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Name: ${order.name}`, 15, y);
  y += 6;
  doc.text(`WhatsApp: ${order.phone}`, 15, y);
  y += 6;
  const addressLines = doc.splitTextToSize(`Address: ${order.address}`, 180);
  doc.text(addressLines, 15, y);
  y += addressLines.length * 5 + 2;
  doc.text(`Pin / Zip: ${order.pinCode}`, 15, y);
  y += 6;
  if (order.country) {
    doc.text(`Country: ${order.country}`, 15, y);
    y += 6;
  }
  doc.text(`Dispatch Route: ${order.shippingZone}`, 15, y);
  y += 6;
  doc.text(`Kitchen Desk: ${order.whatsappDisplay}`, 15, y);
  y += 6;
  if (order.memberBadge) {
    doc.setTextColor(...green);
    doc.text(`Member: ${order.memberBadge}`, 15, y);
    y += 6;
    doc.setTextColor(60, 60, 60);
  }
  y += 4;

  const colNo = 18;
  const colDesc = 26;
  const descWidth = 88;
  const colQty = 128;
  const colRate = 158;
  const colAmt = 195;

  doc.setFillColor(...cream);
  doc.rect(15, y - 4, 180, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brown);
  doc.text('#', colNo, y);
  doc.text('Item', colDesc, y);
  doc.text('Qty', colQty, y, { align: 'right' });
  doc.text('Rate', colRate, y, { align: 'right' });
  doc.text('Amount', colAmt, y, { align: 'right' });
  y += 10;

  doc.setFont('helvetica', 'normal');
  order.items.forEach((item, idx) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    const nameLines = doc.splitTextToSize(pdfSafeText(item.name) || 'Item', descWidth);
    const pack = [item.weightLabel, item.garlic].filter(Boolean).join(' · ');
    const rowHeight = nameLines.length * 5 + (pack ? 5 : 0) + 4;

    doc.setTextColor(60, 60, 60);
    doc.text(String(idx + 1), colNo, y);
    doc.text(nameLines, colDesc, y);
    if (pack) {
      doc.setFontSize(8);
      doc.setTextColor(110, 110, 110);
      doc.text(pack, colDesc, y + nameLines.length * 5);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
    }
    doc.text(String(item.qty), colQty, y, { align: 'right' });
    doc.text(`Rs.${item.unitPrice}`, colRate, y, { align: 'right' });
    doc.text(`Rs.${item.lineTotal}`, colAmt, y, { align: 'right' });
    y += rowHeight;
  });

  y += 4;
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(15, y, 195, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text('Subtotal:', 115, y);
  doc.text(`Rs.${order.subtotal}.00`, colAmt, y, { align: 'right' });
  y += 7;
  doc.text('Total order weight:', 15, y);
  doc.text(order.totalWeightLabel || formatWeightFull(order.totalWeightGrams), colAmt, y, { align: 'right' });
  y += 7;
  const shippingLine = order.isCalculatedAtDispatch
    ? 'Shipping: To be calculated'
    : `Shipping (${order.shippingLabel}):`;
  doc.text(shippingLine, 15, y);
  if (!order.isCalculatedAtDispatch) {
    doc.text(`Rs.${order.shippingFee}.00`, colAmt, y, { align: 'right' });
  }
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...brown);
  doc.text(order.isCalculatedAtDispatch ? 'TOTAL (excl. intl. freight):' : 'TOTAL AMOUNT DUE:', 115, y);
  doc.text(`Rs.${order.total}.00`, colAmt, y, { align: 'right' });
  y += 12;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...green);
  const freshNote = 'You will receive a WhatsApp message titled ORDER CONFIRMED within 12 hours. That message is your official confirmation. Fresh prep starts only after confirmation.';
  doc.text(doc.splitTextToSize(freshNote, 180), 15, y);
  y += 14;
  doc.setTextColor(120, 120, 120);
  doc.text('Thank you for choosing Pickle Jaadi. FSSAI Registered Unit.', 15, y);

  if (autoSave) {
    doc.save(`Pickle-Jaadi-${order.invoiceId}.pdf`);
  }
  return doc;
}

/**
 * Full checkout: PDF for the customer + one short WhatsApp invoice to the kitchen desk.
 */
export function processFullInvoiceCheckout(order) {
  downloadPdfReceipt(order);
  window.open(getWhatsAppCheckoutUrl(order.whatsappNumber, buildWhatsAppInvoiceMessage(order)), '_blank');
  return order;
}

export function openWhatsAppCheckout(order) {
  processFullInvoiceCheckout(order);
}
