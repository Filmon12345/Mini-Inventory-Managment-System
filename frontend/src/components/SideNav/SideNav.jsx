// eslint-disable-next-line no-unused-vars
import React from 'react'
import menu from '../../img/menu.png'
import addProduct from '../../img/addProduct.png'
import see from '../../img/eye.png'
import '../../bootstrap.css'
import './SideNav.css'
function SideNav() {
  return (
    <div className='nav-wrapper'>
      <div className='menu'>
        <div className='side-title hamberger'>
          <a href="/"><img src={menu} /></a>
          <p>Dashboard</p>
        </div>
        <div  className='side-title'>
          <a href="/add-product"><img src={addProduct} alt="" /></a>
          <p> Add Product</p>
        </div>
        <div  className='side-title'>
          <a href="/see-store"><img src={see} alt="" /> </a>
          <p>IN Store </p>
        </div>

      </div>

    </div>
  )
}

export default SideNav