// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../../bootstrap.css";
import "./Store.css";
import del from "../../img/delete.png";
import edit from "../../img/edit.png";
import sell from "../../img/sell.png";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
// import axios from 'axios';
function Store() {
  const [search, Setsearch] = useState('');
  const [showtable, Setshowtable] = useState('d-none');
  const [showcard,Setshowcard] = useState('');
  const [data,Setdata] = useState([]);
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
    const confirmed = window.confirm('Are you sure you want to delete this item?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/products/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Item deleted successfully');
        fetch('http://localhost:8000/products/get', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((products) => {
            Setdata(products);
          });
      } else {
      console.error("Failed to delete item");
      toast.error('Failed to delete item');
    }
  } catch (err) {
    console.error('Error:', err);
    toast.error('An error occurred while deleting the item');
  }
} 

function showtablefun(){
  Setshowtable('d-block')
  Setshowcard('d-none')
}
function showcardfun(){
  Setshowtable('d-none')
  Setshowcard('d-grid')
}
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
    <div className='btn btn-secondary'
    style={{
      fontSize:"larger",
      marginLeft:100,
      marginBottom:10
    }}
    >
      <button className="btn btn-secondary " onClick={showcardfun} >Product Card</button>
      <button className="btn btn-secondary " onClick={showtablefun}>Products Table</button>
    </div>
      <div className={`${showcard} card-container row`}>
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
                   <img className='cards-img' src={i.image} alt="" />
                </div>
                <div className="product-detail">
                  <h3>{i.name}</h3>
                  <h4>Category: {i.category}</h4>
                  <p className="price">Price: {i.price} Birr</p>
                  <p className="Amount">Amount: {i.amount}</p>
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
            )
          })}
      </div>

      <div className={`${showtable}`} style={{
      marginLeft:100
    }}>
      <table className='summary-table'>
     
          <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Status</th>
          </tr>
        
         { data.map((i,index)=>{
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
  );
}

export default Store;
