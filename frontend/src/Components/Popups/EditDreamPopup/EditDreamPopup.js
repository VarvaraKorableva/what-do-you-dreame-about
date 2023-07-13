import React from 'react'
import '../AddDreamPopup/AddDreamPopup'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/popaps/EditDreamPopup'

function EditDreamPopup({onClose, isOpen, OnDeleteMyDream}) {

  const [isValid, setIsValid] = React.useState(false)
  const [errorNameMessage, setErrorNameMessage] = React.useState('')
  const [errorImgMessage, setErrorImgMessage] = React.useState('')
  const [errorPriceMessage, setErrorPriceMessage] = React.useState('')
  const [errorDreamLinkMessage, setErrorDreamLinkMessage] = React.useState('')
  
  const [luckyMessage, setLuckyMessage] = React.useState('')

  const [errorName, setErrorName] = React.useState(true)
  const [errorImg, setErrorImg] = React.useState(true)
  const [errorPrice, setErrorPrice] = React.useState(true)
  const [errorDreamLink, setErrorDreamLink] = React.useState(true)

  const [name, setName] = React.useState('')
  const [img, setImg] = React.useState(null)
  const [price, setPrice] = React.useState('')
  const [dreamLink, setDreamLink] = React.useState('')
  const [buttonText, setButtonText] = React.useState('Upload picture');

  const addDreamRef = React.useRef(null);

  const currentUser = React.useContext(CurrentUserContext)
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


  function handleDelete() {
   // OnDeleteMyDream(dream);
  }
  return (
    
    <div className={`add-dream-popup ${isOpen && 'add-dream-popup__opened'}`}>

    <div className="add-dream-popup__container">
    <button 
      className="add-dream-popup__close-button" 
      type="button" 
      onClick={onClose}>
    </button>
    <h2 className="add-dream-popup__title">{translatedContext.popupName}</h2>
      <form 
        className='add-dream-popup__form'
        
        encType="multipart/form-data">
        <label className='add-dream-popup__inputname'>{translatedContext.nameOfDream}<span className='add-dream-popup__inputname-span'>*</span>  
          <input
            className='add-dream-popup__input'
            name='name'
            type='text'
          ></input>
        </label>
        <span className='add-dream-popup__inputmistake'>{errorNameMessage}</span>
        <label className='add-dream-popup__inputname'>{translatedContext.linkToDream}
          <input
            className='add-dream-popup__input'
            name='dreamLink'
            type='url'
          ></input>
          
        </label>
        <span className='add-dream-popup__inputmistake'>{errorDreamLinkMessage}</span>
        <label className='add-dream-popup__inputname'>{translatedContext.priceOfDream}<span className='add-dream-popup__inputname-span'>*</span>
          <input
            className='add-dream-popup__input'
            name='price'
            type='text'
          ></input>
        </label>
        <span className='add-dream-popup__inputmistake'>{errorPriceMessage}</span>
        <label className='add-dream-popup__inputname'>{translatedContext.pictureOfDream}<span className='add-dream-popup__inputname-span'>*</span>
        <button 
          onClick={() => addDreamRef.current.click()}
          className='add-dream-popup__input-btn'
          type="button">
            {buttonText}
        </button> 
        
        <input
          ref={addDreamRef}
          className='add-dream-popup__input'
          name='image'
          type="file"
          hidden
        ></input>

        </label>
        <span className='add-dream-popup__inputmistake'>{errorImgMessage}</span>
        <button 
          className={`${isValid? 'add-dream-popup__btn_active': 'add-dream-popup__btn'}`}
          type='submit'
          disabled={!isValid}
          >
            {translatedContext.createButton}
        </button>
        <button 
          className='add-dream-popup__btn_active'
          type='button'
          onClick={handleDelete}
        >
            {translatedContext.createButton}
        </button>
      </form>  
    </div>
    </div>
  )
}

export default EditDreamPopup;