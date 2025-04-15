import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDrinks, getDesserts, createOrder } from "../api/menuApi";
import { Button } from "@mui/material";

function Menu() {
    const [activeTab, setActiveTab] = useState("coffee");
    const queryClient = useQueryClient();

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
        return items.map((item) => (
            <button
                key={item.id}
                onClick={() => handleOrder(item, activeTab === "coffee" ? "DRINK" : "DESSERT")}
            >
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                ) : (
                    <div
                        style={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#5f5f5f",
                            borderRadius: "5px",
                        }}
                    >
                        No Image
                    </div>
                )}
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    {item.name}
                    <br />
                    {(item.basePrice || item.price).toLocaleString()} 원
                </div>
            </button>
        ));
    };

    if (drinksLoading || dessertsLoading) {
        return <span>Loading 중...⚙</span>;
    }

    if (drinksError || dessertsError) {
        return <span>데이터 가져오기 중 오류 발생🔴</span>;
    }

    return (
        <div>
            <div style={{ marginBottom: "16px" }}>
                <Button
                    variant={activeTab === "coffee" ? "contained" : "outlined"}
                    onClick={() => setActiveTab("coffee")}
                    style={{ marginRight: "8px" }}
                >
                    ☕ Coffee
                </Button>
                <Button
                    variant={activeTab === "dessert" ? "contained" : "outlined"}
                    onClick={() => setActiveTab("dessert")}
                >
                    🍰 Dessert
                </Button>
            </div>
            <div>
                {renderItems()}
            </div>
        </div>
    );
}

export default Menu;