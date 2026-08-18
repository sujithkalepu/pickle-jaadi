export default function HeritageLegacy() {
  return (
    <section id="heritage" className="relative overflow-hidden border-t border-stone-200/60 bg-[#FDFBF7]">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_20%_30%,var(--heritageGold)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,var(--leafGreen)_0%,transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--heritageGold)] mb-3">
            A Heritage Tie-up
          </p>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-[var(--heritageBrown)] leading-tight">
            Our Culinary Legacy
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-12 bg-[var(--heritageGold)]/60" />
            <span className="text-[10px] font-black text-[var(--heritageBrown)]/50 tracking-widest">EST. 1922</span>
            <span className="h-px w-12 bg-[var(--heritageGold)]/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-sm relative">
              <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[var(--heritageGold)] to-transparent rounded-full" />
              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-stone-100">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">In Partnership With</p>
                  <p className="text-xl sm:text-2xl font-black font-serif text-[var(--heritageBrown)]">Savitri Foods</p>
                  <p className="text-[11px] text-[var(--heritageGold)] font-bold mt-1">Legacy Since 1922</p>
                </div>
                <ul className="space-y-4 text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#F6F3EC] border border-stone-200 flex items-center justify-center text-sm">🫒</span>
                    <div>
                      <p className="font-black text-[var(--heritageBrown)] text-[10px] uppercase tracking-wider mb-0.5">Artisanal Origins</p>
                      <p>Founded as a traditional oil mill — where purity of cold-pressed oils began.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#F6F3EC] border border-stone-200 flex items-center justify-center text-sm">🌾</span>
                    <div>
                      <p className="font-black text-[var(--heritageBrown)] text-[10px] uppercase tracking-wider mb-0.5">Century of Craft</p>
                      <p>Over 100 years perfecting pure ingredients and high-quality rice milling.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#F6F3EC] border border-stone-200 flex items-center justify-center text-sm">🤝</span>
                    <div>
                      <p className="font-black text-[var(--heritageBrown)] text-[10px] uppercase tracking-wider mb-0.5">Strategic Alliance</p>
                      <p>Pickle Jaadi × Savitri Foods — tradition meets timeless quality.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
              <strong className="text-[var(--heritageBrown)] font-black">Pickle Jaadi</strong> is proud to be in a strategic tie-up with{' '}
              <strong className="text-[var(--heritageBrown)]">Savitri Foods</strong> — a legacy brand whose roots reach back to{' '}
              <strong className="text-[var(--heritageGold)]">1922</strong>.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Originally founded as an artisanal oil mill, Savitri Foods has spent over a century perfecting the science of pure ingredients and high-quality rice milling — values that form the very foundation of authentic Andhra cuisine.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              By combining Pickle Jaadi&apos;s traditional Andhra pickling techniques with Savitri Foods&apos; century-old commitment to purity, we deliver a product that is truly timeless — crafted with the same integrity that has been passed down through generations.
            </p>
            <blockquote className="border-l-4 border-[var(--heritageGold)] pl-4 py-1">
              <p className="text-sm italic font-serif text-[var(--heritageBrown)] leading-relaxed">
                &ldquo;Two legacies. One kitchen. A taste that honours the past and nourishes the present.&rdquo;
              </p>
            </blockquote>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Pure Ingredients', 'Andhra Tradition', 'Since 1922', 'FSSAI Registered'].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-black uppercase tracking-wider bg-[#F6F3EC] text-[var(--heritageBrown)] border border-stone-200/80 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
