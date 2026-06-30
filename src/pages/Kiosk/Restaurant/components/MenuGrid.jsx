export default function MenuGrid({
  menus,
  onClickMenu,
}) {
  return (
    <div className="menu-grid">
      {menus.map(menu => (
        <div
          key={menu.id}
          className="menu-card"
          onClick={() => onClickMenu(menu)}
        >
          <img
            src={menu.image}
            alt={menu.name}
          />

          {menu.soldOut && (
            <div className="soldout">
              품절
            </div>
          )}

          <h3>{menu.name}</h3>

          <p>
            {menu.price.toLocaleString()}원
          </p>
        </div>
      ))}
    </div>
  );
}