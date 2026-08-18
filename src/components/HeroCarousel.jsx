import { useEffect, useState } from 'react';
import { HERO_SLIDES } from '../data/products';

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const go = (dir) => setActiveIndex((i) => {
    let next = i + dir;
    if (next >= total) next = 0;
    if (next < 0) next = total - 1;
    return next;
  });

  return (
    <section className="relative w-full bg-stone-100 border-b border-gray-200 overflow-hidden min-h-[180px] sm:min-h-[380px]">
      {HERO_SLIDES.map((slide, i) => (
        <div key={slide.id} className={`carousel-slide${i === activeIndex ? ' active' : ''}`}>
          {slide.href ? (
            <a href={slide.href} className="block w-full h-full min-h-[180px] sm:min-h-[380px]">
              <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover object-center block" />
            </a>
          ) : (
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover object-center block" />
          )}
        </div>
      ))}

      <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/30 text-white rounded-full p-1.5 z-20 focus:outline-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/30 text-white rounded-full p-1.5 z-20 focus:outline-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full shadow-sm transition-all ${i === activeIndex ? 'w-4 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
