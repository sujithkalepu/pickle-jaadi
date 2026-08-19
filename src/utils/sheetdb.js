import { SHEETDB_API_URL } from '../data/sheetdb';

function formatItemList(items = []) {
  return items
    .map((item) => `${item.name} (${item.weightLabel || item.unit || 'item'}) x${item.qty}`)
    .join(', ');
}

export function buildSheetOrderRow(order, currentUser) {
  const total = order.isCalculatedAtDispatch
    ? `Rs.${order.total}.00 + shipping to be calculated`
    : `Rs.${order.total}.00`;

  const isMember = Boolean(currentUser || order.memberBadge);
  const email = isMember
    ? (currentUser?.email || order.email || '').trim()
    : (order.email || '').trim();

  return {
    Date: order.date || '',
    Name: order.name || '',
    Phone: order.phone || '',
    Email: email,
    Address: order.address || '',
    PinCode: order.pinCode || '',
    Zone: order.shippingZone || '',
    Items: formatItemList(order.items),
    Weight: order.totalWeightLabel || '',
    Total: total,
    Status: 'Pending',
  };
}

export async function logOrderToSheet(order, currentUser) {
  const endpoint = SHEETDB_API_URL;
  if (!endpoint || /PASTE YOUR URL HERE/i.test(endpoint) || endpoint.endsWith('/api/v1')) {
    throw new Error('SheetDB API URL is missing. Paste your SheetDB URL in src/data/sheetdb.js');
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [buildSheetOrderRow(order, currentUser)],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`SheetDB returned ${response.status}`);
    }

    const result = await response.json().catch(() => ({}));
    if (result && typeof result.created !== 'undefined' && Number(result.created) < 1) {
      throw new Error('SheetDB did not create a row');
    }

    return result;
  } finally {
    window.clearTimeout(timer);
  }
}
