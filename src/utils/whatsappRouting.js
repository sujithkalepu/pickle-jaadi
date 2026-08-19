import { WHATSAPP_DESK_NUMBERS } from '../data/products';
import { parseDeliveryPinCode } from '../data/shipping';

/**
 * Routes invoice / WhatsApp checkout to the correct kitchen desk from pin/zip.
 * - 6-digit Indian PIN  → Domestic  (+91 7989350068)
 * - International zip   → International (+65 9116 9217)
 */
export function resolveWhatsAppDesk(pinCode, country = 'India') {
  const destination = parseDeliveryPinCode(pinCode, country);
  const zone = destination.zone;

  if (!zone) {
    return {
      zone: null,
      desk: null,
      destination,
      routeLabel: null,
      isRoutable: false,
    };
  }

  const desk = WHATSAPP_DESK_NUMBERS[zone];

  return {
    zone,
    desk,
    destination,
    routeLabel: zone === 'International' ? 'Global Export Desk' : 'India Domestic Desk',
    isRoutable: destination.type === 'domestic' || destination.type === 'international',
  };
}

export function getWhatsAppCheckoutUrl(waNumber, message) {
  const normalized = String(waNumber).replace(/\D/g, '');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

/** Normalize customer WhatsApp from checkout phone field. */
export function normalizeCustomerWhatsAppNumber(phone, shippingZone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return null;

  if (digits.length >= 11) return digits;

  if (digits.length === 10 && shippingZone === 'Domestic') {
    return `91${digits}`;
  }

  if (digits.length >= 8) return digits;

  return null;
}
