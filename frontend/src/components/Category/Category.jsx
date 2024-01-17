// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../../bootstrap.css";
import "./Category.css";
import Mechanical from "../../img/Mech.jpg";
import electronics from "../../img/electronics.jpg";
import clothes from "../../img/clothes.jpeg";
import others from "../../img/others.png";
import Electrical from "../../img/Elec.jpg";
import main_cat from "../../img/main_category.png";
function Category() {
  const [navparams, Setnavparams] = useState("");

  return (
    <>
    <div className="main-title">
      <h1>CATEGORIES</h1>
      <img src={main_cat} alt="" />
    </div>

    <div className="list">
    <a
    
        onClick={() => {
          Setnavparams("Mechanical Tools");
        }}
        href={`/see/${navparams}`}
      >
        <div className="con">
            <img  src={Mechanical} alt="" />
            <h1 className="titles">Mechanical Tools</h1>
        </div>
      </a>
      <a
        
        onClick={() => {
          Setnavparams("Electronics");
        }}
        href={`/see/${navparams}`}
      >
        <div className="con">
          <img  src={electronics} alt="" />
          <h1 className="titles">Electronics</h1>
        </div>
      </a>
     
      <a
       
        onClick={() => {
          Setnavparams("Electrical Tools");
        }}
        href={`/see/${navparams}`}
      >
        <div  className="con">
        <img  src={Electrical} alt="" />
          <h1 className="titles">Electrical Tools</h1>
        </div>
      </a>
     
      <a
       
        onClick={() => {
          Setnavparams("Clothes");
        }}
        href={`/see/${navparams}`}
      >
        <div  className="con">

            <img  src={clothes} alt="" />
        
          <h1 className="titles">Clothes</h1>
        </div>
      </a>
      <a
        
        onClick={() => {
          Setnavparams("Others");
        }}
        href={`/see/${navparams}`}
      >
        <div className="con">
          <img  src={others} alt="" />
          <h1 className="titles">Others</h1>
        </div>
      </a>
    </div>
    </>
  );
}

export default Category;
