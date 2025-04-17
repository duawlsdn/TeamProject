import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../components/CartContext";
import { getDrinks, getDesserts } from "../api/menuApi";
import "../css/menu.css";
import Footer from "./footer";

function Menu() {
  const [activeTab, setActiveTab] = useState("coffee");
  const [message, setMessage] = useState(""); // 피드백 메시지 상태
  const { addToCart, cartItems } = useCart();
  const BACKEND_URL = "http://localhost:8080";

  // 음료 데이터 가져오기
  const {
    data: drinks,
    isLoading: drinksLoading,
    error: drinksError,
  } = useQuery({
    queryKey: ["drinks"],
    queryFn: getDrinks,
  });

  // 디저트 데이터 가져오기
  const {
    data: desserts,
    isLoading: dessertsLoading,
    error: dessertsError,
  } = useQuery({
    queryKey: ["desserts"],
    queryFn: getDesserts,
  });

  // 디버깅 로그 추가
  console.log('Drinks data:', drinks);
  console.log('Desserts data:', desserts);

  // cartItems 변경 시 로그 추가
  useEffect(() => {
    console.log('Menu component - cartItems updated:', cartItems);
  }, [cartItems]);

  // 상품 클릭 시 장바구니에 추가
  const handleAddToCart = useCallback((item, type) => {
    const cartItem = {
      name: item.name || 'Unknown Item',
      price: item.basePrice || item.price || item.cost || item.value || 0,
      type: type.toUpperCase(), // DRINK 또는 DESSERT
      temperature: type === "coffee" ? "Ice" : undefined, // 기본값 (coffee에만 적용)
      size: type === "coffee" ? "Short" : undefined,     // 기본값 (coffee에만 적용)
      shot: type === "coffee" ? "기본" : undefined,      // 기본값 (coffee에만 적용)
      syrup: type === "coffee" ? "기본" : undefined,     // 기본값 (coffee에만 적용)
    };
    console.log('Calling addToCart with:', cartItem);
    if (!cartItem.price) {
      console.error('Price is undefined for item:', item);
      return;
    }
    addToCart(cartItem);

    // 피드백 메시지
    setMessage(`${item.name}(이)가 장바구니에 담겼습니다!`);
    setTimeout(() => setMessage(""), 1000);
  }, [addToCart]);

  const renderItems = () => {
    const items = activeTab === "coffee" ? drinks : desserts;
    if (!items) {
      console.log('Items are undefined for tab:', activeTab);
      return null;
    }
    console.log('Rendering items:', items);
    return (
      <div className="menu-grid">
        {items.map((item) => (
          <button
            key={item.name || `temp-name-${Date.now()}`} // name을 key로 사용
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(item, activeTab === "coffee" ? "DRINK" : "DESSERT");
            }}
            className="menu-card"
          >
            <img
              src={`${BACKEND_URL}${item.image}`}
              alt={item.name || 'Unknown Item'}
              loading="lazy"
              style={{ width: `${item.width}px`, height: `${item.height}px`, pointerEvents: 'none' }}
            />
            <p>
              {item.name || 'Unknown Item'}
              <br />
              {(item.basePrice || item.price || item.cost || item.value || 0).toLocaleString()} 원
            </p>
          </button>
        ))}
      </div>
    );
  };

  if (drinksLoading || dessertsLoading) {
    return <span>Loading 중...⚙</span>;
  }

  if (drinksError || dessertsError) {
    return <span>데이터 가져오기 중 오류 발생🔴: {drinksError?.message || dessertsError?.message}</span>;
  }

  return (
    <div>
      <div>
        <div className="tab-container">
          <input type="radio" name="tab" id="tab1" className="tab tab--1" />
          <label
            className="tab_label"
            htmlFor="tab1"
            onClick={() => setActiveTab("coffee")}
          >
            ☕ coffee
          </label>
          <input type="radio" name="tab" id="tab2" className="tab tab--2" />
          <label
            className="tab_label"
            htmlFor="tab2"
            onClick={() => setActiveTab("dessert")}
          >
            🍰 dessert
          </label>

          <div className="indicator"></div>
        </div>
      </div>

      {/* 피드백 메시지 */}
      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <div>{renderItems()}</div>
      <Footer />
    </div>
  );
}

export default Menu;