export default function UtilityBar() {
  return (
    <div className="bg-[var(--heritageBrown)] text-white text-[10px] sm:text-xs py-2 px-4 shadow-sm relative z-[60] border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1.5 font-bold tracking-wide">
        <div className="flex items-center gap-1.5 text-gray-200">
          <span>🌍 Global Delivery Available</span>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span>🧑‍🍳 Freshly Prepared Post-Order</span>
        </div>
        <div className="text-[var(--heritageGold)] hidden sm:block">
          Premium Andhra Pickles · Podis · Fryums
        </div>
      </div>
    </div>
  );
}
