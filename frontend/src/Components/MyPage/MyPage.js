import React from 'react'
import './MyPage.css'
import DreamsField from '../DreamsField/DreamsField'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
//import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function MyPage() {

/*const avatar = {
  "avatar":"https://media.istockphoto.com/id/613654620/photo/fashionable-big-red-handbag-on-the-arm-of-the-girl.jpg?b=1&s=170667a&w=0&k=20&c=DCLVnlYnAFIJW0vH1YmzvfhaJQKkbKz0D_ZiXdgyRXc="
}*/
const currentUser = React.useContext(CurrentUserContext)
const imgname = "avatar"

return (
  <div>
    
    <div className='myPage_profile-container'>
      <div className='myPage_inf-container'>
        <p className='myPage_inf'>Varvara Korableva</p>
        <p className='myPage_inf'>4.12.1990</p>
      </div>  
      <img className='myPage_img' src={currentUser.avatar} alt={imgname}></img>
    </div>  

    <div className='myPage_manage-container'>
      <div className='myPage_addBTN-container'>
        <p className='myPage__subtitle'>I dream about ...</p>
        <button className='myPage_addBTN'>add dream</button>
      </div>

      <div className='myPage_viewBTN-container'>
      <p className='myPage__subtitle'>What my friends dream about ...</p>
      <div className='myPage_view-link-container'>
        <Link to="/my-friend-page" className='myPage_view-link'>
          <p className='myPage_view-link-text'>Посмотреть о чем мечтают мои друзья</p>
        </Link>
      </div>
      </div>
    </div>
      
    <h2 className='myPage__title'>My dreams ...</h2>

    <DreamsField/>

    <button className='myPage__addBTN'>Add more</button>
  </div>  
)
}

export default MyPage;