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
    <div
      style={{
        padding: isFooter ? '10px' : '150px',
        backgroundColor: isFooter ? '#f8f8f8' : 'transparent',
        maxHeight: isFooter ? '200px' : 'none',
        overflowY: isFooter ? 'auto' : 'visible',
      }}
    >
      <h2 style={{ fontSize: isFooter ? '1.2rem' : '1.5rem', marginBottom: '10px' }}>
        🛒 장바구니
      </h2>

      {cartItems.length === 0 ? (
        <p style={{ fontSize: isFooter ? '0.9rem' : '1rem' }}>
          장바구니가 비어있습니다.
        </p>
      ) : (
        <ul
          className="cart-list"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {cartItems.map((item, index) => (
            <li
              key={`${item.name}-${item.type}-${index}`}
              className="cart-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0',
                borderBottom: '1px solid #ddd',
                fontSize: isFooter ? '0.9rem' : '1rem',
              }}
            >
              <div>
                <strong>{item.name || 'Unknown Item'}</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                  <button
                    onClick={() => handleDecrease(index)}
                    style={{
                      padding: '2px 8px',
                      fontSize: isFooter ? '0.8rem' : '1rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    ➖
                  </button>
                  <span style={{ minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => handleIncrease(index)}
                    style={{
                      padding: '2px 8px',
                      fontSize: isFooter ? '0.8rem' : '1rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    ➕
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      padding: '2px 8px',
                      fontSize: isFooter ? '0.8rem' : '1rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#f0f0f0',
                      color: 'red',
                    }}
                  >
                    ❌
                  </button>
                </div>
                <div style={{ marginTop: '5px' }}>
                  가격: {(item.price || 0).toLocaleString()}원
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <>
          <hr style={{ margin: '10px 0' }} />
          <h3 style={{ fontSize: isFooter ? '1rem' : '1.2rem' }}>
            총 합계: {total.toLocaleString()}원
          </h3>
          <button
            onClick={handleOrderSubmit}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: isFooter ? '0.9rem' : '1rem',
            }}
          >
            ✅ 주문하기
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;