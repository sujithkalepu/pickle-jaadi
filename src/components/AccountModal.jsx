import { useStore } from '../context/StoreContext';
import { DOMESTIC_PIN_SHIPPING, INTERNATIONAL_SHIPPING, formatShippingLine } from '../data/shipping';

function DrawerShell({ open, onClose, title, children, footer, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen ${wide ? 'max-w-md' : 'max-w-sm'} bg-white p-5 shadow-2xl flex flex-col border-l border-gray-100 justify-between`}>
          <div className="overflow-y-auto flex-grow pr-0.5">{children}</div>
          {footer}
        </div>
      </div>
    </div>
  );
}

export default function AccountModal() {
  const {
    accountOpen,
    setAccountOpen,
    currentUser,
    authMode,
    setAuthMode,
    loginForm,
    setLoginForm,
    registerForm,
    setRegisterForm,
    signIn,
    signUp,
    signOut,
  } = useStore();

  const header = (
    <div className="flex items-center justify-between border-b pb-3 mb-4">
      <button type="button" onClick={() => setAccountOpen(false)} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider focus:outline-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        <span>Go Back</span>
      </button>
      <h2 className="text-sm font-black font-serif text-[var(--heritageBrown)] flex items-center gap-2">
        👤 <span>{currentUser ? 'Kitchen Profile' : 'Member Gateway'}</span>
      </h2>
    </div>
  );

  return (
    <DrawerShell
      open={accountOpen}
      onClose={() => setAccountOpen(false)}
      footer={
        currentUser ? (
          <div className="pt-3 border-t">
            <button type="button" onClick={signOut} className="w-full text-center text-xs text-[var(--chiliRed)] font-black hover:underline uppercase tracking-wider py-1">
              Disconnect Session
            </button>
          </div>
        ) : null
      }
    >
      {header}

      {!currentUser && (
        <div className="flex gap-2 p-1 bg-stone-100 rounded-lg mb-4 text-xs font-bold uppercase tracking-wider">
          <button type="button" onClick={() => setAuthMode('signin')} className={`flex-1 text-center py-1.5 rounded transition-all ${authMode === 'signin' ? 'bg-white text-[var(--heritageBrown)] shadow-sm' : 'text-gray-500'}`}>Sign In</button>
          <button type="button" onClick={() => setAuthMode('register')} className={`flex-1 text-center py-1.5 rounded transition-all ${authMode === 'register' ? 'bg-white text-[var(--heritageBrown)] shadow-sm' : 'text-gray-500'}`}>Sign Up</button>
        </div>
      )}

      {!currentUser && authMode === 'signin' && (
        <div className="space-y-3">
          <p className="text-[11px] text-gray-400 font-medium leading-normal">Enter your credentials to safely restore your preferences and auto-fill records instantly.</p>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
              <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="name@domain.com" className="w-full border rounded-lg p-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-[var(--heritageGold)] font-medium" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">Account Password</label>
              <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" className="w-full border rounded-lg p-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-[var(--heritageGold)] font-medium" />
            </div>
          </div>
          <button type="button" onClick={signIn} className="w-full bg-[var(--heritageBrown)] text-white text-xs font-black py-2.5 rounded-lg uppercase tracking-wider shadow-sm mt-2">Access Account</button>
        </div>
      )}

      {!currentUser && authMode === 'register' && (
        <div className="space-y-3">
          <p className="text-[11px] text-gray-400 font-medium leading-normal">Create an account with a password to lock your favorite selections and billing information securely.</p>
          <div className="space-y-2.5">
            {[
              ['Full Name *', 'name', 'text', 'Sri Kumar'],
              ['Email Address *', 'email', 'email', 'sri@domain.com'],
              ['Choose Password *', 'password', 'password', 'Minimum 6 characters'],
              ['WhatsApp Number *', 'phone', 'tel', '+91 98765 43210'],
            ].map(([label, key, type, ph]) => (
              <div key={key}>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">{label}</label>
                <input type={type} value={registerForm[key]} onChange={(e) => setRegisterForm({ ...registerForm, [key]: e.target.value })} placeholder={ph} className="w-full border rounded-lg p-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-[var(--heritageGold)] font-medium" />
              </div>
            ))}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">Default Shipping Address *</label>
              <textarea value={registerForm.address} onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })} rows={2} placeholder="Street Name, Area, City, Pin Code, Country..." className="w-full border rounded-lg p-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-[var(--heritageGold)] font-medium" />
            </div>
          </div>
          <button type="button" onClick={signUp} className="w-full bg-[var(--heritageGold)] text-[var(--heritageBrown)] text-xs font-black py-2.5 rounded-lg uppercase tracking-wider shadow-sm mt-2">Register Profile</button>
        </div>
      )}

      {currentUser && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F6F3EC] border border-stone-200/60 p-4 rounded-xl shadow-sm text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-block bg-[var(--leafGreen)] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Active Kitchen Member</span>
              <span className="inline-block bg-[var(--heritageGold)] text-[var(--heritageBrown)] text-[9px] font-black px-2 py-0.5 rounded border border-[#C4902F] shadow-sm uppercase tracking-wide font-mono">👑 Verified Jadi Club</span>
            </div>
            <div className="font-serif font-black text-base text-[var(--heritageBrown)] pt-1">Namaste, {currentUser.name}</div>
            <div className="text-stone-500 pt-1 space-y-1">
              <div>📧 <span className="font-medium">{currentUser.email}</span></div>
              <div>📱 <span className="font-medium">{currentUser.phone || 'Not Linked'}</span></div>
              <div className="border-t pt-2 mt-2">
                <span className="block text-[9px] font-black uppercase text-gray-400 tracking-wider">Primary Delivery Destination:</span>
                <span className="block text-stone-700 font-medium leading-relaxed pt-0.5">{currentUser.address || 'No address specified.'}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider">📦 Recent WhatsApp Invoices</h4>
            <div className="border border-gray-100 rounded-xl p-3 bg-stone-50/50 text-center py-5 text-[11px] text-gray-400 font-medium">
              No active session transactions found on this node.
            </div>
          </div>
        </div>
      )}
    </DrawerShell>
  );
}

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    cartSubtotal,
    shippingFee,
    shippingQuote,
    orderTotal,
    updateCartQty,
    whatsappRouting,
    checkoutForm,
    setCheckoutForm,
    handlePdfDownload,
    handleWhatsAppCheckout,
  } = useStore();

  const desk = whatsappRouting.desk;
  const shippingLine = formatShippingLine(shippingQuote);
  const canRouteWhatsApp = whatsappRouting.isRoutable && cart.length > 0;

  return (
    <DrawerShell open={cartOpen} onClose={() => setCartOpen(false)} wide>
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <button type="button" onClick={() => setCartOpen(false)} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider focus:outline-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span>Go Back</span>
        </button>
        <h2 className="text-base font-black font-serif text-[var(--heritageBrown)]">🛒 Your Basket</h2>
      </div>

      <div className="space-y-2 mb-4">
        {cart.length === 0 ? (
          <p className="text-center py-6 text-xs text-gray-400">Your basket is empty.</p>
        ) : (
          cart.map((i) => (
            <div key={i.cartKey} className="flex justify-between items-start border-b pb-2 text-xs gap-3">
              <div className="min-w-0">
                <div className="font-bold text-stone-900 leading-snug">{i.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  {i.weightLabel} · {i.garlic === 'With Garlic' ? 'With Garlic' : 'No Garlic'}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">₹{i.price} each</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" onClick={() => updateCartQty(i.cartKey, -1)} className="px-2 py-0.5 border text-[10px] bg-gray-50 rounded">−</button>
                <span className="font-bold text-xs min-w-[1rem] text-center">{i.qty}</span>
                <button type="button" onClick={() => updateCartQty(i.cartKey, 1)} className="px-2 py-0.5 border text-[10px] bg-gray-50 rounded">+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/60 space-y-2.5">
        <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-wider">📍 Delivery Destination</h4>
        <div className="bg-emerald-50 border border-emerald-200/60 p-2.5 rounded-lg text-[11px] text-emerald-800 leading-normal flex items-start gap-1.5 font-medium">
          <span>🧑‍🍳</span>
          <div><strong>Freshness Lock:</strong> Prepared freshly from scratch only <em>after</em> your order is confirmed.</div>
        </div>
        <div className="space-y-1.5">
          <input type="text" value={checkoutForm.name} onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })} placeholder="Customer Full Name *" className="w-full border rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[var(--heritageGold)] font-medium" />
          <input type="text" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} placeholder="WhatsApp Number *" className="w-full border rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[var(--heritageGold)] font-medium" />
          <textarea value={checkoutForm.address} onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })} rows={2} placeholder="Street, Area, City, State..." className="w-full border rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[var(--heritageGold)] font-medium" />
          <div>
            <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Pin Code / Zip Code *</label>
            <input
              type="text"
              value={checkoutForm.pinCode}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, pinCode: e.target.value })}
              placeholder="6-digit Indian PIN or international zip"
              className="w-full border rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[var(--heritageGold)] font-medium"
            />
          </div>
        </div>

        {cart.length > 0 && shippingQuote.type === 'domestic' && (
          <div className="bg-white border border-emerald-200 rounded-lg p-2.5 text-[10px]">
            <div className="flex justify-between font-bold text-[var(--heritageBrown)]">
              <span>🇮🇳 India · PIN {shippingQuote.pinCode}</span>
              <span>₹{DOMESTIC_PIN_SHIPPING}</span>
            </div>
            <p className="mt-1 text-gray-500">{shippingQuote.breakdown} · {shippingQuote.transit}</p>
          </div>
        )}

        {cart.length > 0 && shippingQuote.type === 'international' && (
          <div className="bg-white border border-amber-200 rounded-lg p-2.5 text-[10px]">
            <div className="flex justify-between font-bold text-[var(--heritageBrown)]">
              <span>🌍 International · {shippingQuote.pinCode}</span>
              <span>{shippingLine}</span>
            </div>
            <p className="mt-1 text-gray-500">{shippingQuote.breakdown}</p>
            {shippingQuote.isCalculatedAtDispatch && (
              <p className="mt-1 text-amber-700">Final export freight confirmed on WhatsApp before dispatch.</p>
            )}
          </div>
        )}

        {cart.length > 0 && whatsappRouting.isRoutable && desk && (
          <div className={`rounded-lg p-2.5 text-[10px] border ${
            whatsappRouting.zone === 'International'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-base leading-none">{whatsappRouting.zone === 'International' ? '🌍' : '🇮🇳'}</span>
              <div>
                <p className="font-black uppercase tracking-wider text-[9px] opacity-80">Invoice routes via WhatsApp to</p>
                <p className="font-black text-xs mt-0.5">{desk.display}</p>
                <p className="mt-0.5 opacity-90">{whatsappRouting.routeLabel} · {whatsappRouting.destination.pinCode}</p>
              </div>
            </div>
          </div>
        )}

        {cart.length > 0 && !whatsappRouting.isRoutable && (
          <div className="rounded-lg p-2.5 text-[10px] border border-dashed border-stone-300 bg-white text-gray-500">
            Enter a valid Pin Code / Zip to route your invoice to the correct WhatsApp desk.
          </div>
        )}
      </div>

      <div className="border-t pt-3 bg-white mt-3 space-y-2.5">
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{cartSubtotal}.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{shippingLine}</span>
          </div>
          {shippingQuote.isCalculatedAtDispatch && (
            <p className="text-[9px] text-amber-700 font-medium">International freight added after dispatch quote on WhatsApp.</p>
          )}
          <div className="flex justify-between font-black text-base text-[var(--heritageBrown)] pt-1 border-t">
            <span>Total Bill</span>
            <span>₹{orderTotal}.00</span>
          </div>
        </div>
        <button type="button" onClick={handlePdfDownload} className="w-full border-2 border-[var(--heritageBrown)] text-[var(--heritageBrown)] py-2.5 rounded-lg font-black flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:bg-stone-50 transition-colors">
          📄 Download PDF Receipt
        </button>
        <button
          type="button"
          onClick={handleWhatsAppCheckout}
          disabled={!canRouteWhatsApp}
          className={`w-full py-2.5 rounded-lg font-black flex items-center justify-center gap-2 shadow text-xs uppercase tracking-wider ${
            canRouteWhatsApp
              ? 'bg-[#25D366] text-white hover:brightness-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          🚀 Send Invoice (PDF + WhatsApp)
        </button>
        <p className="text-[10px] text-center text-gray-400 font-medium leading-relaxed">
          {canRouteWhatsApp && desk ? (
            <>
              Downloads PDF for you · Opens WhatsApp to{' '}
              <span className="font-bold text-[var(--heritageBrown)]">{desk.display}</span>
              {whatsappRouting.zone === 'International' ? ' (Global)' : ' (India)'}
              {' '}· Sends copy to your WhatsApp number
            </>
          ) : (
            'Enter Pin / Zip above to enable checkout'
          )}
        </p>
      </div>
    </DrawerShell>
  );
}

export function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <DrawerShell open={wishlistOpen} onClose={() => setWishlistOpen(false)} wide>
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <button type="button" onClick={() => setWishlistOpen(false)} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider focus:outline-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span>Go Back</span>
        </button>
        <h2 className="text-base font-black font-serif text-[var(--heritageBrown)]">❤️ Favorites</h2>
      </div>
      <div className="flex-grow overflow-y-auto space-y-3">
        {wishlist.length === 0 ? (
          <p className="text-center py-6 text-xs text-gray-400">No saved items. Tap the heart on a product to save your selections.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.wishKey} className="border border-gray-100 rounded-xl p-3 bg-stone-50/50 shadow-sm">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-lg bg-[#F6F3EC] border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={`/products/${item.id}.png`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <span className="hidden text-xl items-center justify-center w-full h-full">{item.emoji || '🫙'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-stone-900 leading-snug">{item.name}</div>
                  <div className="mt-1.5 space-y-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px]">
                      <span className="font-black text-[var(--heritageBrown)]">₹{item.price}</span>
                      <span className="text-gray-400">·</span>
                      <span className="font-bold text-gray-600">{item.weightLabel}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      {item.garlic === 'With Garlic' ? '🧄 With Garlic' : '🚫 Without Garlic'}
                    </div>
                    <span className="inline-block text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-[var(--leafGreen)] border border-emerald-200/60 px-2 py-0.5 rounded-full">
                      ✓ Available · Fresh Prep
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    weightGrams: item.weightGrams,
                    weightLabel: item.weightLabel,
                    garlic: item.garlic,
                  })}
                  className="flex-1 bg-[var(--heritageGold)] text-[var(--heritageBrown)] text-[10px] font-black py-2 rounded-md uppercase tracking-wider hover:brightness-105 transition-all focus:outline-none"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(item)}
                  className="text-[10px] font-black text-[var(--chiliRed)] uppercase tracking-wider px-2 py-2 hover:underline focus:outline-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DrawerShell>
  );
}
