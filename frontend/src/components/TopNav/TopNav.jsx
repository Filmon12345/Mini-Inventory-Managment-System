// eslint-disable-next-line no-unused-vars
import React from 'react'
import './TopNav.css'
import logo from '../../img/logo.png'
function TopNav() {
  return (<>
    <div className='top-nav'>
    <img className='logo' src={logo} alt="logo" />
    </div>
    </>
  )
}

export default TopNav