import React from 'react'
import './PopapChangeAvatar.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/popaps/PopapChangeAvatar'

import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function PopapChangeAvatar({onClose, isOpen, handleUpdateAvatarSubmit}) {

const currentUser = React.useContext(CurrentUserContext)  

const [error, setError] = React.useState(false);
const [errorMessage, setErrorMessage] = React.useState('');
const [img, setImg] = React.useState(null);
const [imagePreview, setImagePreview] = React.useState(null);
//const [imagePreview, setImagePreview] = React.useState(null);

const [isFormValid, setIsFormValid] = React.useState(false);
const editAvatarRef = React.useRef(null);

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
  let buttonText = translatedContext.button;

function handleImgLinkChange(e) {
  setImg(e.target.files[0]);
}

function handleSubmit(e) {
  e.preventDefault();
  if (img) {
    const userId = currentUser._id;
    const formData = new FormData();
    
    formData.append('userId', userId);
    formData.append('image', img);

    handleUpdateAvatarSubmit(formData)
 
    setImg(null)
    setIsFormValid(false)
  
  } else {
    console.log('Файл не выбран');
  }
}

React.useEffect(() => {
  if(img) {
    setImagePreview(URL.createObjectURL(img))
  }
}, [img]);

function checkValid(img) {
  if (!img) {
    return setImg(null);
  }

  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const isValidExtension = allowedExtensions.test(img.name);

  if (!isValidExtension) {
    setImg(null)
    setError(true)
    setErrorMessage(translatedContext.errors.message)
    setIsFormValid(false);
  } else {
    setError(false);
    setErrorMessage('');
    setIsFormValid(true);
  }
}

React.useEffect(() => {
  checkValid(img)
}, [img]);


  return (
    
    <div className={`popap-change-avatar ${isOpen ? 'popap-change-avatar__opened' : ""}`}>

      <div className="popap-change-avatar__container">
      <button 
        onClick={onClose}
        className="popap-change-avatar__close-button" 
        type="button">
      </button>
      <h2 className="popap-change-avatar__title">{translatedContext.title}</h2>
      <form 
        className='popap-change-avatar__form'
        onSubmit={handleSubmit}
        method="post" 
        encType="multipart/form-data"
        >
        <button 
          onClick={() => editAvatarRef.current.click()}
          className={`popap-change-avatar__input ${img ? 'popap-change-avatar__input_loaded' : ''}`}          
          type="button">
          {buttonText}
        </button>

        <input
          ref={editAvatarRef}
          className='popap-change-avatar__input'
          name='image'
          type="file"
          placeholder={translatedContext.placeholderAddYourPicture}
          onChange={handleImgLinkChange}
          hidden
        >
        </input>
        {/*<span>{error? {errorMessage} : ''}</span>*/}
        {error && <span className='popap-change-avatar__error-message'>{errorMessage}</span>}

        <div className='popap-change-avatar__imagePreview-container'>
        {img? 
          <img src={imagePreview} className='popap-change-avatar__imagePreview' alt='picture'></img>
          :
          <img src={`http://localhost:3000${currentUser.avatar}`} className='popap-change-avatar__imagePreview' alt='picture'></img>
          //src={`http://localhost:3000/files/${currentUser.avatar}`}
          //src={`http://localhost:3000${currentUser.avatar}`}
        } 
        </div>

        <button 
          className={`popap-change-avatar__btn ${isFormValid ? 'popap-change-avatar__btn_active' : ''}`}          
          type='submit'
          disabled={!isFormValid}
          >
          {translatedContext.textButton}
        </button>
      </form>  
      </div>
    </div>
  )
}

export default PopapChangeAvatar;

/*
const rus = {
    translatedContext.title: 'Изменение аватара',
    translatedContext.button: 'Изменить аватар',

    translatedContext.textButton: 'Загрузить аватар',

    translatedContext.placeholderAddYourPicture: 'Добавьте свою фотографию',
    

    translatedContext.errors: {
        translatedContext.errors.message: 'Пожалуйста, загружайте только файлы изображений (jpg, jpeg, png)',
    }
}
*/