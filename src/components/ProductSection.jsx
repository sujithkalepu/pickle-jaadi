import ProductCard from './ProductCard';

export default function ProductSection({ id, title, subtitle, products, unitLabel }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`${subtitle ? 'border-b border-gray-100 pb-3 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5' : 'border-b border-gray-100 pb-3 mb-6'}`}>
        <h2 className="text-2xl font-black font-serif text-[var(--heritageBrown)]">{title}</h2>
        {subtitle && (
          <p className="text-[10px] font-bold text-[var(--chiliRed)] bg-red-50 px-2.5 py-0.5 rounded uppercase tracking-wider">{subtitle}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  );
}
