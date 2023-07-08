import React from 'react'
import './InfoTooltip.css'
//import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/popaps/AddAvatarPopap'

function AddAvatarPopap({onClose, isOpen, handleAddAvatar}) {

  //const isOpen =true

 //{ isOpen, onClose, noMistake }
 //<svg className={`infoTooltip__pic ${noMistake? "infoTooltip__pic_success" : "infoTooltip__pic_fail"}`}></svg>
 //const isOpen = true
 const noMistake = true
 //const [isActive, setIsActive] = React.useState(false);
 const [isFormValid, setIsFormValid] = React.useState(false);
 const [img, setImg] = React.useState(null);
 const [imagePreview, setImagePreview] = React.useState(null);
 const addAvatarRef = React.useRef(null);
 const [error, setError] = React.useState(false);
 const [errorMessage, setErrorMessage] = React.useState('');


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

 let buttonText = translatedContext.buttonTextUploadAvatar;
 
 React.useEffect(() => {
  if(img) {
    setImagePreview(URL.createObjectURL(img))
  }
}, [img]);

 function handleImgLinkChange(e) {
   setImg(e.target.files[0]);
 }
/*
 const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
 const isValidExtension = allowedExtensions.test(img.name);

 if (!isValidExtension) {
   // Неправильное расширение файла
   alert('Пожалуйста, загрузите только файлы изображений (jpg, jpeg, png, gif).');
   //image.value = ''; // Очистить поле ввода файла
   return;
 }*/
 
 function handleSubmit(e) {
   e.preventDefault();
   if (img) {
     const userId = currentUser._id;
     const formData = new FormData();
     
     formData.append('userId', userId);
     formData.append('image', img);
 
     handleAddAvatar(formData)

     setImg(null)
     setIsFormValid(false)
     onClose()
 
   } else {
     console.log('Файл не выбран');
   }
 }

  const basicPicForAvatar = {
  
      linkDog:"https://media.istockphoto.com/id/972769656/photo/cute-dog-shih-tzu-portrait-wearing-human-clothes-on-vintage-background-hipster-dog.jpg?s=612x612&w=0&k=20&c=hJSwlqA-vMwauqUasxu8oPosEzTFJhawuC24qZFqr0c=",
      linkCat:"https://media.istockphoto.com/id/483184544/photo/cat-in-clothes.jpg?s=612x612&w=0&k=20&c=IWq56lu2NHq07dxut0yvfdNXvZJeKGsXom7w66HBQks=",
      linkGiraf:"https://media.istockphoto.com/id/687033954/photo/giraffe-headed-woman-dressed-up-in-office-style.jpg?s=612x612&w=0&k=20&c=x5FkIuKNtgBsCeB-PdsnUHHzm_c4VexRUkrxM38ofLs=",
      linkBuldog:"https://media.istockphoto.com/id/1324705501/photo/portrait-of-pedigree-pure-breed-dog-as-royalty.jpg?s=612x612&w=0&k=20&c=hDAB2zT91EqWjo64FcHic0o2MWdQhVQgnJ6_rBOg970=",
}

function checkValid(img) {
  if (!img) {
    return setImg(null);
  }

  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const isValidExtension = allowedExtensions.test(img.name);

  if (!isValidExtension) {
    setImg(null)
    setError(true);
    setErrorMessage(translatedContext.errors.message);
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
    
    <aside className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">

        <div className="popup__form">

          {noMistake?
          <>
          <h2 className="infoTooltip__title">{translatedContext.youHaveSuccessfullyRegistered}</h2>
          <h3 className="infoTooltip__title">{translatedContext.letAddAvatar}</h3>
            <form
              //className='popap-change-avatar__form'
              onSubmit={handleSubmit}
              method="post" 
              encType="multipart/form-data"
            >
              <button 
                onClick={() => addAvatarRef.current.click()}
                className='popap-add-avatar__input-btn'
                type="button">
                {buttonText}
              </button> 
              <input
                ref={addAvatarRef}
                className='popap-change-avatar__input'
                name='image'
                type="file"
                placeholder="Add your picture"
                onChange={handleImgLinkChange}
                hidden
              >
              </input>

              {error && <span className='popap-add-avatar__error-message'>{errorMessage}</span>}

              <div className='popap-add-avatar__imagePreview-container'>
                {img && (
                  <img src={imagePreview} className='popap-add-avatar__imagePreview'></img>
                )}  
              </div>
              {/*}
              <p className='popap-change-avatar__sub-title'>Or you can choose from the suggested:</p>
              <ul className='popap-change-avatar__img-container-ul'>
                <li className='popap-change-avatar__img-wrapper-li'>
                  <img
                    className='popap-change-avatar__img'
                    alt = 'pic' 
                    src={basicPicForAvatar.linkDog}
                  >
                  </img>
                </li>
                <li className='popap-change-avatar__img-wrapper-li'>
                  <img
                    className='popap-change-avatar__img'
                    alt = 'pic' 
                    src={basicPicForAvatar.linkCat}
                  >
                  </img>
                </li>
                <li className='popap-change-avatar__img-wrapper-li'>
                  <img
                    className='popap-change-avatar__img popap-change-avatar__img_activ'
                    alt = 'pic' 
                    src={basicPicForAvatar.linkGiraf}
                  >
                  </img>
                </li>
                <li className='popap-change-avatar__img-wrapper-li'>
                  <img
                    className='popap-change-avatar__img'
                    alt = 'pic' 
                    src={basicPicForAvatar.linkBuldog}
                  >
                  </img>
                </li>
              </ul>
*/}
              <button 
                className={`popap-add-avatar__btn ${isFormValid && 'popap-add-avatar__btn__active'}`}
                type='submit'
                disabled={!isFormValid}
                //onSubmit={handleSubmit}
                //


              >
                {translatedContext.buttonConfirm}
              </button>
            </form>
          </>
          :
          <>
            <svg className="infoTooltip__pic infoTooltip__pic_fail"></svg>
            <h2 className="infoTooltip__title">{translatedContext.somethingWentWrongPleaseTryAgain}</h2> 
          </>

          }
        </div>
      </div>
    </aside>

  );
}
  
export default AddAvatarPopap;
/**
 *           <h2 className="infoTooltip__title">
              {noMistake? "You have successfully registered! Do you want to add information about yourself? (if not, it's ok, you may do it later)" 
              : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                        <div className="infoTooltip__btn-container">


          <Link to="/change-my-profile" className='infoTooltip__link'>
            <button className='infoTooltip__btn' onClick={onClose}>Yes</button>
          </Link>
          <Link to="/my-page" className='infoTooltip__link'>
            <button className='infoTooltip__btn' onClick={onClose}>No</button>
          </Link>
          </div>


                <button className="popup__close-button" type="button" onClick={onClose}></button>
 */