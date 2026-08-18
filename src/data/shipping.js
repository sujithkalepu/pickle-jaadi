/** Domestic flat rate when a valid 6-digit Indian PIN is entered. */
export const DOMESTIC_PIN_SHIPPING = 149;

/**
 * International shipping behaviour.
 * - 'calculated': shows "Calculated at Dispatch" (not added to cart total)
 * - 'fixed': adds FIXED_RATE to the total bill
 */
export const INTERNATIONAL_SHIPPING = {
  mode: 'calculated',
  fixedRate: 2800,
  label: 'International Export',
  transit: '7–15 business days (confirmed at dispatch)',
};

export function parseDeliveryPinCode(rawValue) {
  const trimmed = (rawValue || '').trim();
  const compact = trimmed.replace(/\s/g, '');

  if (!compact) {
    return { type: 'pending', zone: null, pinCode: '' };
  }

  if (/^\d{6}$/.test(compact)) {
    return { type: 'domestic', zone: 'Domestic', pinCode: compact };
  }

  if (compact.length >= 3) {
    return { type: 'international', zone: 'International', pinCode: trimmed };
  }

  return { type: 'typing', zone: null, pinCode: trimmed };
}

export function calculateShippingFromPinCode(cart, pinCodeRaw) {
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const destination = parseDeliveryPinCode(pinCodeRaw);

  if (cart.length === 0) {
    return {
      type: 'pending',
      zone: null,
      amount: 0,
      displayAmount: '—',
      label: 'Delivery Destination',
      breakdown: 'Add items to calculate shipping',
      transit: '—',
      pinCode: destination.pinCode,
      isCalculatedAtDispatch: false,
      destination,
    };
  }

  if (destination.type === 'pending' || destination.type === 'typing') {
    return {
      type: destination.type,
      zone: null,
      amount: 0,
      displayAmount: 'Enter Pin / Zip',
      label: 'Delivery Destination',
      breakdown: 'Enter a 6-digit Indian PIN or international zip/postcode',
      transit: '—',
      pinCode: destination.pinCode,
      isCalculatedAtDispatch: false,
      destination,
    };
  }

  if (destination.type === 'domestic') {
    return {
      type: 'domestic',
      zone: 'Domestic',
      amount: DOMESTIC_PIN_SHIPPING,
      displayAmount: `₹${DOMESTIC_PIN_SHIPPING}`,
      label: 'Within India',
      breakdown: `Domestic delivery to PIN ${destination.pinCode}`,
      transit: '2–4 business days',
      pinCode: destination.pinCode,
      isCalculatedAtDispatch: false,
      destination,
    };
  }

  const useFixed = INTERNATIONAL_SHIPPING.mode === 'fixed';
  const intlAmount = useFixed ? INTERNATIONAL_SHIPPING.fixedRate : 0;

  return {
    type: 'international',
    zone: 'International',
    amount: intlAmount,
    displayAmount: useFixed ? `₹${INTERNATIONAL_SHIPPING.fixedRate}` : 'Calculated at Dispatch',
    label: INTERNATIONAL_SHIPPING.label,
    breakdown: useFixed
      ? `International export to ${destination.pinCode}`
      : `Export freight to ${destination.pinCode} — final rate confirmed before dispatch`,
    transit: INTERNATIONAL_SHIPPING.transit,
    pinCode: destination.pinCode,
    isCalculatedAtDispatch: !useFixed,
    destination,
  };
}

export function getOrderTotal(cartSubtotal, shippingQuote) {
  if (shippingQuote.isCalculatedAtDispatch) return cartSubtotal;
  return cartSubtotal + shippingQuote.amount;
}

export function formatShippingLine(shippingQuote) {
  if (shippingQuote.isCalculatedAtDispatch) return 'Calculated at Dispatch';
  if (shippingQuote.amount === 0 && shippingQuote.type === 'pending') return 'Enter Pin / Zip';
  return shippingQuote.displayAmount;
}
