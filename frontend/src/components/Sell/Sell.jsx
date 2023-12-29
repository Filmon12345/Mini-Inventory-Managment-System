// eslint-disable-next-line no-unused-vars
import React, { useState, useNavigate} from "react";
import "./Sell.css";
import { useParams} from "react-router-dom";

function Sell() {
  const { Id, name, price, amount } = useParams();

  console.log(price);

  const [sold, setSold] = useState("");
  const total = sold * price;
  async function sendSell(e) {
    e.preventDefault();
    try {
      alert("Sold Successfully");
    
     
      const response = await fetch(
        `http://localhost:8000/Products/sell/${Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sold,
          }),
        }
      );  
     

      if (response.ok) {
        console.log("Item Edited Successfully");

        // Handle success, e.g., display a success message
      } else {
        console.error("Failed to Edit item");
        // Handle failure, e.g., display an error message
      }
    } catch (err) {
      console.error("Error:", err);
      // Handle other errors, e.g., display an error message
    }
  }

  return (
    <div className="sell-wrapper">
      <form className="sell-form">
        <div className="title">
        <p>{amount} {name}s in Stock</p>
        </div>

      <div className="sells title">
        <p className="price">Price of 1 Hp = {price} * </p>
          <input
            className="amount"
            type="number"
            id="sellAmount"
            onChange={(e) => setSold(e.target.value)}
            placeholder="Amount..."
          />
           <p>Total:{total}</p>
        <button onClick={sendSell}>Sell</button>
      </div>
     
      </form>
    </div>
  );
}

export default Sell;
