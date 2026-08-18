import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ALL_PRODUCTS } from '../data/products';
import { calculateShippingFromPinCode, getOrderTotal } from '../data/shipping';
import { resolveWhatsAppDesk } from '../utils/whatsappRouting';
import { collectCheckoutOrderData, downloadPdfReceipt, processFullInvoiceCheckout } from '../utils/checkout';
import { makeCartKey } from '../utils/productPricing';
import {
  createReview,
  loadReviews,
  saveReviews,
  sortReviewsLatest,
} from '../utils/reviews';

const StoreContext = createContext(null);

const defaultCheckout = {
  name: '',
  phone: '',
  address: '',
  pinCode: '',
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pj_user_v2')) || null;
    } catch {
      return null;
    }
  });
  const [checkoutForm, setCheckoutForm] = useState(defaultCheckout);
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState(() => loadReviews());

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [infoTab, setInfoTab] = useState('about');
  const [authMode, setAuthMode] = useState('signin');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const cartCount = useMemo(() => cart.reduce((a, c) => a + c.qty, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((a, c) => a + c.price * c.qty, 0), [cart]);
  const shippingQuote = useMemo(
    () => calculateShippingFromPinCode(cart, checkoutForm.pinCode),
    [cart, checkoutForm.pinCode],
  );
  const whatsappRouting = useMemo(
    () => resolveWhatsAppDesk(checkoutForm.pinCode),
    [checkoutForm.pinCode],
  );
  const shippingZone = shippingQuote.zone || whatsappRouting.zone || 'Domestic';
  const shippingFee = shippingQuote.amount;
  const orderTotal = getOrderTotal(cartSubtotal, shippingQuote);

  const productMap = useMemo(() => {
    const map = {};
    ALL_PRODUCTS.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, []);

  useEffect(() => {
    const syncReviews = (event) => {
      if (event.key && event.key !== 'pj_customer_reviews_v1') return;
      setReviews(loadReviews());
    };
    window.addEventListener('storage', syncReviews);
    return () => window.removeEventListener('storage', syncReviews);
  }, []);

  const submitReview = ({ author, quote, productId, rating }) => {
    const review = createReview({ author, quote, productId, rating });
    const next = sortReviewsLatest([review, ...reviews]);
    setReviews(next);
    saveReviews(next);
    return review;
  };

  useEffect(() => {
    if (currentUser) {
      setCheckoutForm((prev) => ({
        ...prev,
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
      }));
    }
  }, [currentUser]);

  const matchesSearch = (item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return `${item.name} ${item.desc}`.toLowerCase().includes(q);
  };

  const addToCart = ({ id, name, price, weightGrams, weightLabel, garlic }) => {
    const cartKey = makeCartKey(id, weightGrams, garlic);
    setCart((prev) => {
      const match = prev.find((i) => i.cartKey === cartKey);
      if (match) {
        return prev.map((i) => (i.cartKey === cartKey ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { cartKey, id, name, price, qty: 1, weightGrams, weightLabel, garlic }];
    });
  };

  const updateCartQty = (cartKey, delta) => {
    setCart((prev) => {
      const updated = prev
        .map((i) => (i.cartKey === cartKey ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
      return updated;
    });
  };

  const getCartQtyForVariant = (id, weightGrams, garlic) => {
    const cartKey = makeCartKey(id, weightGrams, garlic);
    return cart.find((i) => i.cartKey === cartKey)?.qty || 0;
  };

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((w) => w.wishKey === item.wishKey);
      if (exists) return prev.filter((w) => w.wishKey !== item.wishKey);
      return [...prev, item];
    });
  };

  const isWishlisted = (wishKey) => wishlist.some((w) => w.wishKey === wishKey);

  const openInfoDrawer = (tab = 'about') => {
    setInfoTab(tab);
    setInfoDrawerOpen(true);
  };

  const closeInfoDrawer = () => setInfoDrawerOpen(false);

  const signUp = () => {
    const { name, email, password, phone, address } = registerForm;
    if (!name.trim() || !email.trim() || !password.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in all required registration fields.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    const memberArchive = JSON.parse(localStorage.getItem('pj_accounts_vault') || '[]');
    const normalizedEmail = email.trim().toLowerCase();
    if (memberArchive.find((u) => u.email === normalizedEmail)) {
      alert('Account already exists with this email address. Please sign in instead.');
      return;
    }

    const profile = {
      name: name.trim(),
      email: normalizedEmail,
      password: password.trim(),
      phone: phone.trim(),
      address: address.trim(),
    };
    memberArchive.push(profile);
    localStorage.setItem('pj_accounts_vault', JSON.stringify(memberArchive));
    localStorage.setItem('pj_user_v2', JSON.stringify(profile));
    setCurrentUser(profile);
    alert(`Welcome to our kitchen family, ${profile.name}! Your protected account has been created.`);
    setAccountOpen(false);
    setRegisterForm({ name: '', email: '', password: '', phone: '', address: '' });
  };

  const signIn = () => {
    const { email, password } = loginForm;
    if (!email.trim() || !password.trim()) {
      alert('Please input both your email and password parameters.');
      return;
    }

    const memberArchive = JSON.parse(localStorage.getItem('pj_accounts_vault') || '[]');
    const matched = memberArchive.find((u) => u.email === email.trim().toLowerCase());
    if (!matched) {
      alert('No account matching this email was found. Please sign up to create your credentials.');
      return;
    }
    if (matched.password !== password.trim()) {
      alert('Incorrect credentials validation. Please check your password input.');
      return;
    }

    localStorage.setItem('pj_user_v2', JSON.stringify(matched));
    setCurrentUser(matched);
    alert(`Welcome back, ${matched.name}!`);
    setAccountOpen(false);
    setLoginForm({ email: '', password: '' });
  };

  const signOut = () => {
    localStorage.removeItem('pj_user_v2');
    setCurrentUser(null);
    setAccountOpen(false);
  };

  const handlePdfDownload = () => {
    const order = collectCheckoutOrderData(cart, checkoutForm, shippingQuote, cartSubtotal, shippingFee, orderTotal, currentUser);
    if (order) downloadPdfReceipt(order);
  };

  const handleWhatsAppCheckout = () => {
    const order = collectCheckoutOrderData(cart, checkoutForm, shippingQuote, cartSubtotal, shippingFee, orderTotal, currentUser);
    if (order) processFullInvoiceCheckout(order);
  };

  const value = {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    shippingQuote,
    orderTotal,
    shippingZone,
    whatsappRouting,
    wishlist,
    currentUser,
    checkoutForm,
    setCheckoutForm,
    searchQuery,
    setSearchQuery,
    mobileNavOpen,
    setMobileNavOpen,
    searchOpen,
    setSearchOpen,
    cartOpen,
    setCartOpen,
    wishlistOpen,
    setWishlistOpen,
    accountOpen,
    setAccountOpen,
    infoDrawerOpen,
    infoTab,
    setInfoTab,
    authMode,
    setAuthMode,
    loginForm,
    setLoginForm,
    registerForm,
    setRegisterForm,
    productMap,
    matchesSearch,
    addToCart,
    updateCartQty,
    getCartQtyForVariant,
    toggleWishlist,
    isWishlisted,
    openInfoDrawer,
    closeInfoDrawer,
    signUp,
    signIn,
    signOut,
    handlePdfDownload,
    handleWhatsAppCheckout,
    reviews,
    submitReview,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
