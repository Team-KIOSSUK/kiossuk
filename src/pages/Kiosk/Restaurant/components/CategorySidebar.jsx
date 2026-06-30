export default function CategorySidebar({
  categories,
  selected,
  onSelect,
}) {
  return (
    <div className="sidebar">
      {categories.map(category => (
        <button
          key={category}
          className={
            selected === category ? 'active' : ''
          }
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}