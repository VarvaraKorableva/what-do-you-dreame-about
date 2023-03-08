import React from 'react'
import './MyPage.css'
import DreamsField from '../DreamsField/DreamsField'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function MyPage({addPopupOpen, dreams, OnDeleteMyDream, onCardClick}) {

/*const avatar = {
  "avatar":"https://media.istockphoto.com/id/613654620/photo/fashionable-big-red-handbag-on-the-arm-of-the-girl.jpg?b=1&s=170667a&w=0&k=20&c=DCLVnlYnAFIJW0vH1YmzvfhaJQKkbKz0D_ZiXdgyRXc="
}*/

const currentUser = React.useContext(CurrentUserContext)
const imgname = "avatar"

return (
  <div>
    
    <div className='myPage_profile-container'>
      <div className='myPage_inf-container'>
        <p className='myPage_inf'>{currentUser.name}</p>
        <p className='myPage_inf'>{currentUser.birthday}</p>
        <p className='myPage_inf'>{currentUser.about}</p>
        <p className='myPage_inf'>{currentUser.email}</p>

        <Link to="/change-my-profile" className='myPage_inf myPage__link'>
          <p className='myPage_view-link-text'>Изменить информацию о себе →</p>
        </Link>
        
        <Link to="/friends" className='myPage_inf myPage__link'>
          <p className='myPage_view-link-text'>Посмотреть о чем мечтают мои друзья →</p>
        </Link>
      
      </div>  
      <img className='myPage_img' src={currentUser.avatar} alt={imgname}></img>
    </div>  
    <button 
          className='myPage_addBTN'
          type='button'
          onClick={addPopupOpen}>
          добавить мечту
        </button>

    <h2 className='myPage__title'>My dreams ...</h2>

    <DreamsField
    dreams={dreams}
    OnDeleteMyDream={OnDeleteMyDream}
    onCardClick={onCardClick}
    />

    
  </div>  
)
}

export default MyPage;

//<button className='myPage__addBTN'>Add more</button>

//<p className='myPage__subtitle'>I dream about ...</p>
//<p className='myPage__subtitle'>What my friends dream about ...</p>

//<div className='myPage_addBTN-container'>