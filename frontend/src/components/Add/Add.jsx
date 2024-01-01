// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import "../../bootstrap.css";
import "./Add.css";
import axios from "axios";
import inventory from "../../img/inventory.png";

function Add() {
  const [name, Setname] = useState("");
  const [image, Setimage] = useState("");
  const [category, Setcategory] = useState("");
  const [description, Setdescription] = useState("");
  const [price, Setprice] = useState("");
  const [amount, Setamount] = useState("");
  const [dimage,Setdimage]=useState('');
  const navigate=useNavigate();
  function Base64(e) {
    Setimage(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      Setdimage(reader.result);
      // console.log(reader.result);
    };
    reader.onerror = (err) => {
      console.log("error", err);
    };
  }

  async function submit(e) {
    e.preventDefault();
    try {
      toast.success('Product Added Successfully',{
        autoClose:2000,
        onClose:setTimeout(() => {
          navigate('/see-store');
        }, 1000)
      });
      const formdata=new FormData();
      formdata.append('image',image)
      formdata.append('name', name);
      formdata.append('category', category);
      formdata.append('description', description);
      formdata.append('price', price);
      formdata.append('amount', amount);
      console.log(formdata);
      await axios.post('http://localhost:8000/products/add',formdata )
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="main">
      <img className="background" src={inventory} alt="background" />
      <div className="add-wrapper">
        <form className="forms row">
          <h1 className="addNew">Add New Product</h1>
          <div className="Choose-form">
            <input accept="image/*" type="file" onChange={(e)=>{Base64(e)}} />
            <img className="choosen-image" src={dimage} alt="" />
          </div>
          <div className="input-form">
            <div className="inputs">
              <label>Product category:</label>
              <select
                className="select"
                onChange={(e) => {
                  Setcategory(e.target.value);
                }}
                value={category}
              >
                <option value="">Select Category</option>
                <option value="Mechanical Tools">Mechanical Tools</option>
                <option value="Electrical Tools">Electrical Tools</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothes">Clothes</option>
              </select>
            </div>

            <div className="inputs">
              <label>Product name:</label>
              <input
                type="text"
                onChange={(e) => {
                  Setname(e.target.value);
                }}
                placeholder="Add product name"
              />
            </div>

            <div className="inputs">
              <label>Product Price:</label>
              <input
                type="number"
                onChange={(e) => {
                  Setprice(e.target.value);
                }}
                placeholder="Add price of the product"
              />
            </div>
            <div className="inputs">
              <label>Product Amount:</label>
              <input
                type="number"
                onChange={(e) => {
                  Setamount(e.target.value);
                }}
                placeholder="Add amount of product"
              />
            </div>
            <div className="inputs">
              <label>Description:</label>
              <textarea
                className="discr"
                name="description"
                onChange={(e) => {
                  Setdescription(e.target.value);
                }}
                placeholder="Description of product"
              ></textarea>
            </div>
          </div>
          <div className="btn-container">
            <button className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
