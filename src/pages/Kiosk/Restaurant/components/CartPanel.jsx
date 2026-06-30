export default function CartPanel({
  cart,
  total,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="cart-panel">

      <h2>장바구니</h2>

      <div className="cart-items">

        {cart.length === 0 ? (
          <p>장바구니가 비어있습니다.</p>
        ) : (
          cart.map(item => (
            <div
              key={item.id}
              className="cart-item"
            >
              <h4>{item.name}</h4>

              <p>
                {item.price.toLocaleString()}원
              </p>

              <div className="item-controls">
                <button onClick={() => onDecrease(item.id)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => onIncrease(item.id)}>
                  +
                </button>

                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}

      </div>

      <div className="cart-footer">
        <h3>
          총 금액 : {total.toLocaleString()}원
        </h3>

        <button className="order-button">
          주문하기
        </button>
      </div>

    </div>
  );
}