import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const {
    cartCount,
    wishlist,
    currentUser,
    searchOpen,
    setSearchOpen,
    setSearchQuery,
    searchQuery,
    setCartOpen,
    setWishlistOpen,
    setAccountOpen,
    setMobileNavOpen,
    openInfoDrawer,
  } = useStore();

  const [logoHidden, setLogoHidden] = useState(false);

  return (
    <header className="sticky top-0 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-8 shrink-0">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="p-2 -ml-2 text-[var(--heritageBrown)] hover:text-[var(--heritageGold)] focus:outline-none md:hidden"
            title="Open Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <a href="#" className="flex items-center space-x-2 group focus:outline-none" title="Home">
            {!logoHidden && (
              <img
                src="/pickle-jaadi-logo.png"
                alt="Pickle Jaadi Logo"
                className="h-12 w-auto object-contain"
                onError={() => setLogoHidden(true)}
              />
            )}
            {logoHidden && (
              <span className="block text-lg font-black font-serif text-[var(--heritageBrown)] leading-none">Pickle Jaadi</span>
            )}
          </a>

          <nav className="hidden md:flex space-x-6 text-xs font-black text-gray-500 tracking-wider uppercase border-l border-gray-200 pl-6">
            <a href="#pickles" className="hover:text-[var(--heritageBrown)] transition-colors">Pickles</a>
            <a href="#powders" className="hover:text-[var(--heritageBrown)] transition-colors">Podis</a>
            <a href="#fryums" className="hover:text-[var(--heritageBrown)] transition-colors">Fryums</a>
            <button type="button" onClick={() => openInfoDrawer('about')} className="hover:text-[var(--heritageBrown)] transition-colors font-black uppercase text-xs">Story</button>
            <button type="button" onClick={() => openInfoDrawer('contact')} className="hover:text-[var(--heritageBrown)] transition-colors font-black uppercase text-xs">Contact</button>
          </nav>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          <button type="button" onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-500 hover:text-[var(--heritageBrown)] transition-colors" title="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button type="button" onClick={() => setWishlistOpen(true)} className="relative p-2 text-gray-500 hover:text-[var(--chiliRed)] transition-colors" title="Wishlist">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-[var(--leafGreen)] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">{wishlist.length}</span>
            )}
          </button>
          <button type="button" onClick={() => setCartOpen(true)} className="relative p-2 text-gray-500 hover:text-[var(--leafGreen)] transition-colors" title={cartCount > 0 ? 'Checkout' : 'Cart'}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[var(--chiliRed)] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">{cartCount}</span>
            )}
          </button>
          <button type="button" onClick={() => setAccountOpen(true)} className="p-2 text-gray-500 hover:text-[var(--heritageBrown)] flex items-center gap-1 focus:outline-none" title="Account">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <div className="flex flex-col items-start leading-none">
              {currentUser && (
                <>
                  <span className="text-[10px] font-black text-[var(--leafGreen)] tracking-tight">Hi, {currentUser.name.split(' ')[0]}</span>
                  <span className="text-[7px] font-extrabold uppercase bg-[var(--heritageGold)] text-[var(--heritageBrown)] px-1 rounded-sm mt-0.5 tracking-wide">Jadi Club</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      <div
        className="w-full bg-white border-b border-gray-200 shadow-inner overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: searchOpen ? '80px' : '0px' }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pickles, powders, fryums..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[var(--heritageGold)] font-medium"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <button type="button" onClick={() => setSearchOpen(false)} className="text-xs font-bold text-gray-500 hover:text-[var(--chiliRed)] px-3 py-2 border rounded-lg bg-gray-50">Cancel</button>
        </div>
      </div>
    </header>
  );
}
