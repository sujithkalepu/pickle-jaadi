import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { GARLIC_OPTIONS, getBaseGrams, getPriceForWeight, getWeightOptions, makeCartKey } from '../utils/productPricing';

export default function ProductCard({ item }) {
  const { toggleWishlist, isWishlisted, addToCart, updateCartQty, getCartQtyForVariant, matchesSearch } = useStore();
  const [imgFailed, setImgFailed] = useState(false);
  const weightOptions = getWeightOptions(item);
  const [weightGrams, setWeightGrams] = useState(() => getBaseGrams(item));
  const [garlic, setGarlic] = useState('With Garlic');
  const [showAddedNotice, setShowAddedNotice] = useState(false);
  const visible = matchesSearch(item);
  const selectedWeight = weightOptions.find((w) => w.grams === weightGrams) || weightOptions[0];
  const unitPrice = getPriceForWeight(item, weightGrams);
  const cartQty = getCartQtyForVariant(item.id, weightGrams, garlic);
  const wishKey = makeCartKey(item.id, weightGrams, garlic);
  const isWishlistedItem = isWishlisted(wishKey);

  const handleWishlistToggle = () => {
    toggleWishlist({
      wishKey,
      id: item.id,
      name: item.name,
      price: unitPrice,
      weightGrams,
      weightLabel: selectedWeight.label,
      garlic,
      emoji: item.emoji,
    });
  };

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: unitPrice,
      weightGrams,
      weightLabel: selectedWeight.label,
      garlic,
    });
    setShowAddedNotice(true);
  };

  useEffect(() => {
    if (!showAddedNotice) return undefined;
    const timer = setTimeout(() => setShowAddedNotice(false), 2200);
    return () => clearTimeout(timer);
  }, [showAddedNotice]);

  if (!visible) return null;

  return (
    <div className="product-item-card bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col relative">
      <div className="relative rounded-lg mb-3 bg-[#F6F3EC] overflow-hidden h-44 border border-gray-100">
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 p-1.5 bg-white/80 rounded-full shadow-sm z-10 focus:outline-none"
        >
          <svg
            className={`w-4 h-4 transition-all duration-300 ${isWishlistedItem ? 'text-[var(--chiliRed)] animate-heart-click' : 'text-gray-400'}`}
            fill={isWishlistedItem ? '#9E1B1B' : 'none'}
            stroke={isWishlistedItem ? '#9E1B1B' : 'currentColor'}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {!imgFailed ? (
          <img
            src={`/products/${item.id}.png`}
            alt={item.name}
            className="product-card-image"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F6F3EC]">
            <span className="text-3xl">{item.emoji}</span>
          </div>
        )}

        {showAddedNotice && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 animate-fade-in">
            <div className="bg-[var(--heritageGold)] border-2 border-white shadow-xl rounded-xl px-4 py-3 text-center mx-3">
              <span className="block text-xl leading-none mb-1.5 text-[var(--leafGreen)] font-black">✓</span>
              <span className="block text-xs font-black uppercase tracking-wider text-[var(--heritageBrown)]">
                Added to Cart
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-xs font-black text-[var(--heritageBrown)] leading-snug">{item.name}</h3>
        <p className="text-[11px] text-gray-400 mt-1 leading-normal line-clamp-2">{item.desc}</p>
      </div>

      <div className="mt-3 space-y-2.5">
        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Select Weight</p>
          <div className="grid grid-cols-3 gap-1.5">
            {weightOptions.map((option) => {
              const active = weightGrams === option.grams;
              const optionPrice = getPriceForWeight(item, option.grams);
              return (
                <button
                  key={option.grams}
                  type="button"
                  onClick={() => setWeightGrams(option.grams)}
                  className={`rounded-lg border px-1 py-1.5 text-center transition-all focus:outline-none ${
                    active
                      ? 'border-[var(--heritageGold)] bg-[#FDF8EE] shadow-sm'
                      : 'border-gray-200 bg-stone-50/80 hover:border-gray-300'
                  }`}
                >
                  <span className={`block text-[10px] font-black ${active ? 'text-[var(--heritageBrown)]' : 'text-gray-600'}`}>
                    {option.label}
                  </span>
                  <span className={`block text-[9px] mt-0.5 ${active ? 'text-[var(--heritageGold)]' : 'text-gray-400'}`}>
                    ₹{optionPrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Garlic Preference</p>
          <div className="grid grid-cols-2 gap-1.5">
            {GARLIC_OPTIONS.map((option) => {
              const active = garlic === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGarlic(option.value)}
                  className={`rounded-lg border px-2 py-1.5 text-[10px] font-black transition-all focus:outline-none ${
                    active
                      ? 'border-[var(--leafGreen)] bg-emerald-50 text-[var(--heritageBrown)]'
                      : 'border-gray-200 bg-stone-50/80 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {option.short}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 border-t pt-3 flex items-center justify-between gap-2">
        <div>
          <span className="text-sm font-black text-[var(--heritageBrown)]">₹{unitPrice}</span>
          <span className="text-[9px] font-normal text-gray-400 block">/ {selectedWeight.label}</span>
        </div>

        {cartQty > 0 ? (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCartQty(`${item.id}::${weightGrams}::${garlic}`, -1)}
              className="w-7 h-7 rounded-md border border-gray-200 bg-stone-50 text-xs font-black text-[var(--heritageBrown)] hover:bg-stone-100 focus:outline-none"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="bg-[var(--heritageGold)] text-[var(--heritageBrown)] text-[10px] font-black py-2 px-3 rounded-md uppercase tracking-wider hover:brightness-105 transition-all focus:outline-none min-w-[4.5rem]"
            >
              Add ({cartQty})
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="bg-[var(--heritageGold)] text-[var(--heritageBrown)] text-[10px] font-black py-2 px-3 rounded-md uppercase tracking-wider hover:brightness-105 transition-all focus:outline-none"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
