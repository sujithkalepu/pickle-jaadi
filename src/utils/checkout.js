import { jsPDF } from 'jspdf';
import { parseDeliveryPinCode } from '../data/shipping';
import { getWhatsAppCheckoutUrl, normalizeCustomerWhatsAppNumber, resolveWhatsAppDesk } from './whatsappRouting';

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

  const { name, phone, address, pinCode } = checkoutForm;
  if (!name?.trim() || !phone?.trim() || !address?.trim() || !pinCode?.trim()) {
    alert('Please fill in your name, WhatsApp number, address, and Pin Code / Zip Code.');
    return null;
  }

  const destination = parseDeliveryPinCode(pinCode);
  if (destination.type !== 'domestic' && destination.type !== 'international') {
    alert('Please enter a valid 6-digit Indian PIN or international zip/postcode.');
    return null;
  }

  const routing = resolveWhatsAppDesk(pinCode);
  const { zone: shippingZone, desk } = routing;

  const items = cart.map((i) => ({
    id: i.id,
    name: i.name,
    qty: i.qty,
    unitPrice: i.price,
    lineTotal: i.price * i.qty,
    weightLabel: i.weightLabel,
    garlic: i.garlic,
  }));

  return {
    invoiceId: generateInvoiceId(),
    date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    name: name.trim(),
    phone: phone.trim(),
    address: address.trim(),
    pinCode: destination.pinCode,
    shippingZone,
    destinationCountry: destination.type === 'domestic' ? 'India' : 'International',
    routeLabel: routing.routeLabel,
    shippingLabel: shippingQuote.label,
    shippingBreakdown: shippingQuote.breakdown,
    shippingTransit: shippingQuote.transit,
    shippingDisplay: shippingQuote.displayAmount,
    isCalculatedAtDispatch: shippingQuote.isCalculatedAtDispatch,
    whatsappNumber: desk.wa,
    whatsappDisplay: desk.display,
    items,
    subtotal: cartSubtotal,
    shippingFee,
    total: orderTotal,
    memberBadge: currentUser ? 'Jadi Club Member' : null,
  };
}

export function buildWhatsAppInvoiceMessage(order) {
  const routeLabel = order.shippingZone === 'International' ? 'Global Export' : 'Within India';
  let msg = '*PICKLE JAADI — OFFICIAL ORDER INVOICE*\n';
  msg += '━━━━━━━━━━━━━━━━━━━━\n';
  msg += `*Invoice No:* ${order.invoiceId}\n`;
  msg += `*Date:* ${order.date}\n`;
  msg += `*Dispatch Route:* ${routeLabel}\n`;
  msg += `*Pin / Zip:* ${order.pinCode}\n`;
  msg += `*Kitchen Desk:* ${order.whatsappDisplay}\n`;
  if (order.memberBadge) msg += `*Member Status:* ${order.memberBadge}\n`;
  msg += '\n*CUSTOMER DETAILS*\n';
  msg += `Name: ${order.name}\n`;
  msg += `WhatsApp: ${order.phone}\n`;
  msg += `Address: ${order.address}\n`;
  msg += '\n*ORDER ITEMS*\n';
  order.items.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.name}\n`;
    msg += `   ${item.weightLabel} · ${item.garlic}\n`;
    msg += `   Qty: ${item.qty} x Rs.${item.unitPrice} = *Rs.${item.lineTotal}*\n`;
  });
  msg += '\n━━━━━━━━━━━━━━━━━━━━\n';
  msg += `*SUBTOTAL:* Rs.${order.subtotal}.00\n`;
  if (order.isCalculatedAtDispatch) {
    msg += `*SHIPPING:* Calculated at Dispatch\n`;
    msg += `*TOTAL (excl. intl. freight):* *Rs.${order.total}.00*\n`;
  } else {
    msg += `*SHIPPING (${order.shippingLabel}):* Rs.${order.shippingFee}.00\n`;
    msg += `*TOTAL AMOUNT DUE:* *Rs.${order.total}.00*\n`;
  }
  msg += '\n*FRESH PREP COMMITMENT:*\n';
  msg += 'Your order will be prepared freshly from scratch within our strict 12-hour kitchen confirmation window.\n';
  msg += '\nPlease confirm this invoice to initiate preparation. Thank you for choosing Pickle Jaadi!';
  return msg;
}

export function buildCustomerWhatsAppMessage(order) {
  let msg = `*PICKLE JAADI — ORDER RECEIVED*\n`;
  msg += '━━━━━━━━━━━━━━━━━━━━\n';
  msg += `Hi ${order.name}! Thank you for your order.\n\n`;
  msg += `*Order No:* ${order.invoiceId}\n`;
  msg += `*Status:* Pending Kitchen Confirmation\n`;
  msg += `*Date:* ${order.date}\n`;
  msg += `*Total:* Rs.${order.total}.00\n`;
  msg += `*Kitchen Desk:* ${order.whatsappDisplay}\n\n`;
  msg += `📄 Your PDF invoice has been downloaded — please keep it.\n\n`;
  msg += `*Next steps:*\n`;
  msg += `1. Our kitchen will confirm your order on WhatsApp within 12 hours.\n`;
  msg += `2. After confirmation, we share payment details (UPI / Google Pay).\n`;
  msg += `3. Fresh preparation starts only after order confirmation.\n\n`;
  msg += `Reply to this chat if you have questions. — Pickle Jaadi`;
  return msg;
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

  doc.setFillColor(...cream);
  doc.rect(15, y - 4, 180, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brown);
  doc.text('#', 18, y);
  doc.text('Item Description', 28, y);
  doc.text('Qty', 130, y);
  doc.text('Rate', 150, y);
  doc.text('Amount', 175, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  order.items.forEach((item, idx) => {
    if (y > 265) {
      doc.addPage();
      y = 20;
    }
    doc.setTextColor(60, 60, 60);
    doc.text(String(idx + 1), 18, y);
    const itemLabel = `${item.name} (${item.weightLabel}, ${item.garlic})`;
    const nameLines = doc.splitTextToSize(itemLabel, 95);
    doc.text(nameLines, 28, y);
    doc.text(String(item.qty), 132, y);
    doc.text(`Rs.${item.unitPrice}`, 150, y);
    doc.text(`Rs.${item.lineTotal}`, 172, y);
    y += Math.max(nameLines.length * 5, 7) + 2;
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
  doc.text(`Rs.${order.subtotal}.00`, 172, y);
  y += 7;
  const shippingLine = order.isCalculatedAtDispatch
    ? 'Shipping: Calculated at Dispatch'
    : `Shipping (${order.shippingLabel}):`;
  doc.text(shippingLine, 15, y);
  if (!order.isCalculatedAtDispatch) {
    doc.text(`Rs.${order.shippingFee}.00`, 172, y);
  }
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...brown);
  doc.text(order.isCalculatedAtDispatch ? 'TOTAL (excl. intl. freight):' : 'TOTAL AMOUNT DUE:', 115, y);
  doc.text(`Rs.${order.total}.00`, 172, y);
  y += 12;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...green);
  const freshNote = 'Fresh Prep Commitment: This order will be prepared freshly from scratch within a strict 12-hour kitchen confirmation window.';
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
 * Full checkout: PDF for customer + WhatsApp invoice to kitchen desk + WhatsApp copy to customer.
 * Kitchen desk is chosen from pin code (domestic vs international).
 */
export function processFullInvoiceCheckout(order) {
  downloadPdfReceipt(order);

  const kitchenMsg = buildWhatsAppInvoiceMessage(order);
  window.open(getWhatsAppCheckoutUrl(order.whatsappNumber, kitchenMsg), '_blank');

  const customerWa = normalizeCustomerWhatsAppNumber(order.phone, order.shippingZone);
  if (customerWa) {
    window.setTimeout(() => {
      const customerMsg = buildCustomerWhatsAppMessage(order);
      window.open(getWhatsAppCheckoutUrl(customerWa, customerMsg), '_blank');
    }, 900);
  }

  return order;
}

export function openWhatsAppCheckout(order) {
  processFullInvoiceCheckout(order);
}
