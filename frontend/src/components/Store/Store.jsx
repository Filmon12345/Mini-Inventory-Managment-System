// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../../bootstrap.css";
import "./Store.css";
import del from "../../img/delete.png";
import edit from "../../img/edit.png";
import sell from "../../img/sell.png";
import { Link } from "react-router-dom";
// import axios from 'axios';
function Store() {
  const [data, Setdata] = useState([]);
  const [search, Setsearch] = useState("");
  // const [show, Setshow] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/products/get", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((products) => {
        // console.log(products);===>is to check fetch method
        Setdata(products);
      });
  }, []);

  const deleteItem = async (id) => {
    const response = await fetch(
      `http://localhost:8000/products/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      alert("item deleted successfully");
      fetch("http://localhost:8000/products/get", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((products) => {
          // console.log(products);===>is to check fetch method
          Setdata(products);
        });
    } else {
      console.error("Failed to delete item");
    }
  };

  return (
    <div className="card-wrapper">
      <input
        className="searchBar"
        type="text"
        onChange={(e) => {
          Setsearch(e.target.value);
        }}
        placeholder="Search for Product"
      />
    

     
      <div className="card-container row">
        {data
          .filter((items) =>
            search.toLowerCase() === ""
              ? items
              : items.name.toLowerCase().includes(search)
          )
          .map((i, index) => {
            const cardstatus = i.amount > 40 ? " SUFFICIENT" : "INSUFFICIENT";
            const status = i.amount > 40 ? "SUFFICIENT" : "INSUFFICIENT";
            return (
              <div key={index} className="card">
              
                  
                <div className={`status ${cardstatus}`}>{status}</div>
                <div className="imgs">
                
                    <img className="cards-img" src={i.image} alt="" />

                </div>
                <div className="product-detail">
                  <h2>{i.name}</h2>
                  <h4>Category: {i.category}</h4>
                  <p className="price">Price:{i.price}</p>
                  <p className="Amount">Amount:{i.amount}</p>
                  <p className="description">{i.description}</p>
    
                </div>
                <div className="card-actions">
                  <img
                    src={del}
                    onClick={() => deleteItem(i._id)}
                    alt="Delete"
                  />
                  <Link
                    to={`/sell-product/${i._id}/${i.name}/${i.price}/${i.amount}`}
                  >
                    <img src={sell} alt="Sell" />
                  </Link>

                  <Link to={`/edit-product/${i._id}`}>
                    <img src={edit} alt="Edit" />
                  </Link>
                </div>
                
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Store;
