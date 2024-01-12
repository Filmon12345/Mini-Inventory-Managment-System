// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../../bootstrap.css";
import "./Store.css";
import del from "../../img/delete1.ico";
import edit from "../../img/edit.ico";
import sell from "../../img/sell.ico";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
// import axios from 'axios';
function Store() {
  const [search, Setsearch] = useState('');
  const [showtable, Setshowtable] = useState('d-none');
  const [showcard,Setshowcard] = useState('');
  const [data,Setdata] = useState([]);
 const [isActivet ,setIsActivet] = useState(false);
 const [isActivec ,setIsActivec] = useState(true)
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
        toast.success('Product deleted Successfully');
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
        placeholder="Search....."
      />
    <div className='Card-table ' >
      <button className={`btn btn-success ${isActivec?'active':''}`} onClick={ ()=>{
        setIsActivec(true)
        setIsActivet(false)
        showcardfun()}} >Product Card</button>
      <button className={`btn btn-success ${isActivet?'active':''}`} onClick={()=>{
        setIsActivet(true)
        setIsActivec(false)
        showtablefun()}}>Products Table</button>
    </div>
      <div className={`${showcard} card-container row`}>
        {data
          .filter((items) =>
            search.toLowerCase() === ""
              ? items
              : items.name.toLowerCase().includes(search)
          )
          .map((i, index) => {
            const cardstatus = i.amount > 40 ? "SUFFICIENT" : "INSUFFICIENT";
            const status = i.amount > 40 ? "SUFFICIENT" : "INSUFFICIENT";
            return (
              <div key={index} className="card">
              
                <div className={`status ${cardstatus}`}>{status}</div>
                <div className="imgs">
                   <img className='cards-img' src={`http://localhost:8000/images/${i.image}`} alt="" />
                </div>
                <div className="product-detail">
                  <h3>{i.name}</h3>
                  <h6>Category: {i.category}</h6>
                  <h6 className="price">Price: {i.price} Birr</h6>
                  <h6 className="Amount">Amount: {i.amount}</h6>
                  <p className="description"><span>Description:</span> {i.description}</p>
    
                </div>
                <div className="card-actions">
                  <img
                    src={del}
                    onClick={() => deleteItem(i._id)}
                    alt="Delete"
                    className="icons"
                  />
                  <Link
                    to={`/sell-product/${i._id}/${i.name}/${i.price}/${i.amount}`}
                  >
                    <img src={sell} alt="Sell" className="icons"/>
                  </Link>

                  <Link to={`/edit-product/${i._id}`}>
                    <img src={edit} alt="Edit" className="icons" />
                  </Link>
                </div>
                
              </div>
            )
          })}
      </div>

      <div className={` tableContainer ${showtable}`}>
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
