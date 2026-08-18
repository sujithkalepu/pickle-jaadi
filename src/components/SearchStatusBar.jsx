import { ALL_PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function SearchStatusBar() {
  const { searchQuery, matchesSearch } = useStore();
  if (!searchQuery.trim()) return null;

  const hasMatches = ALL_PRODUCTS.some(matchesSearch);
  if (hasMatches) return null;

  return (
    <div className="bg-[var(--chiliRed)] text-white text-xs font-semibold text-center py-1.5">
      No matching varieties found.
    </div>
  );
}
