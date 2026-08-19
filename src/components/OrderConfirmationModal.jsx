import { useStore } from '../context/StoreContext';

export default function OrderConfirmationModal() {
  const { orderConfirmation, setOrderConfirmation } = useStore();

  if (!orderConfirmation) return null;

  const { invoiceId, name, total, whatsappDisplay, shippingZone, date } = orderConfirmation;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOrderConfirmation(null)} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="bg-[var(--heritageBrown)] text-white px-5 py-4 text-center">
          <div className="text-3xl mb-1">✅</div>
          <h2 className="font-serif font-black text-lg">Order Received!</h2>
          <p className="text-[11px] text-white/80 mt-1">Your order is pending kitchen confirmation</p>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900">
            <p className="font-black uppercase tracking-wider text-[9px] opacity-70">Order Number</p>
            <p className="font-mono font-black text-sm mt-0.5">{invoiceId}</p>
            <p className="mt-2 text-[11px] leading-relaxed">
              Hi <strong>{name}</strong>, we received your order on {date}. Our kitchen team will confirm it on WhatsApp shortly.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-black uppercase tracking-wider text-[10px] text-gray-400">What happens next</p>
            <ol className="space-y-2 text-[11px] text-gray-700 leading-relaxed list-decimal list-inside">
              <li>Your PDF invoice was downloaded to this device.</li>
              <li>WhatsApp opened with your order sent to <strong>{whatsappDisplay}</strong>.</li>
              <li>Our kitchen confirms your order within <strong>12 hours</strong> on WhatsApp.</li>
              <li>After confirmation, you receive payment details (UPI / Google Pay) and dispatch updates.</li>
            </ol>
          </div>

          <div className="flex justify-between items-center border-t pt-3 font-black text-[var(--heritageBrown)]">
            <span>Order Total ({shippingZone})</span>
            <span className="text-base">₹{total}.00</span>
          </div>

          <p className="text-[10px] text-center text-gray-400 leading-relaxed">
            Save your invoice number <strong className="text-[var(--heritageBrown)]">{invoiceId}</strong> for any follow-up on WhatsApp.
          </p>

          <button
            type="button"
            onClick={() => setOrderConfirmation(null)}
            className="w-full bg-[var(--heritageGold)] text-[var(--heritageBrown)] py-3 rounded-xl font-black uppercase tracking-wider text-xs hover:brightness-105 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
