import { useCart } from '../components/CartContext';

function Cart() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  console.log('cartItems:', cartItems); // 디버깅 로그

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDecrease = (index) => {
    const currentQty = cartItems[index].quantity;
    updateQuantity(index, currentQty - 1);
  };

  const handleIncrease = (index) => {
    const currentQty = cartItems[index].quantity;
    updateQuantity(index, currentQty + 1);
  };

  const handleOrderSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            itemId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            type: item.type,
          })),
          totalPrice: total,
        }),
      });

      if (response.ok) {
        alert('🧾 주문이 완료되었습니다!');
        clearCart();
      } else {
        alert('주문 실패 😥');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('서버 오류 발생');
    }
  };

  return (
    <div style={{ padding: '150px' }}>
      <h2>🛒 장바구니</h2>

      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={item.id || index} className="cart-item">
              <strong>{item.name}</strong>
              <br />
              가격: {item.price.toLocaleString()}원
              <div>
                <button onClick={() => handleDecrease(index)}>➖</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(index)}>➕</button>
              </div>
              <button
                onClick={() => removeItem(index)}
                style={{ marginTop: '10px' }}
              >
                ❌ 삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <h3>총 합계: {total.toLocaleString()}원</h3>

      {cartItems.length > 0 && (
        <button onClick={handleOrderSubmit} style={{ marginTop: '20px' }}>
          ✅ 주문하기
        </button>
      )}
    </div>
  );
}

export default Cart;