import React from 'react'
import './InfoTooltip.css'
import { Link } from 'react-router-dom'

function InfoTooltip({onClose, isOpen}) {

 //{ isOpen, onClose, noMistake }
 //<svg className={`infoTooltip__pic ${noMistake? "infoTooltip__pic_success" : "infoTooltip__pic_fail"}`}></svg>
 //const isOpen = true
 const noMistake = true
 //const onClose = true

  return (
    
    <aside className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
      <button className="popup__close-button" type="button" onClick={onClose}></button>
        <div className="popup__form">

          {noMistake?
          <>
          <h2 className="infoTooltip__title"> You have successfully registered! </h2>
          <h3 className="infoTooltip__title"> Do you want to add or change information about yourself? if it's not, it's ok, you may do it later. </h3>
          <div className="infoTooltip__btn-container">
          <Link to="/change-my-profile" className='infoTooltip__link'>
            <button className='infoTooltip__btn' onClick={onClose}>Yes</button>
          </Link>
          <Link to="/my-page" className='infoTooltip__link'>
            <button className='infoTooltip__btn' onClick={onClose}>No</button>
          </Link>
          </div>
          </>
          :
          <>
            <svg className="infoTooltip__pic infoTooltip__pic_fail"></svg>
            <h2 className="infoTooltip__title">Что-то пошло не так! Попробуйте ещё раз.</h2> 
          </>

          }
        </div>
      </div>
    </aside>

  );
}
  
export default InfoTooltip;
/**
 * 
 * 
 *           <h2 className="infoTooltip__title">
              {noMistake? "You have successfully registered! Do you want to add information about yourself? (if not, it's ok, you may do it later)" 
              : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
 */