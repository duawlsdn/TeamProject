import { useCart } from "../components/CartContext";

function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const total = cartItems.reduce( (sum, item) => sum + item.price * item.quantity, 0);


  return (
    <div style={{ padding: "150px" }}>
      <h2>🛒 장바구니</h2>

      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <strong>{item.name}</strong><br />
              가격: {item.price.toLocaleString()}원 × {" "}
              <input
                type="number"
                value={item.quantity}
                min="1"
                style={{ width: "50px" }}
                onChange={(e) =>
                  updateQuantity(index, parseInt(e.target.value))
                }
              />{" "}
              = {(item.price * item.quantity).toLocaleString()}원
              <br />
              <button onClick={() => removeItem(index)}>❌ 삭제</button>
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