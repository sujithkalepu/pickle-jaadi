export const WEIGHT_OPTIONS = [
  { grams: 250, label: '250g' },
  { grams: 500, label: '500g' },
  { grams: 1000, label: '1kg' },
];

export const GARLIC_OPTIONS = [
  { value: 'With Garlic', short: 'With Garlic', telugu: 'వెల్లుల్లితో' },
  { value: 'Without Garlic', short: 'No Garlic', telugu: 'వెల్లుల్లి లేకుండా' },
];

export function getBaseGrams(product) {
  return product.unit === 'KG' ? 1000 : 200;
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
