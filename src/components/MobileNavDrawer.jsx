import { useStore } from '../context/StoreContext';

export default function MobileNavDrawer() {
  const { mobileNavOpen, setMobileNavOpen, openInfoDrawer } = useStore();
  if (!mobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-600/40 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
      <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-16">
        <div className="pointer-events-auto w-64 bg-[#FDFBF7] p-6 shadow-2xl flex flex-col border-r border-gray-100 justify-between">
          <div className="space-y-6">
            <div className="font-serif font-black text-xl border-b pb-3 text-[var(--heritageBrown)]">Categories</div>
            <nav className="flex flex-col space-y-4 text-xs font-black text-[var(--heritageBrown)] uppercase tracking-wider">
              <a href="#pickles" onClick={() => setMobileNavOpen(false)}>🌶️ Andhra Pickles</a>
              <a href="#powders" onClick={() => setMobileNavOpen(false)}>🧄 Traditional Podis</a>
              <a href="#fryums" onClick={() => setMobileNavOpen(false)}>☀️ Sun-Dried Fryums</a>
              <button type="button" onClick={() => { setMobileNavOpen(false); openInfoDrawer('about'); }} className="text-left font-black uppercase text-xs">Our Story</button>
              <button type="button" onClick={() => { setMobileNavOpen(false); openInfoDrawer('contact'); }} className="text-left font-black uppercase text-xs">Contact Us</button>
            </nav>
          </div>
          <div className="text-[10px] text-gray-400 font-medium">© 2026 Pickle Jaadi India.</div>
        </div>
      </div>
    </div>
  );
}
