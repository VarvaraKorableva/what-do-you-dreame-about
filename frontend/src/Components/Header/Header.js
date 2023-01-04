import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
//import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function Header({isLoggin, signOut}) {

const location = useLocation();

//const isLoggin = false

return (
  <div className='header_container'>
      <h1 className='header_logo'> What-do-you-dreame-about ?</h1>

      {isLoggin && location.pathname === '/my-page'?
        <div className='header_wrapper'>
          <button className='header_login-link' onClick={signOut}>LogOut</button>
        </div>
      :  
      isLoggin && location.pathname === '/my-friend-page'?
        <div className='header_wrapper'>
          <Link to="/my-page" className='header_login-link'>
            <p className='header_login-link'>My Page</p>
          </Link>
        </div>
         
      :
      location.pathname === '/sign-up' || location.pathname === '/sign-in'? <></>
      :
        <div className='header_wrapper'>
          <Link to="/sign-in" className='header_login-link'>
            <p className='header_login-link'>Login</p>
          </Link>
          <Link to="/sign-up" className='header_registraion-link'>
            <p className='header_registraion-link'>Registraion</p>
          </Link>
        </div>
      }
  </div>  
)
}

export default Header;