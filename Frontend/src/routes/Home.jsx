import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import  '../css/Home.css'

function Home() {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    navigate("/menu", {state: { orderType: type}})
  }

  return(
    <div className="Home-container">
      <h2>주문을 선택해주세요</h2>
      <div className="Home">
        <Button text="dine-in" onClick={() => handleSelection("dine-in")} />
        <Button text="take-out" onClick={() => handleSelection("take-out")} />
      </div>
    </div>
  );
}

export default Home;