import React from 'react'
import './PopapChangeAvatar.css'


function PopapChangeAvatar({onClose, isOpen, handleUpdateAvatarSubmit}) {

  const [img, setImg] = React.useState()
  const editAvatarRef = React.useRef('')

  function handleImgLinkChange(e) {
    setImg(e.target.files[0]);
  }
/*

    const formData = new FormData();
    formData.append('image', selectedFile);
*/
  function handleSubmit(e) {
    e.preventDefault();
    /*const formData = new FormData();
    formData.append('image', img);*/
    handleUpdateAvatarSubmit(
    editAvatarRef.current.value
    );
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
        >
        <input
          ref={editAvatarRef}
          className='popap-change-avatar__input'
          name='img'
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