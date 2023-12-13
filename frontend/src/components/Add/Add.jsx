// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// import 'dotenv'
import '../../bootstrap.css'
import './Add.css'
import axios from 'axios';
import inventory from '../../img/inventory.png'

function Add() {
  const [name,Setname]=useState('');
  const [image,Setimage]=useState('');
  const [category,Setcategory]=useState('');
  const [description,Setdescription]=useState('');
  const [price,Setprice]=useState('');
  const [amount,Setamount]=useState('');
function Base64(e){
var reader=new FileReader();
reader.readAsDataURL(e.target.files[0]);
reader.onload=()=>{
  Setimage(reader.result);
  // console.log(reader.result);
};
reader.onerror=(err)=>{
  console.log('error', err);
};
}



async function submit(e){
e.preventDefault();
try{
  alert('submitted successfully')
  axios.post('http://localhost:8000/products/add',{
    name,
    image,
    category,
    description,
    price,
    amount
  })
}
catch(e){
  console.log(e);
}
}




  return (
    <>
    <div className='add-wrapper'>
      <img className='background' src={inventory} alt="background" />

     
      <form className='forms row'>
      

        <div className='col-lg-6'>
        <h1 className='addNew'>Add New Product</h1>
          <input accept='image/*' type="file"onChange={Base64}/>
          <img className='choosen-image' src={image} alt="" />
        </div>


        
        <div className='col-lg-6'>
        <label className='col-12'>Product name:</label>
        <input className='col-9' type="text" onChange={(e)=>{Setname(e.target.value)}} placeholder='Add product name' />
        </div>
        <div className='col-lg-6'>
        <label className='col-12'>Product category:</label>
        <input className='col-9' type="text" onChange={(e)=>{Setcategory(e.target.value)}}  placeholder='Add product category'/>
        </div>
       
        <div className='col-lg-6'> 
        <label className='col-12 '>Product Price:</label>
        <input className='col-9' type="number" onChange={(e)=>{Setprice(e.target.value)}} placeholder='Add price of the product' />
        </div>
        <div className='col-lg-6'>
        <label className='col-12'>Product Amount:</label>
        <input className='col-9' type="number" onChange={(e)=>{Setamount(e.target.value)}} placeholder='Add amount of product'/>
        </div>
        <div className='col-12 col-lg-6'> 
          <label>Description:</label>
          <textarea className='description col-12' name="description" onChange={(e)=>{Setdescription(e.target.value)}} cols="35" rows="10" placeholder='Description of product'></textarea>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={submit}>Submit</button>
        </div>
      </form>

    </div>
    </>
  )
}

export default Add