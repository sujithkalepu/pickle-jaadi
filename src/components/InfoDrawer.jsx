import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { DOMESTIC_PIN_SHIPPING, INTERNATIONAL_SHIPPING } from '../data/shipping';

const TABS = [
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'shipping', label: 'Shipping & Payment' },
  { id: 'refunds', label: 'Returns & Vouchers' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'terms', label: 'Terms' },
];

function TabContent({ tab }) {
  if (tab === 'about') {
    return (
      <div className="space-y-2">
        <h3 className="font-serif font-black text-base text-[var(--heritageBrown)]">Our Traditional Kitchen Story</h3>
        <p>Welcome to <strong>Pickle Jaadi</strong>, where we honor age-old traditional recipes passed down through generations in coastal Andhra Pradesh.</p>
        <p>Every single batch of our authentic heritage recipes follows our dedicated <strong>Fresh Post-Order Preparation Model</strong>. We never warehouse pre-made or stale food stocks. The moment your automated invoice transitions into our messaging terminal boards, our culinary kitchen teams trigger raw ingredient scaling and complete hand-crafted production cycles inside a locked 12-hour confirmation and execution window, ensuring pristine structural integrity and flavor preservation before express transit dispatch.</p>
      </div>
    );
  }
  if (tab === 'contact') {
    return (
      <div className="space-y-3">
        <h3 className="font-serif font-black text-base text-[var(--heritageBrown)]">Connect With Our Kitchen Desks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border rounded-xl p-3 bg-white shadow-sm">
            <span className="block text-[9px] font-black uppercase text-[var(--leafGreen)]">Domestic Desk (India)</span>
            <p className="text-sm font-bold mt-0.5">📞 +91 7989350068</p>
          </div>
          <div className="border rounded-xl p-3 bg-white shadow-sm">
            <span className="block text-[9px] font-black uppercase text-[var(--heritageGold)]">Global Desk (International)</span>
            <p className="text-sm font-bold mt-0.5">🇸🇬 +65 9116 9217</p>
          </div>
        </div>
        <p className="text-[11px] pt-1">📍 <strong>Address:</strong> Door No. 12-4-56, Ramaraopeta, Near Main Market Tower, Kakinada - 533001, Andhra Pradesh, India.<br />✉️ <strong>Email:</strong> picklejaadiindia@gmail.com</p>
      </div>
    );
  }
  if (tab === 'shipping') {
    return (
      <div className="space-y-3">
        <h3 className="font-serif font-black text-base text-[var(--heritageBrown)]">Shipping, Export & Payment Guidelines</h3>
        <p><strong>Payment Processing:</strong> Final billing handles cleanly via secure customized payment interfaces (UPI links, Google Pay, or dynamic international credit checkout layers) over WhatsApp conversation boards.</p>
        <div className="bg-white border border-stone-200 rounded-xl p-3 text-[11px] space-y-2">
          <p className="font-black text-[var(--heritageBrown)] uppercase tracking-wider text-[10px]">Smart Delivery Detection</p>
          <p>Enter your <strong>Pin Code / Zip Code</strong> at checkout. The system detects your destination automatically:</p>
          <ul className="list-disc pl-4 space-y-1 text-gray-600">
            <li><strong>6-digit Indian PIN</strong> → domestic delivery <strong>₹{DOMESTIC_PIN_SHIPPING}</strong> (2–4 business days)</li>
            <li><strong>International zip/postcode</strong> → {INTERNATIONAL_SHIPPING.mode === 'fixed' ? `export freight ₹${INTERNATIONAL_SHIPPING.fixedRate}` : 'Calculated at Dispatch (confirmed on WhatsApp)'}</li>
          </ul>
        </div>
        <p className="text-gray-500 text-[11px]">Customs duties at destination (if applicable) are the customer&apos;s responsibility for international orders.</p>
      </div>
    );
  }
  if (tab === 'refunds') {
    return (
      <div className="space-y-3">
        <h3 className="font-serif font-black text-base text-[var(--heritageBrown)]">Returns, Replacements & Store Vouchers</h3>
        <p className="text-[11px] leading-relaxed">
          Pickle Jaadi prepares fresh, perishable artisanal food. For hygiene and food-safety compliance, we do <strong>not</strong> offer cash refunds or bank reversals once an order has been dispatched.
        </p>
        <div className="bg-[#F6F3EC] border border-stone-200 rounded-xl p-3 text-[11px] space-y-2">
          <p className="font-black text-[var(--heritageBrown)] uppercase tracking-wider text-[10px]">Our Resolution Promise</p>
          <p className="leading-relaxed text-gray-600">
            If something goes wrong for a <strong>genuine and valid reason</strong>, we stand by our customers. After review, we may offer a <strong>Pickle Jaadi store voucher</strong> — a discount credit toward your next order. Voucher value is decided at our discretion based on the nature of the issue.
          </p>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-3 text-[11px] space-y-2">
          <p className="font-black text-[var(--heritageBrown)] uppercase tracking-wider text-[10px]">When Vouchers May Apply</p>
          <ul className="list-disc pl-4 space-y-1 text-gray-600 leading-relaxed">
            <li>Transit damage or leakage (with clear photo/video proof)</li>
            <li>Incorrect item or variant received vs. confirmed invoice</li>
            <li>Quality concern reported promptly with valid evidence</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border border-emerald-200/70 rounded-xl p-3 text-[11px] space-y-1.5">
          <p className="font-black text-[var(--leafGreen)] uppercase tracking-wider text-[10px]">How to Raise a Request</p>
          <p className="text-gray-600 leading-relaxed">
            Message us on WhatsApp within <strong>24 hours of delivery</strong> with your invoice number, a brief description, and supporting photos. Our kitchen desk will review and respond with the appropriate voucher or replacement arrangement where applicable.
          </p>
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Vouchers are non-transferable, valid for a limited period as communicated at issuance, and cannot be exchanged for cash. Pickle Jaadi reserves the right to decline requests that lack sufficient evidence or fall outside fair-use policy.
        </p>
      </div>
    );
  }
  if (tab === 'privacy') {
    return (
      <div className="space-y-2">
        <h3 className="font-serif font-black text-base text-[var(--heritageBrown)]">Data Protection Policy</h3>
        <p>Any operational records collected through our site (name, email, phone, and address) are housed strictly inside local device browser tokens. We never warehouse your metadata or lease it to digital marketing outfits.</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <h3 className="font-serif font-black text-base text-[var(--heritageBrown)]">Terms & Conditions of Service</h3>
      <p>Pickle Jaadi provides standard references to item menus. All checkout parameters map securely to verified peer-to-peer messaging streams over WhatsApp. Customers handle destination custom laws if shipping high-weight bundles abroad.</p>
    </div>
  );
}

export default function InfoDrawer() {
  const { infoDrawerOpen, infoTab, setInfoTab, closeInfoDrawer } = useStore();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (infoDrawerOpen) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [infoDrawerOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`drawer-overlay fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={closeInfoDrawer}
    >
      <div
        className={`drawer-sheet fixed inset-x-0 bottom-0 max-h-[80vh] bg-[#FDFBF7] rounded-t-xl shadow-2xl p-5 overflow-y-auto flex flex-col transition-all duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-2 mb-3 shrink-0">
          <button type="button" onClick={closeInfoDrawer} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[var(--heritageBrown)] focus:outline-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            <span>← Go Back</span>
          </button>
          <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Information Desk</span>
        </div>

        <div className="flex border-b overflow-x-auto gap-4 pb-2 text-[11px] font-black uppercase tracking-wider shrink-0 text-gray-400">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setInfoTab(t.id)}
              className={`pb-1 border-b-2 whitespace-nowrap ${infoTab === t.id ? 'text-[var(--heritageGold)] border-[var(--heritageGold)]' : 'border-transparent'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-grow py-3 text-xs text-stone-700 leading-relaxed">
          <TabContent tab={infoTab} />
        </div>

        <button type="button" onClick={closeInfoDrawer} className="w-full bg-[var(--heritageBrown)] text-white text-xs font-bold py-2.5 rounded-xl uppercase tracking-wider shrink-0 mt-2">
          Close Window
        </button>
      </div>
    </div>
  );
}
