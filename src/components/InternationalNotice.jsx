export function InternationalNotice({ variant = 'banner' }) {
  if (variant === 'banner') {
    return (
      <span className="text-center sm:text-left">
        We ship within India and internationally · Customs duties, import taxes &amp; local charges (if any) are the customer&apos;s responsibility
      </span>
    );
  }

  if (variant === 'checkout') {
    return (
      <div className="rounded-lg p-2.5 text-[10px] border border-amber-200 bg-amber-50 text-amber-950 leading-relaxed space-y-1.5">
        <p className="font-black uppercase tracking-wider text-[9px]">🌍 International Shipping Notice</p>
        <ul className="list-disc pl-3.5 space-y-1">
          <li>International orders are coordinated with <strong>Savitri Foods</strong>, a Singapore-registered company, and shipped via international courier (DHL / partner).</li>
          <li>Shipping is <strong>to be calculated</strong>. Your cart shows the total order weight so we can quote the courier cost on WhatsApp before you pay.</li>
          <li>Estimated delivery time is 7–15 business days.</li>
          <li>
            <strong>Customs duties, import taxes, and local charges (if any) are the responsibility of the customer.</strong>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] space-y-2 text-amber-950">
      <p className="font-black text-[var(--heritageBrown)] uppercase tracking-wider text-[10px]">International Shipping</p>
      <ul className="list-disc pl-4 space-y-1 leading-relaxed">
        <li>International orders are coordinated with <strong>Savitri Foods</strong> (Singapore-registered) and shipped via courier partners such as DHL.</li>
        <li>Shipping is <strong>to be calculated</strong>. Total order weight is shown in your cart and on the invoice so we can confirm courier cost on WhatsApp before payment.</li>
        <li>Estimated delivery time is 7–15 business days.</li>
        <li>
          <strong>Customs duties, import taxes, and local charges (if any) are the responsibility of the customer.</strong>
        </li>
      </ul>
    </div>
  );
}

export default InternationalNotice;
