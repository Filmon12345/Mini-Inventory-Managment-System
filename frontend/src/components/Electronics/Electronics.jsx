// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Electronics.css'

import edit from '../../img/edit.ico'
import sell from '../../img/sell.ico'
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
          <img className='cards-img' src={`http://localhost:8000/images/${i.image}`} alt="" />
          </div>
          <div className='product-detail'>
            <h3>{i.name}</h3>
            <h6>Category: {i.category}</h6>
            <h6 className="price">Price: {i.price} Birr</h6>
            <h6 className="Amount">Amount: {i.amount}</h6>
            <p className="description"><span>Description: </span>{i.description}</p>
          </div>
          <div className="card-actions">
            
            <Link to={`/sell-product/${i._id}/${i.name}/${i.price}/${i.amount}`}>
              <img src={sell} alt="Sell" className='icons'/>
            </Link>

            <Link to={`/edit-product/${i._id}`}>
              <img src={edit} alt="Edit" className='icons' />
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