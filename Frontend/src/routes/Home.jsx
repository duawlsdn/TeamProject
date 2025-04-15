import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    navigate("/menu", {state: { orderType: type}})
  }

  return(
    <div>
      <h2>주문을 선택해주세요</h2>
      <div>
        <Button text="dine-in" onClick={() => handleSelection("dine-in")} />
        <Button text="take-out" onClick={() => handleSelection("take-out")} />
      </div>
    </div>
  );
}

export default Home;