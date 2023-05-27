import React from 'react'
import './PopapChangeAvatar.css'

import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function PopapChangeAvatar({onClose, isOpen, handleUpdateAvatarSubmit}) {

const currentUser = React.useContext(CurrentUserContext)  

const [img, setImg] = React.useState(null);
const editAvatarRef = React.useRef(null);

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

  } else {
    console.log('Файл не выбран');
  }
}

  return (
    
    <div className={`popap-change-avatar ${isOpen ? 'popap-change-avatar__opened' : ""}`}>

      <div className="popap-change-avatar__container">
      <button 
        onClick={onClose}
        className="popap-change-avatar__close-button" 
        type="button">
      </button>
      <h2 className="popap-change-avatar__title">Change Avatar</h2>
      <form 
        className='popap-change-avatar__form'
        onSubmit={handleSubmit}
        method="post" 
        encType="multipart/form-data"
        >
 
        <input
          ref={editAvatarRef}
          className='popap-change-avatar__input'
          name='image'
          type="file"
          placeholder="Add your picture"
          onChange={handleImgLinkChange}
          
        >
        </input>

        <button 
          className='popap-change-avatar__btn'
          type='submit'
          >
          Change Avatar
        </button>
      </form>  
      </div>
    </div>
  )
}

export default PopapChangeAvatar;

/*

        <button 
          onClick={() => editAvatarRef.current.click()}
          className='popap-change-avatar__input'>
          Загрузить картинку
        </button> 

*/