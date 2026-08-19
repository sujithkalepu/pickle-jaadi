export default function UtilityBar() {
  return (
    <div className="bg-[var(--heritageBrown)] text-white text-[10px] sm:text-xs py-2 px-4 shadow-sm relative z-[60] border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1.5 font-bold tracking-wide">
        <div className="flex flex-col sm:flex-row items-center gap-1.5 text-gray-200 text-center sm:text-left">
          <span>🌍 We ship across India &amp; internationally</span>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span className="font-medium text-[9px] sm:text-[11px] text-amber-100/90 max-w-xl">
            Customs duties, import taxes &amp; local charges (if any) are the customer&apos;s responsibility
          </span>
        </div>
        <div className="text-[var(--heritageGold)] hidden md:block shrink-0">
          Premium Andhra Pickles · Podis · Fryums
        </div>
      </div>
    </div>
  );
}
