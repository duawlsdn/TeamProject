    import { useState } from "react";
    import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
    import { getDrinks, getDesserts, createOrder } from "../api/menuApi";
    import "../css/menu.css";
    import Footer from "./footer";

    function Menu() {
    const [activeTab, setActiveTab] = useState("coffee");
    const queryClient = useQueryClient();
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

    // 주문 뮤테이션
    const orderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (err) => {
            console.error("Error placing order:", err);
        },
    });

    const handleOrder = (item, type) => {
        orderMutation.mutate({
            itemId: item.id,
            itemType: type.toUpperCase(),
            quantity: 1,
            totalPrice: item.basePrice || item.price,
        });
    };

    const renderItems = () => {
        const items = activeTab === "coffee" ? drinks : desserts;
        if (!items) return null;
        return (
            <div className="menu-grid">
            {items.map((item) => (
                <button
                key={item.id}
                onClick={() => handleOrder(item, activeTab === "coffee" ? "DRINK" : "DESSERT")}
                className="menu-card"
                >
                <img
                    src={`${BACKEND_URL}${item.image}`}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: `${item.width}px`, height: `${item.height}px` }}
                    />
                <p>
                    {item.name}
                    <br />
                    {(item.basePrice || item.price).toLocaleString()} 원
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
        return <span>데이터 가져오기 중 오류 발생🔴</span>;
    }

    return (
        <div>
            <div>
                <div className="tab-container">
                <input type="radio" name="tab" id="tab1" className="tab tab--1" />
                <label className="tab_label" htmlFor="tab1"
                    onClick={() => setActiveTab("coffee")}
                >
                    ☕ coffee
                </label>
                <input type="radio" name="tab" id="tab2" className="tab tab--2" />
                <label className="tab_label" htmlFor="tab2"
                    onClick={() => setActiveTab("dessert")}
                >
                    🍰 dessert
                </label>

                <div className="indicator"></div>
                </div>
            </div>
            <div>{renderItems()}</div>
            <Footer />
        </div>
    );
    }

    export default Menu;