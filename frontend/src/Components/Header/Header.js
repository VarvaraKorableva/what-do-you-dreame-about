import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
//import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function Header({isLoggin, signOut}) {

const location = useLocation();

return (
  <div className='header_container'>
    <Link to="/my-page" className='header_logo'>
      <h1 className='header_logo'> What-do-you-dreame-about ?</h1>
    </Link>
      {isLoggin && location.pathname === '/my-page'?
        <div className='header_wrapper'>
          <button className='header_LogOut-btn' onClick={signOut}>LogOut</button>
        </div>
      :  
      isLoggin ?
        <div className='header_wrapper'>
          <Link to="/my-page" className='header_login-link'>
            <p className='header_login-link'>My Page</p>
          </Link>
        </div>
         
      :
      !isLoggin  || location.pathname === '/sign-up'?
      <Link to="/signin" className='header_login-link'>
        <p className='header_login-link'>Login</p>
      </Link>
      :
      !isLoggin || location.pathname === '/sign-in'?
      <Link to="/signup" className='header_registraion-link'>
        <p className='header_registraion-link'>Registraion</p>
      </Link>
      :
<></>
      }
  </div>  
)
}

export default Header;

/*
        <div className='header_wrapper'>
          <Link to="/signin" className='header_login-link'>
            <p className='header_login-link'>Login</p>
          </Link>
          <Link to="/signup" className='header_registraion-link'>
            <p className='header_registraion-link'>Registraion</p>
          </Link>
        </div>


*/