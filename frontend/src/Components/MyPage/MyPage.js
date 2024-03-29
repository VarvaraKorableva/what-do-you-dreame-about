import React from 'react'
import './MyPage.css'
import DreamsField from '../DreamsField/DreamsField'
import arrow from '../../images/lineToButton.png'


import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/MyPageLanguageData'

function MyPage({OnEditMyDream, addDreams, limit, onImgToChangeAvatar, addPopupOpen, dreams, OnDeleteMyDream, onCardClick }) { 

const [toRenderDreams, setToRenderDreams] = React.useState([])
const [isAddAllBtnClicked, setIsAddAllBtnClicked] = React.useState(false)
const [isAddlimitBtnClicked, setIsAddlimitBtnClicked] = React.useState(false)
const [isDreamsArrEmpty, setIsDreamsArrEmpty] = React.useState(false)

const currentUser = React.useContext(CurrentUserContext)
const userId = currentUser._id

const { language } = React.useContext(LanguageContext)
const { en, rus, hebrew } = choose;

let translatedContext = '';
if (language === 'en') {
  translatedContext = en;
} else if (language === 'rus') {
  translatedContext = rus;
} else if (language === 'hebrew') {
  translatedContext = hebrew;
}

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
        <p className='myPage_inf'>{translatedContext.greetings}, {currentUser.name}</p>
        <div className='myPage_link-container'>
          <Link to={`/users/${userId}/dates`} className='myPage_inf myPage__link'>
            <p className='myPage_view-link-text'>{translatedContext.addImportantDates} →</p>
          </Link>
          <Link to="/change-my-profile" className='myPage_inf myPage__link'>
            <p className='myPage_view-link-text'>{translatedContext.ChangeInformationAboutYourself} →</p>
          </Link>
          <Link to="/my-subscriptions" className='myPage_inf myPage__link'>
            <p className='myPage_view-link-text'>{translatedContext.SeeWhatMyFriendsDreamAbout} →</p>
          </Link>
          <Link to="/users" className='myPage_inf myPage__link'>
            <p className='myPage_view-link-text'>{translatedContext.SearchPeople} →</p>
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
        {translatedContext.button}
      </button>
    </div>
    {isEpmty?
    <div className='myPage__container-about-empty-arr'>
      <img src={arrow} alt="arrImg" className='myPage__arrow-img'/>
      <p className='myPage__message-about-empty-arr'>
        {translatedContext.text}
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
    OnEditMyDream={OnEditMyDream}
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
            {translatedContext.SeeMoreButton}
          </button>
          <button
            className='myPage__add-more-to-the-page'
            type='button'
            onClick={changeAllDreamsBtnStatus}>
            {translatedContext.SeeAllButton}
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