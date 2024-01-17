// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import Products from "../../img/Products.png";
import outofstock from "../../img/outofstock.png";
import Cost from "../../img/Cost.png";
import "./Dashboard.css";

function Dashboard() {
  const [search, Setsearch] = useState();
  const [searchResult, SetsearchResult] = useState([]);
  const [navparams, Setnavparams] = useState("");
  const [data, Setdata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products/get", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((products) => {
        // console.log(products);===>is to check fetch method
        Setdata(products);
      });

    try {
      fetch(`http://localhost:8000/products/search/${search}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((product) => {
          SetsearchResult(product);
        });
    } catch (err) {
      console.log(err.message);
    }
  }, [search]);
  const totalCost = data.reduce((acc, i) => {
    const productcost = i.price * i.amount;
    return acc + productcost;
  }, 0);
  const totalamount = data.reduce((acc, i) => {
    const amounts = i.amount * 1;
    return acc + amounts;
  }, 0);

  const outOfStock = data.reduce((acc, i) => {
    if (i.amount < 40) {
      const amt = i.amount - (i.amount - 1);
      return acc + amt;
    } else {
      const amt = 0;
      return acc + amt;
    }
  }, 0);

  return (
    <div>
      <input
        className="search-product"
        type="text"
        placeholder="Search A Product"
        onChange={(e) => {
          Setsearch(e.target.value);
        }}
      />
      <div>
        <div className=" total">
          <div className="totalAmount">
              <p>Total Amount of Products</p>
              <img  src={Products} alt="" />
              <p className="amount"> {totalamount} </p>
          </div>
          <div className="totalAmount">
              <p>Total Cost</p>
              <img  src={Cost} alt="" />
              <p className="amount">ETB {totalCost}</p>
          </div>
          <div className="totalAmount">
              <p className="card-amt">Amounts of Product Below 40</p>
              <img style={{width:95}} src={outofstock} alt="" />
              <p className="amount">{outOfStock}</p>        
          </div>
        </div>
        <hr />
        <div className="dashboard-container">
          {searchResult.map((i, index) => {
            const cardstatus = i.amount > 40 ? "SUFFICIENT" : "INSUFFICIENT";
            const status = i.amount > 40 ? "SUFFICIENT" : "INSUFFICIENT";
            return (
              <div key={index} className="card">
                <div className={`status ${cardstatus}`}>{status}</div>

                <div className="imgs">
                  <img className="cards-img" src={i.image} alt="" />
                </div>
                <div className="product-detail">
                  <h3>{i.name}</h3>
                  <h4>Category: {i.category}</h4>
                  <p className="price">Price: {i.price} Birr</p>
                  <p className="Amount">Amount: {i.amount}</p>
                  <p className="description">{i.description}</p>
                </div>
              </div>
            );
          })}
          <div className="category-list">
            <a
              className="catagory"
              href={`/see/${navparams}`}
              onClick={() => {
                Setnavparams("Electronics");
              }}
            >
              {" "}
              <div>
                <h1 className="title">Electronics</h1>
              </div>
            </a>
            <a
              className="catagory"
              href={`/see/${navparams}`}
              onClick={() => {
                Setnavparams("Mechanical Tools");
              }}
            >
              {" "}
              <div>
                <div>
                  <h1 className="title">Mechanical Tools</h1>
                </div>
              </div>
            </a>
            <a
              className="catagory"
              href={`/see/${navparams}`}
              onClick={() => {
                Setnavparams("Electrical Tools");
              }}
            >
              {" "}
              <div>
                <div className="  ">
                  <h1 className="title">Electrical Tools</h1>
                </div>
              </div>
            </a>
            <a
              className="catagory"
              href={`/see/${navparams}`}
              onClick={() => {
                Setnavparams("Clothes");
              }}
            >
              {" "}
              <div>
                <div>
                  <h1 className="title">Clothes</h1>
                </div>
              </div>
            </a>
             <a
              className="catagory"
              href={`/see/${navparams}`}
              onClick={() => {
                Setnavparams("others");
              }}
            >
              {" "}
              <div>
                <h1 className="title">Others</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
