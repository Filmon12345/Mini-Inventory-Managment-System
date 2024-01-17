// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Sell.css";
import { useParams, useNavigate } from "react-router-dom";

function Sell() {
  const { Id } = useParams();
  const [sold, setSold] = useState("");
  const [info, setinfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/Products/get/${Id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setinfo(data));
    console.log(info);
  }, [Id, info]);

  const sendSell = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Are you Sure you Want to Sell ${sold}  ${info.name}?`
    );
    if (!confirmed) {
      return;
    }

    try {
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
        toast.success("Item sold successfully", {
          autoClose: 2000,
          onClose: setTimeout(() => {
            navigate("/see-store");
          }, 3000),
        });

        // Handle success, e.g., display a success message
      } else {
        toast.error("Failed to sell item");
        // Handle failure, e.g., display an error message
      }
    } catch (err) {
      toast.error("An error occurred while selling the item");
      console.error("Error:", err);
      // Handle other errors, e.g., display an error message
    }
  };
  const tax = sold * info.price * 0.15;
  const total = sold * info.price + tax;

  return (
    <div className="sell-container">
      <h1>{info.name}</h1>
      <form className=" sell-form d-flex gap-5">
        <div  className=" sell-upper-form ">
          <div>
            <label >Amount in Stock :</label>{" "}
            <span >{info.amount}</span>
          </div>

          <div>
            <label >Price: </label>{" "}
            <span > {info.price} Birr</span> <br />
          </div>
          <div>
            <label htmlFor="sellAmount ">Enter Amount to be Sold :</label>{" "}
            <input
              className="amount"
              type="number"
              onChange={(e) => setSold(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Tax(15%) : </label>
            <span> {tax} birr</span>
          </div>

          <div>
            <label htmlFor=""> Total:</label> 
            <span>{total} birr</span>
          </div>
        </div>
        <div className=" image-form ">
          <img
            className="sell-image"
            src={`http://localhost:8000/images/${info.image}`}
            alt=""
          />
        </div>
      </form>
      <button className="btn btn-success px-4 " onClick={sendSell}>
        Sell
      </button>
    </div>
  );
}

export default Sell;
