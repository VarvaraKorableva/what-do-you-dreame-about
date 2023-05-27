import React from 'react'
import './InfoTooltip.css'
//import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function AddAvatarPopap({onClose, isOpen, handleUpdateAvatar}) {

  //const isOpen =true

 //{ isOpen, onClose, noMistake }
 //<svg className={`infoTooltip__pic ${noMistake? "infoTooltip__pic_success" : "infoTooltip__pic_fail"}`}></svg>
 //const isOpen = true
 const noMistake = true
 const [img, setImg] = React.useState(null);
 const addAvatarRef = React.useRef(null);
 const [buttonText, setButtonText] = React.useState('Upload avatar');

 const currentUser = React.useContext(CurrentUserContext)
 
 //const successfullLoad = img

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
 
     handleUpdateAvatar(formData)
 
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
  
  return (
    
    <aside className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
      <button className="popup__close-button" type="button" onClick={onClose}></button>
        <div className="popup__form">

          {noMistake?
          <>
          <h2 className="infoTooltip__title"> You have successfully registered! </h2>
          <h3 className="infoTooltip__title"> Let's add avatar </h3>
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



              <button 
                className='popap-add-avatar__btn'
                type='submit'
                //onSubmit={handleSubmit}
              >
                Add Avatar
              </button>
            </form>
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
  
export default AddAvatarPopap;
/**
 * 
 * 
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
 */