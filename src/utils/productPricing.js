export const WEIGHT_OPTIONS = [
  { grams: 250, label: '250g' },
  { grams: 500, label: '500g' },
  { grams: 1000, label: '1kg' },
];

export const PODI_FRYUM_WEIGHT_OPTIONS = [
  { grams: 200, label: '200g' },
  { grams: 400, label: '400g' },
  { grams: 600, label: '600g' },
];

export const GARLIC_OPTIONS = [
  { value: 'With Garlic', short: 'With Garlic', telugu: 'వెల్లుల్లితో' },
  { value: 'Without Garlic', short: 'No Garlic', telugu: 'వెల్లుల్లి లేకుండా' },
];

export function getBaseGrams(product) {
  return product.weightGrams || (product.unit === 'KG' ? 1000 : 200);
}

export function getWeightOptions(product) {
  return getBaseGrams(product) === 200 ? PODI_FRYUM_WEIGHT_OPTIONS : WEIGHT_OPTIONS;
}

export function getPriceForWeight(product, grams) {
  const base = getBaseGrams(product);
  return Math.round(product.price * (grams / base));
}

export function makeCartKey(id, weightGrams, garlic) {
  return `${id}::${weightGrams}::${garlic}`;
}

export function parseCartKey(cartKey) {
  const [id, weightGrams, garlic] = cartKey.split('::');
  return { id, weightGrams: Number(weightGrams), garlic };
}

export function getLineWeightGrams(item) {
  return Math.max(0, Number(item.weightGrams) || 0) * Math.max(0, Number(item.qty) || 0);
}

export function getCartWeightGrams(cart) {
  return (cart || []).reduce((sum, item) => sum + getLineWeightGrams(item), 0);
}

/** Short label for badges: 200g, 1kg, 1.4kg */
export function formatWeightShort(grams) {
  const g = Math.max(0, Math.round(Number(grams) || 0));
  if (g === 0) return '0g';
  if (g < 1000) return `${g}g`;
  const kg = g / 1000;
  const text = Number.isInteger(kg) ? String(kg) : String(Number(kg.toFixed(2)));
  return `${text}kg`;
}

/** Kitchen-friendly: 1.4kg (1400g) */
export function formatWeightFull(grams) {
  const g = Math.max(0, Math.round(Number(grams) || 0));
  if (g === 0) return '0g';
  if (g < 1000) return `${g}g`;
  return `${formatWeightShort(g)} (${g}g)`;
}
