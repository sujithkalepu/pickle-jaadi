import { ALL_PRODUCTS, TESTIMONIALS } from '../data/products';

const STORAGE_KEY = 'pj_customer_reviews_v1';

const SEED_PRODUCT_MAP = [
  { productId: 'dosa-avakaya', daysAgo: 45 },
  { productId: 'kandi-podi', daysAgo: 28 },
  { productId: 'challa-mirapa', daysAgo: 12 },
];

function makeId() {
  return `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function daysAgoIso(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function buildSeedReviews() {
  return TESTIMONIALS.map((t, idx) => {
    const meta = SEED_PRODUCT_MAP[idx];
    const product = ALL_PRODUCTS.find((p) => p.id === meta.productId);
    return {
      id: `seed_${idx}`,
      author: t.author,
      quote: t.quote,
      productId: meta.productId,
      productName: product?.name || 'Pickle Jaadi',
      rating: 5,
      createdAt: daysAgoIso(meta.daysAgo),
      isSeed: true,
    };
  });
}

export function loadReviews() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* fall through to seed */
  }
  const seeds = buildSeedReviews();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  return seeds;
}

export function saveReviews(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function createReview({ author, quote, productId, rating }) {
  const product = ALL_PRODUCTS.find((p) => p.id === productId);
  return {
    id: makeId(),
    author: author.trim(),
    quote: quote.trim(),
    productId,
    productName: product?.name || 'General',
    rating,
    createdAt: new Date().toISOString(),
    isSeed: false,
  };
}

export function sortReviewsLatest(reviews) {
  return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function formatReviewDate(iso) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function isRecentReview(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  return diffMs < 7 * 24 * 60 * 60 * 1000;
}

export function renderStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
