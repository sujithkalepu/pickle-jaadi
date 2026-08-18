import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CLOUD_FRYUMS_DB, CLOUD_PICKLES_DB, CLOUD_PODIS_DB } from '../data/products';
import {
  formatReviewDate,
  isRecentReview,
  renderStars,
  sortReviewsLatest,
} from '../utils/reviews';

const PRODUCT_GROUPS = [
  { label: 'Pickles', items: CLOUD_PICKLES_DB },
  { label: 'Podis', items: CLOUD_PODIS_DB },
  { label: 'Fryums', items: CLOUD_FRYUMS_DB },
];

const INITIAL_FORM = { author: '', productId: '', rating: 5, quote: '' };

function StarPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-lg leading-none transition-transform hover:scale-110 focus:outline-none ${
            star <= value ? 'text-[var(--heritageGold)]' : 'text-gray-300'
          }`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, compact }) {
  const recent = isRecentReview(review.createdAt);

  return (
    <article
      className={`bg-white rounded-xl border border-gray-100 text-left shadow-sm flex flex-col relative overflow-hidden ${
        compact ? 'p-5 h-full' : 'p-4 h-full'
      }`}
    >
      {recent && (
        <span className="absolute top-3 right-3 text-[8px] font-black uppercase tracking-wider bg-[var(--leafGreen)] text-white px-2 py-0.5 rounded-full">
          Latest
        </span>
      )}
      <div className="text-[var(--heritageGold)] text-xs mb-2 tracking-widest">{renderStars(review.rating)}</div>
      <p className={`italic text-gray-600 leading-relaxed flex-1 ${compact ? 'text-sm' : 'text-[11px]'}`}>
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-4 pt-3 border-t border-stone-100 space-y-1">
        <div className={`font-black text-[var(--heritageBrown)] ${compact ? 'text-xs' : 'text-[10px]'}`}>
          — {review.author}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9px] text-gray-400 font-bold uppercase tracking-wide">
          <span className="text-[var(--leafGreen)]">{review.productName}</span>
          <span>·</span>
          <span>{formatReviewDate(review.createdAt)}</span>
        </div>
      </div>
    </article>
  );
}

function FeaturedReviewCarousel({ reviews }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    if (total <= 1) return undefined;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    setActiveIndex(0);
  }, [reviews.length]);

  if (total === 0) return null;

  const go = (dir) => {
    setActiveIndex((i) => {
      let next = i + dir;
      if (next >= total) next = 0;
      if (next < 0) next = total - 1;
      return next;
    });
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8 px-6 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 shadow-md bg-white min-h-[220px]">
        {reviews.map((review, i) => (
          <div
            key={review.id}
            className={`transition-opacity duration-700 ease-in-out ${
              i === activeIndex
                ? 'opacity-100 relative z-10'
                : 'opacity-0 absolute inset-0 z-0 pointer-events-none'
            }`}
          >
            <ReviewCard review={review} compact />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 bg-white border border-stone-200 text-[var(--heritageBrown)] rounded-full p-1.5 shadow-md hover:bg-stone-50 focus:outline-none z-10"
            aria-label="Previous review"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 bg-white border border-stone-200 text-[var(--heritageBrown)] rounded-full p-1.5 shadow-md hover:bg-stone-50 focus:outline-none z-10"
            aria-label="Next review"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all focus:outline-none ${
                  i === activeIndex ? 'w-5 bg-[var(--heritageGold)]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Show review ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Testimonials() {
  const { currentUser, reviews, submitReview } = useStore();
  const [form, setForm] = useState(INITIAL_FORM);
  const [showForm, setShowForm] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (currentUser?.name && !form.author) {
      setForm((prev) => ({ ...prev, author: currentUser.name }));
    }
  }, [currentUser, form.author]);

  const sortedReviews = useMemo(() => sortReviewsLatest(reviews), [reviews]);
  const featuredReviews = useMemo(() => sortedReviews.slice(0, Math.min(5, sortedReviews.length)), [sortedReviews]);
  const gridReviews = useMemo(() => sortedReviews.slice(0, visibleCount), [sortedReviews, visibleCount]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMsg('');

    const { author, productId, rating, quote } = form;
    if (!author.trim() || !productId || !quote.trim()) {
      setSubmitMsg('Please fill in your name, product, and review.');
      return;
    }
    if (quote.trim().length < 20) {
      setSubmitMsg('Please write at least 20 characters in your review.');
      return;
    }

    submitReview({ author, quote, productId, rating });
    setForm((prev) => ({ ...INITIAL_FORM, author: prev.author }));
    setShowForm(false);
    setVisibleCount(6);
    setSubmitMsg('Thank you! Your review is now live.');
    setTimeout(() => setSubmitMsg(''), 4000);
  };

  return (
    <section id="testimonials" className="bg-[#F6F3EC] py-12 border-t border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--heritageGold)] mb-2">Customer Voices</p>
          <h2 className="text-xl sm:text-2xl font-black font-serif text-[var(--heritageBrown)]">
            What Our Kitchen Family Says
          </h2>
          <p className="text-[11px] text-gray-500 mt-2 max-w-lg mx-auto">
            Live reviews from pickle lovers — newest submissions appear instantly at the top.
          </p>
          {reviews.length > 0 && (
            <div className="inline-flex items-center gap-2 mt-4 bg-white border border-stone-200 rounded-full px-4 py-1.5 shadow-sm">
              <span className="text-[var(--heritageGold)] text-sm tracking-widest">{renderStars(Math.round(Number(avgRating)))}</span>
              <span className="text-[11px] font-black text-[var(--heritageBrown)]">{avgRating} / 5</span>
              <span className="text-[10px] text-gray-400 font-bold">({reviews.length} reviews)</span>
            </div>
          )}
        </div>

        <FeaturedReviewCarousel reviews={featuredReviews} />

        <div className="max-w-3xl mx-auto mb-8">
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="w-full bg-white border-2 border-dashed border-[var(--heritageGold)]/60 rounded-xl py-4 px-5 text-center hover:bg-[#FDF8EE] hover:border-[var(--heritageGold)] transition-all focus:outline-none group"
            >
              <span className="text-sm font-black text-[var(--heritageBrown)] group-hover:text-[var(--heritageGold)] transition-colors">
                ✍️ Share Your Review
              </span>
              <span className="block text-[10px] text-gray-400 mt-1 font-medium">
                Tell us about your favourite Pickle Jaadi product
              </span>
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-black font-serif text-[var(--heritageBrown)]">Write a Review</h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="e.g. Priya S., Hyderabad"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[var(--heritageGold)] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Product *</label>
                  <select
                    value={form.productId}
                    onChange={(e) => setForm({ ...form, productId: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[var(--heritageGold)] font-medium bg-white"
                  >
                    <option value="">Select a product...</option>
                    {PRODUCT_GROUPS.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.items.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Your Rating *</label>
                <StarPicker value={form.rating} onChange={(rating) => setForm({ ...form, rating })} />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Your Review *</label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  rows={3}
                  placeholder="How did it taste? Was delivery good? Would you recommend it?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[var(--heritageGold)] font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--heritageGold)] text-[var(--heritageBrown)] py-2.5 rounded-lg text-xs font-black uppercase tracking-wider hover:brightness-105 transition-all focus:outline-none"
              >
                Publish Review
              </button>
            </form>
          )}

          {submitMsg && (
            <p className={`text-center text-[11px] font-bold mt-3 ${submitMsg.startsWith('Thank') ? 'text-[var(--leafGreen)]' : 'text-[var(--chiliRed)]'}`}>
              {submitMsg}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {gridReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {sortedReviews.length > visibleCount && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + 6)}
              className="text-[11px] font-black uppercase tracking-wider text-[var(--heritageBrown)] border border-[var(--heritageBrown)]/20 bg-white px-5 py-2 rounded-lg hover:bg-stone-50 transition-colors focus:outline-none"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
