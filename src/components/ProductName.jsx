export default function ProductName({ name, nameTe, as: Tag = 'span', className = '', teClassName = '' }) {
  return (
    <Tag className={className}>
      <span className="block leading-snug">{name}</span>
      {nameTe ? (
        <span className={`block font-telugu font-semibold text-[var(--heritageGold)] leading-snug mt-0.5 ${teClassName}`}>
          {nameTe}
        </span>
      ) : null}
    </Tag>
  );
}

export function formatBilingualName(item) {
  if (!item) return '';
  return item.nameTe ? `${item.name} (${item.nameTe})` : item.name;
}
