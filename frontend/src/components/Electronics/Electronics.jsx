// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Electronics.css'

import edit from '../../img/edit.png'
import sell from '../../img/sell.png'

import { useParams,Link } from 'react-router-dom';
function Electronics() {
  const {productType} =useParams();
    const [data,Setdata]=useState([]);
    useEffect(()=>{
      fetch( `http://localhost:8000/Products/see/${productType}`,{
        method: 'GET',
      }).then((res)=>res.json())
      .then((response)=>{
        Setdata(response)
      })

    },[]);

  return (
    <>
    <h1>{productType}</h1>
    <div className='Catagory'>
      
      {
        data.map((i,index)=>{
          const cardstatus = i.amount > 40 ? " SUFFICIENT" : "INSUFFICIENT";

          return(
            <div key={index} className='card'>
            <div className={`status ${cardstatus}`}>{cardstatus}</div>
          <div className='imgs'> 
          <img className='cards-img' src={i.image} alt="" />
          </div>
          <div className='product-detail'>
            <h3>{i.name}</h3>
            <h4>Category: {i.category}</h4>
            <p className="price">Price: {i.price} Birr</p>
            <p className="Amount">Amount: {i.amount}</p>
            <p className="description">{i.description}</p>
          </div>
          <div className="card-actions">
            
            <Link to={`/sell-product/${i._id}/${i.name}/${i.price}/${i.amount}`}>
              <img src={sell} alt="Sell" />
            </Link>

            <Link to={`/edit-product/${i._id}`}>
              <img src={edit} alt="Edit" />
            </Link>
          </div>
        </div>
          )
        })
      }
    </div>
    </>
  )
}

export default Electronics