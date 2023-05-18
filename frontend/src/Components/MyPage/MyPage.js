import React from 'react'
import './MyPage.css'
import DreamsField from '../DreamsField/DreamsField'
import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function MyPage({addDreams, limit, onImgToChangeAvatar, addPopupOpen, dreams, OnDeleteMyDream, onCardClick }) {

const [toRenderDreams, setToRenderDreams] = React.useState([])
const [isAddAllBtnClicked, setIsAddAllBtnClicked] = React.useState(false)
const [isAddlimitBtnClicked, setIsAddlimitBtnClicked] = React.useState(false)
const [isDreamsArrEmpty, setIsDreamsArrEmpty] = React.useState(false)

const currentUser = React.useContext(CurrentUserContext)

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
/////not right

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

        <Link to="/change-my-profile" className='myPage_inf myPage__link'>
          <p className='myPage_view-link-text'>Change information about yourself →</p>
        </Link>
        <Link to="/my-friends" className='myPage_inf myPage__link'>
          <p className='myPage_view-link-text'>See what my friends dream about →</p>
        </Link>
        <Link to="/friends" className='myPage_inf myPage__link'>
          <p className='myPage_view-link-text'>Search for friends →</p>
        </Link>
      </div>  
      <button 
        type="button" 
        className='myPage_img-btn' 
        onClick={onImgToChangeAvatar}>
        <img 
          className='myPage_img' 
          src={currentUser.avatar} 
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
    <span>nothing to render</span>
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