import React from 'react'
import './MyPage.css'
import DreamsField from '../DreamsField/DreamsField'
import arrow from '../../images/lineToButton.png'

import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function MyPage({ addDreams, limit, onImgToChangeAvatar, addPopupOpen, dreams, OnDeleteMyDream, onCardClick }) { 

const [toRenderDreams, setToRenderDreams] = React.useState([])
const [isAddAllBtnClicked, setIsAddAllBtnClicked] = React.useState(false)
const [isAddlimitBtnClicked, setIsAddlimitBtnClicked] = React.useState(false)
const [isDreamsArrEmpty, setIsDreamsArrEmpty] = React.useState(false)

const currentUser = React.useContext(CurrentUserContext)

const userId = currentUser._id

React.useEffect(() => {
  setToRenderDreams(dreams)
  setIsAddAllBtnClicked(false)
  setIsAddlimitBtnClicked(false)
  checkLengthOfDreams()
}, [dreams]);

React.useEffect(() => {
  checkLengthOfDreams()
}, [isAddAllBtnClicked]);

const isEpmty = toRenderDreams.length === 0
const isDisappear = toRenderDreams.length <= limit

function changeAllDreamsBtnStatus() {
  setIsAddAllBtnClicked(true)
}

function checkLengthOfDreams() {
  if(isAddAllBtnClicked) {
    setIsDreamsArrEmpty(true)
  }else{
    setIsDreamsArrEmpty(false)
  }
}

function handleAddDreams() {
  addDreams()
  setIsAddlimitBtnClicked(true)
}

return (
  <div>
    
    <div className='myPage_profile-container'>
      <div className='myPage_inf-container'>
        <p className='myPage_inf'>Hello, {currentUser.name}</p>
        <div className='myPage_link-container'>
          <Link to={`/users/${userId}/dates`} className='myPage_inf myPage__link'>
            <p className='myPage_view-link-text'>Add important dates →</p>
          </Link>
          <Link to="/change-my-profile" className='myPage_inf myPage__link'>
            <p className='myPage_view-link-text'>Change information about yourself →</p>
          </Link>
          <Link to="/users" className='myPage_inf myPage__link'>
            <p className='myPage_view-link-text'>Search people →</p>
          </Link>
        </div>
      </div>  
      <button 
        type="button" 
        className='myPage_img-btn' 
        onClick={onImgToChangeAvatar}>
        <img 
          className='myPage_img' 
          //src={currentUser.avatar} 6904_3992fe627ce13433b109e56fa618cf79-500x500.jpeg
          //src={`http:\\localhost:3000\${currentUser.avatar}`} 
          src={`http://localhost:3000${currentUser.avatar}`}

          //http://localhost:3000/6904_3992fe627ce13433b109e56fa618cf79-500x500.jpeg
          alt={currentUser.name}>
        </img>
      </button>
    </div>  
    <div className='myPage_addBTN-container'>
      <button 
        className='myPage_addBTN'
        type='button'
        onClick={addPopupOpen}>
        Add a new dream
      </button>
    </div>
    {isEpmty?
    <div className='myPage__container-about-empty-arr'>
      <img src={arrow} alt="arrImg" className='myPage__arrow-img'/>
      <p className='myPage__message-about-empty-arr'>
        In order to add a dream, click on the button and fill out the form. 
        Add a dream link so that your friend can easily fulfill your dream.
      </p>
    </div>
    :
    <>
    <DreamsField
    dreams={toRenderDreams}
    OnDeleteMyDream={OnDeleteMyDream}
    onCardClick={onCardClick}
    limit={limit}
    isAddAllBtnClicked={isAddAllBtnClicked}
    />

    <div className='myPage__container-add-more-to-the-page'>
      {isDreamsArrEmpty || isDisappear?
        <></>
      :
        <>
          <button 
            className='myPage__add-more-to-the-page'
            type='button'
            onClick={handleAddDreams}>
            See more
          </button>
          <button
            className='myPage__add-more-to-the-page'
            type='button'
            onClick={changeAllDreamsBtnStatus}>
            See all
          </button>
        </>
      }
    </div>
    </>
  }

  </div>  
)
}

export default MyPage;


/*
        <Link to="/my-friends" className='myPage_inf myPage__link'>
          <p className='myPage_view-link-text'>See what my friends dream about →</p>
        </Link>
*/