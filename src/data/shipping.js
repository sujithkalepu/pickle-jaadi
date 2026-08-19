import { formatWeightFull, formatWeightShort, getCartWeightGrams } from '../utils/productPricing';

/** India: ₹149 covers the first 1000g. */
export const DOMESTIC_BASE_SHIPPING = 149;
export const DOMESTIC_BASE_WEIGHT_G = 1000;
/** Extra ₹60 for every additional 1000g or part thereof. */
export const DOMESTIC_ADDITIONAL_PER_KG = 60;
export const DOMESTIC_PIN_SHIPPING = DOMESTIC_BASE_SHIPPING;

const PIN_CIRCLE_LABELS = {
  11: 'Delhi NCR', 12: 'Haryana', 13: 'Punjab', 14: 'Punjab', 15: 'Punjab', 16: 'Chandigarh',
  17: 'Himachal Pradesh', 18: 'Jammu & Kashmir', 19: 'J&K / Ladakh',
  20: 'Uttar Pradesh', 21: 'Uttar Pradesh', 22: 'Uttar Pradesh', 23: 'Uttar Pradesh',
  24: 'Uttarakhand', 25: 'Uttar Pradesh', 26: 'Uttarakhand', 27: 'Uttar Pradesh', 28: 'Uttar Pradesh',
  30: 'Rajasthan', 31: 'Rajasthan', 32: 'Rajasthan', 33: 'Rajasthan', 34: 'Rajasthan',
  36: 'Gujarat', 37: 'Gujarat', 38: 'Gujarat', 39: 'Gujarat',
  40: 'Mumbai / Maharashtra', 41: 'Pune / Maharashtra', 42: 'Maharashtra', 43: 'Maharashtra',
  44: 'Nagpur / Maharashtra', 45: 'Madhya Pradesh', 46: 'Madhya Pradesh', 47: 'Madhya Pradesh',
  48: 'Chhattisgarh', 49: 'Chhattisgarh',
  50: 'Hyderabad / Telangana', 51: 'Telangana', 52: 'Andhra Pradesh', 53: 'Coastal Andhra (Kakinada region)',
  54: 'Andhra / Telangana', 55: 'Andhra / Telangana',
  56: 'Bengaluru / Karnataka', 57: 'Karnataka', 58: 'Karnataka', 59: 'Karnataka',
  60: 'Chennai / Tamil Nadu', 61: 'Tamil Nadu', 62: 'Tamil Nadu', 63: 'Tamil Nadu', 64: 'Tamil Nadu',
  67: 'Kerala', 68: 'Kerala', 69: 'Kerala',
  70: 'Kolkata / West Bengal', 71: 'West Bengal', 72: 'West Bengal', 73: 'North Bengal / Sikkim',
  74: 'Andaman & Nicobar', 75: 'Odisha', 76: 'Odisha', 77: 'Odisha',
  78: 'Assam / Northeast', 79: 'Northeast',
  80: 'Bihar', 81: 'Bihar', 82: 'Bihar', 83: 'Jharkhand', 84: 'Bihar', 85: 'Bihar',
};

export const INTERNATIONAL_SHIPPING = {
  mode: 'calculated',
  fixedRate: 2800,
  label: 'International Export',
  transit: '7–15 business days (confirmed at dispatch)',
  feeLabel: 'To be calculated',
};

export function parseDeliveryPinCode(rawValue, country = 'India') {
  const trimmed = (rawValue || '').trim();
  const compact = trimmed.replace(/\s/g, '');
  const intlCountry = Boolean(country && country !== 'India');

  if (intlCountry) {
    if (!compact) {
      return { type: 'international-pending', zone: 'International', pinCode: '' };
    }
    return { type: 'international', zone: 'International', pinCode: trimmed };
  }

  if (!compact) {
    return { type: 'pending', zone: null, pinCode: '' };
  }

  // Indian PINs are 6 digits and do not start with 0. Leading-zero 6-digit codes (e.g. Singapore) are international.
  if (/^\d{6}$/.test(compact)) {
    if (compact.startsWith('0')) {
      return { type: 'international', zone: 'International', pinCode: compact };
    }
    return { type: 'domestic', zone: 'Domestic', pinCode: compact };
  }

  // Still typing a 6-digit Indian PIN
  if (/^\d{1,4}$/.test(compact)) {
    if (compact.length >= 2) {
      return { type: 'domestic-preview', zone: 'Domestic', pinCode: compact };
    }
    return { type: 'typing', zone: null, pinCode: trimmed };
  }

  // 5-digit ZIP, ZIP+4, UK/Canada postcodes, etc. — international
  if (compact.length >= 3) {
    return { type: 'international', zone: 'International', pinCode: trimmed };
  }

  return { type: 'typing', zone: null, pinCode: trimmed };
}

export function getPinRegionLabel(pinCode) {
  const pin = String(pinCode || '').replace(/\D/g, '');
  if (pin.length < 2) return '';
  return PIN_CIRCLE_LABELS[Number(pin.slice(0, 2))] || 'India';
}

export function calculateDomesticShippingByWeight(totalGrams) {
  const grams = Math.max(0, Math.round(Number(totalGrams) || 0));
  if (grams <= 0) {
    return { amount: 0, extraSlabs: 0, grams };
  }
  const extraSlabs = Math.ceil(Math.max(0, grams - DOMESTIC_BASE_WEIGHT_G) / DOMESTIC_BASE_WEIGHT_G);
  const amount = DOMESTIC_BASE_SHIPPING + extraSlabs * DOMESTIC_ADDITIONAL_PER_KG;
  return { amount, extraSlabs, grams };
}

export function describeDomesticWeightRate(totalGrams) {
  const { amount, extraSlabs, grams } = calculateDomesticShippingByWeight(totalGrams);
  if (grams <= 0) return 'Add items to calculate shipping';
  if (extraSlabs === 0) {
    return `₹${DOMESTIC_BASE_SHIPPING} for the first 1kg · ${formatWeightFull(grams)}`;
  }
  return `₹${DOMESTIC_BASE_SHIPPING} first 1kg + ₹${DOMESTIC_ADDITIONAL_PER_KG} × ${extraSlabs} extra kg · ${formatWeightFull(grams)}`;
}

function weightFields(cart) {
  const totalWeightGrams = getCartWeightGrams(cart);
  return {
    totalWeightGrams,
    totalWeightLabel: formatWeightFull(totalWeightGrams),
    totalWeightShort: formatWeightShort(totalWeightGrams),
  };
}

function emptyQuote(destination, extras = {}, cart = []) {
  return {
    type: extras.type || destination.type || 'pending',
    zone: extras.zone || null,
    amount: 0,
    displayAmount: extras.displayAmount || '—',
    label: extras.label || 'Delivery Destination',
    breakdown: extras.breakdown || '',
    transit: extras.transit || '—',
    pinCode: destination.pinCode,
    isCalculatedAtDispatch: false,
    mayVary: extras.mayVary || false,
    methodName: extras.methodName || 'Shipping',
    regionLabel: extras.regionLabel || '',
    destination,
    ...weightFields(cart),
  };
}

function internationalQuote(destination, country, cart) {
  const useFixed = INTERNATIONAL_SHIPPING.mode === 'fixed';
  const intlAmount = useFixed ? INTERNATIONAL_SHIPPING.fixedRate : 0;
  const placeLabel = country && country !== 'India' ? country : destination.pinCode || 'your country';
  const weights = weightFields(cart);

  return {
    type: 'international',
    zone: 'International',
    amount: intlAmount,
    displayAmount: useFixed ? `₹${INTERNATIONAL_SHIPPING.fixedRate}` : INTERNATIONAL_SHIPPING.feeLabel,
    label: INTERNATIONAL_SHIPPING.label,
    breakdown: useFixed
      ? `International export to ${placeLabel} · ${weights.totalWeightLabel}`
      : `To be calculated · order weight ${weights.totalWeightLabel} — kitchen will confirm courier cost on WhatsApp`,
    transit: INTERNATIONAL_SHIPPING.transit,
    pinCode: destination.pinCode,
    isCalculatedAtDispatch: !useFixed,
    mayVary: !useFixed,
    methodName: 'International shipping',
    regionLabel: country && country !== 'India' ? country : 'International',
    destination,
    ...weights,
  };
}

export function calculateShippingFromPinCode(cart, pinCodeRaw, address = '', country = 'India') {
  const destination = parseDeliveryPinCode(pinCodeRaw, country);
  const weights = weightFields(cart);

  if (cart.length === 0) {
    return emptyQuote(destination, {
      breakdown: 'Add items to calculate shipping',
    }, cart);
  }

  if (destination.type === 'international' || destination.type === 'international-pending') {
    return internationalQuote(destination, country, cart);
  }

  if (destination.type === 'pending' || destination.type === 'typing') {
    return emptyQuote(destination, {
      type: destination.type,
      displayAmount: 'Enter Pin / Zip',
      breakdown: `Order weight ${weights.totalWeightLabel}. Enter a 6-digit Indian PIN or international zip/postcode.`,
    }, cart);
  }

  if (destination.type === 'domestic' || destination.type === 'domestic-preview') {
    const loc = calculateDomesticShippingByWeight(weights.totalWeightGrams);
    const isPreview = destination.type === 'domestic-preview';
    const region = getPinRegionLabel(destination.pinCode) || 'India';

    return {
      type: isPreview ? 'domestic-preview' : 'domestic',
      zone: 'Domestic',
      amount: loc.amount,
      displayAmount: `₹${loc.amount}`,
      label: 'India · by weight',
      breakdown: describeDomesticWeightRate(weights.totalWeightGrams),
      transit: '2–5 business days',
      pinCode: destination.pinCode,
      isCalculatedAtDispatch: false,
      mayVary: false,
      shippingTier: loc.extraSlabs === 0 ? 'base' : 'extra',
      methodName: 'Weight-based',
      regionLabel: region,
      extraSlabs: loc.extraSlabs,
      destination,
      ...weights,
    };
  }

  return internationalQuote(destination, country, cart);
}

export function getOrderTotal(cartSubtotal, shippingQuote) {
  if (shippingQuote.isCalculatedAtDispatch) return cartSubtotal;
  if (shippingQuote.type === 'domestic-preview') return cartSubtotal + shippingQuote.amount;
  return cartSubtotal + shippingQuote.amount;
}

export function formatShippingLine(shippingQuote) {
  if (shippingQuote.isCalculatedAtDispatch) return INTERNATIONAL_SHIPPING.feeLabel;
  if (shippingQuote.amount === 0 && (shippingQuote.type === 'pending' || shippingQuote.type === 'typing')) {
    return 'Enter Pin / Zip';
  }
  if (shippingQuote.type === 'domestic' || shippingQuote.type === 'domestic-preview') {
    return `₹${shippingQuote.amount}`;
  }
  return shippingQuote.displayAmount;
}
