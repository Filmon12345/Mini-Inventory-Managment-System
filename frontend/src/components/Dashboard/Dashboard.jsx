// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import Products from "../../img/Products.png";
import outofstock from "../../img/outofstock.png";
import Cost from "../../img/Cost.png";
import "./Dashboard.css";

function Dashboard() {



  const [data,Setdata] = useState([]);

   useEffect(()=>{
      fetch('http://localhost:8000/products/get',{
        method: 'GET'
      })
      .then((res)=>res.json())
      .then((products)=>{
        Setdata(products);
      });
  
  
   
   },);

   
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
        <div className={` tableContainer`}>
      <table className='summary-table'>
     <thead>
          <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Status</th>
          </tr>
          </thead>
         { data.slice().reverse().map((i,index)=>{
          const cardstatus =i.amount>40?' Sufficient':'Insuficient';
         return(
          <tbody key={index}>
            <tr>
            <td>{i.name}</td>
            <td>{i.category}</td>
            <td>{i.amount}</td>
            <td>{i.price}</td>
            <td className= { `${cardstatus}`}>{cardstatus}</td>
            </tr>
          </tbody>
         )})
          }      
        </table>
    </div>

      </div>
    </div>
  );
}

export default Dashboard;
