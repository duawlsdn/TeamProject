import { useCart } from "../components/CartContext";

function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const total = cartItems.reduce( (sum, item) => sum + item.price * item.quantity, 0);

  const handleDecrease = (index, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(index, currentQty - 1);
    } else {
      removeItem(index); // 1에서 - 누르면 삭제
    }
  };

  const handleIncrease = (index, currentQty) => {
    updateQuantity(index, currentQty + 1);
  };

  return (
    <div style={{ padding: "150px" }}>
      <h2>🛒 장바구니</h2>

      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <strong>{item.name}</strong><br />
              가격: {item.price.toLocaleString()}원
              <div>
                <button onClick={() => handleDecrease(index, item.quantity)}>➖</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(index, item.quantity)}>➕</button>
              </div>     

              <button onClick={() => removeItem(index)} style={{ marginTop: "10px" }}>
                ❌ 삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <h3>총 합계: {total.toLocaleString()}원</h3>
    </div>
  );
}

export default Cart;