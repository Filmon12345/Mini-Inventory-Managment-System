// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./TopNav.css";
import logo from "../../img/logo.png";
import de from "../../img/de.png";
function TopNav() {
  const [search, Setsearch] = useState();
  const [searchResult, SetsearchResult] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:8000/products/search/${search}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((product) => {
          SetsearchResult(product);
        });
      if (search === "") {
        SetsearchResult([]);
        return;
      }
    } catch (err) {
      console.log(err.message);
    }
  },);
  return (
    <>
      <div className="top-nav">
        <img className="logo" src={logo} alt="logo" />
        <img className="mini-logo" src={de} alt="logo" />
        <div className="search-wrapper ">
          <input
            className=" searchBar search "
            type="text"
            placeholder="  search ..."
            onChange={(e) => {
              Setsearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row search-results res-sm res-md res-lg">
        {searchResult.map((i, index) => {
          const cardstatus = i.amount > 40 ? " SUFFICIENT" : "INSUFFICIENT";
          const status = i.amount > 40 ? "SUFFICIENT" : "INSUFFICIENT";
          return (
            <div key={index} className="card">
              <div className={`status ${cardstatus}`}>{status}</div>

              <div className="imgs">
               
                  <img
                    className="cards-img"
                    src={`http://localhost:8000/images/${i.image}`}
                    alt=""
                  />
              
              </div>
              <div className="product-detail">
                  <h3>{i.name}</h3>
                  <h6>Category: {i.category}</h6>
                  <h6 className="price">Price: {i.price} Birr</h6>
                  <h6 className="Amount">Amount: {i.amount}</h6>
                  <p className="description"><span>Description:</span> {i.description}</p>
    
                </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TopNav;
