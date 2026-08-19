import { useStore } from '../context/StoreContext';

function FooterLink({ icon, label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="group flex items-center gap-1.5 hover:text-white transition-colors">
      <span className="text-[var(--heritageGold)] group-hover:text-white transition-colors">{icon}</span>
      {label}
    </button>
  );
}

export default function Footer() {
  const { openInfoDrawer } = useStore();

  return (
    <footer className="bg-[var(--heritageBrown)] text-stone-400 py-8 border-t border-stone-800 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-stone-800 pb-6 mb-6 text-center md:text-left">
          <div className="flex items-start gap-3">
            <div className="hidden sm:flex w-9 h-9 rounded-full bg-stone-800/60 border border-stone-700 items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-[var(--heritageGold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <span className="text-lg font-serif text-white font-black">Pickle Jaadi</span>
              <p className="text-[11px] text-stone-400 mt-0.5 max-w-xs">On-demand traditional cooking, packing, and dispatch matrices.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2.5 font-bold text-stone-400 text-[11px]">
            <FooterLink label="Our Story" onClick={() => openInfoDrawer('about')} icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} />
            <FooterLink label="Contact" onClick={() => openInfoDrawer('contact')} icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
            <FooterLink label="Shipping" onClick={() => openInfoDrawer('shipping')} icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>} />
            <FooterLink label="Returns & Vouchers" onClick={() => openInfoDrawer('refunds')} icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>} />
            <FooterLink label="Privacy" onClick={() => openInfoDrawer('privacy')} icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>} />
            <FooterLink label="Terms" onClick={() => openInfoDrawer('terms')} icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
          </div>
          <div className="flex gap-3 font-black uppercase text-[10px] tracking-wider">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-700 hover:border-[var(--heritageGold)] hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 text-[var(--heritageGold)] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-700 hover:border-[var(--heritageGold)] hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 text-[var(--heritageGold)] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-5 mb-6 border-b border-stone-800/50 text-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-[var(--heritageGold)]/50" />
            <span className="text-[8px] font-black uppercase tracking-[0.35em] text-stone-500">Singapore Partnership</span>
            <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-[var(--heritageGold)]/50" />
          </div>
          <p className="font-serif text-sm sm:text-[15px] text-stone-300 leading-relaxed tracking-[0.02em] max-w-xl">
            In Partnership with{' '}
            <span className="text-[var(--heritageGold)] font-bold italic">Savitri Foods</span>
            {' '}— Singapore-registered company
          </p>
        </div>
        <p className="text-[10px] text-stone-500 text-center normal-case font-medium leading-relaxed max-w-2xl mx-auto">
          We ship within India and internationally. Customs duties, import taxes, and local charges (if any) are the customer&apos;s responsibility.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 font-bold uppercase text-center sm:text-left gap-3">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-stone-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            © 2026 Pickle Jaadi India. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[var(--leafGreen)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            FSSAI Registered Unit Matrix
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-stone-800/50 flex items-center justify-center gap-2">
          <svg className="w-3 h-3 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <span className="text-[10px] text-stone-500 font-medium tracking-widest uppercase">Powered by</span>
          <span className="text-[11px] font-serif font-bold text-[var(--heritageGold)] tracking-wide normal-case">WINR Technologies</span>
        </div>
      </div>
    </footer>
  );
}
