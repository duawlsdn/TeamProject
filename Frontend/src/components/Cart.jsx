import { useCart } from '../components/CartContext';
import { useEffect } from 'react';

function Cart({ isFooter = false }) {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    console.log('Cart component re-rendered with cartItems:', cartItems);
  }, [cartItems]);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleDecrease = (index) => {
    const currentQty = cartItems[index].quantity || 1;
    if (currentQty > 1) {
      updateQuantity(index, currentQty - 1);
    } else {
      removeItem(index);
    }
  };

  const handleIncrease = (index) => {
    const currentQty = cartItems[index].quantity || 1;
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
            itemId: item.id || item.name,
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
    <div>
      <h2>🛒 장바구니</h2>

      {cartItems.length === 0 ? (
        <p>
          장바구니가 비어있습니다.
        </p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li
              key={`${item.name}-${item.type}-${index}`}
              className="cart-item"
            >
              <div>
                <strong>{item.name || 'Unknown Item'}</strong>
                <div>
                  <button
                    onClick={() => handleDecrease(index)}
                  >
                    ➖
                  </button>
                  <span>
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => handleIncrease(index)}
                  >
                    ➕
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                  >
                    ❌
                  </button>
                </div>
                <div>
                  가격: {(item.price || 0).toLocaleString()}원
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <>
          <hr />
          <h3>
            총 합계: {total.toLocaleString()}원
          </h3>
          <button
            onClick={handleOrderSubmit}
          >
            ✅ 주문하기
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;