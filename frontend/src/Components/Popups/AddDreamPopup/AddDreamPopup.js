import React from 'react'
import './AddDreamPopup.css'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function AddDreamPopup({onClose, isOpen, onAddDream}) {

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
  const [buttonText, setButtonText] = React.useState('Upload picture of your dream');
  const addDreamRef = React.useRef(null);

  const currentUser = React.useContext(CurrentUserContext)
/*
  React.useEffect(
    checkImg(), []);

    function checkImg() {
      img === null? 
      setButtonText('Upload picture of your dream')
      :
      setButtonText('Uploaded')
    }*/

  function handleImgLinkChange(e) {
    setImg(e.target.files[0]);
  }

  function handleDreamLinkChange(e) {
    const validLink = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
    const inputLink = e.target.value;
    
    if (validLink.test(inputLink)) {
      setDreamLink(inputLink);
      setErrorDreamLink(false);
      setErrorDreamLinkMessage('');
    } else if (e.target.value === ""){
      setErrorDreamLink(false);
      setErrorDreamLinkMessage('');
      setDreamLink('');
    } else {
      setErrorDreamLink(true);
      setErrorDreamLinkMessage('Invalid link');
      setDreamLink('');
    }
  }
/*
  function handleSubmit(e) {
    e.preventDefault();
    onAddDream({
    name,
    img,
    price,
    dreamLink,
    });
  }*/

  function handleSubmit(e) {
    e.preventDefault();
    if (img) {
      const userId = currentUser._id;
      const formData = new FormData();
      
      formData.append('userId', userId);
      formData.append('name', name);
      formData.append('image', img);
      formData.append('price', price);
      formData.append('dreamLink', dreamLink);
  
      onAddDream(formData);


      setName('')
      setImg(null)
      setPrice('')
      setDreamLink('')
      /*setImg(null)
      //setIsFormValid(false)*/
      onClose()
    } else {
      console.log('Файл не выбран');
    }
  }

  const handleNameChange = (e) => {
    const validName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
      e.target.value
    )

    if (!e.target.value.length) {
      setErrorNameMessage('The name field must be filled in.')
      setErrorName(true);
      setIsValid(false)
     } else if (e.target.value.length < 2) {
      setErrorNameMessage('The name must be at least 2 characters long.')
      setErrorName(true);
      setIsValid(false)
     } else if (!validName) {
      setErrorNameMessage('The name should only contain Latin letters, Cyrillic letters, spaces, or hyphens.')
      setErrorName(true);
      setIsValid(false)
     } else if (validName) {
      setErrorNameMessage('')
      setErrorName(false);
     } else if (e.target.value.length > 30) {
      setErrorNameMessage('The name should not exceed 30 characters.')
      setErrorName(true);
      setIsValid(false)
     } else {
      setErrorNameMessage('')
      setErrorName(false);
     }
     setName(e.target.value[0].toUpperCase() + e.target.value.slice(1));
  }

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue);
  
    if (isNaN(numericValue) || inputValue.includes(' ')) {
      setErrorPriceMessage('Only numeric input is allowed.');
      setErrorPrice(true);
      setIsValid(false)
    } else if (inputValue.startsWith('0')) {
      setErrorPriceMessage('Price cannot start with 0.');
      setErrorPrice(true);
      setIsValid(false)
    } else if (inputValue.length > 15) {
      setErrorPriceMessage('Field cannot exceed 15 characters.');
      setErrorPrice(true);
      setIsValid(false)
    } else if (e.target.value.length < 1) {
      setErrorPriceMessage('The field must be filled in.');
      setErrorPrice(true);
      setIsValid(false)
    } else {
      setErrorPriceMessage('');
      setErrorPrice(false);
      setPrice(e.target.value.replaceAll(' ', '')) //чтобы создать расстояние между цифрами- 20 000
    }
  };

  function checkValid(img) {
  if (!img) {
    return setImg(null)
    //setLuckyMessage('Please upload only image files (jpg, jpeg, png, gif)')
  }

  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  const isValidExtension = allowedExtensions.test(img.name);

  if (!isValidExtension) {
    setImg(null)
    setErrorImg(true);
    setErrorImgMessage('Please upload only image files (jpg, jpeg, png, gif)');
    setButtonText('Upload picture of your dream')
    setIsValid(false);
  } else {
    setErrorImg(false);
    setErrorImgMessage('');
    setButtonText('Uploaded')
  }
}

React.useEffect(() => {
  checkValid(img)
}, [img]);

React.useEffect(() => {
  if (errorName || errorImg || errorPrice) {
    setIsValid(false)
  } else {
    setIsValid(true)
  }
}, [errorPrice, errorName, errorImg])

  return (
    
    <div className={`add-dream-popup ${isOpen && 'add-dream-popup__opened'}`}>

    <div className="add-dream-popup__container">
    <button 
      className="add-dream-popup__close-button" 
      type="button" 
      onClick={onClose}>
    </button>
    <h2 className="add-dream-popup__title">Add a new dream</h2>
      <form 
        className='add-dream-popup__form'
        onSubmit={handleSubmit}
        encType="multipart/form-data">
        <label className='add-dream-popup__inputname'>Name of Dream<span className='add-dream-popup__inputname-span'>*</span>  
          <input
            className='add-dream-popup__input'
            name='name'
            type='text'
            defaultValue=""
            value={name}
            //placeholder="Name of Dream"
            onChange={handleNameChange}
          ></input>
        </label>
        <span className='add-dream-popup__inputmistake'>{errorNameMessage}</span>
        <label className='add-dream-popup__inputname'>Link to dream
          <input
            className='add-dream-popup__input'
            name='dreamLink'
            type='url'
            value={dreamLink}
            //placeholder="Link to dream (not required)"
            onChange={handleDreamLinkChange}
          ></input>
          
        </label>
        <span className='add-dream-popup__inputmistake'>{errorDreamLinkMessage}</span>
        <label className='add-dream-popup__inputname'>Price of Dream (in dollars)<span className='add-dream-popup__inputname-span'>*</span>
          <input
            className='add-dream-popup__input'
            name='price'
            type='text'
            value={price}
            //placeholder="Price of Dream (in dollars)"
            onChange={handlePriceChange}
          ></input>
        </label>
        <span className='add-dream-popup__inputmistake'>{errorPriceMessage}</span>
        <label className='add-dream-popup__inputname'>Picture of dream<span className='add-dream-popup__inputname-span'>*</span>
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
          //value={img}
          onChange={handleImgLinkChange}
          hidden
        ></input>

        </label>
        <span className='add-dream-popup__inputmistake'>{errorImgMessage}</span>
        <button 
          className={`${isValid? 'add-dream-popup__btn_active': 'add-dream-popup__btn'}`}
          type='submit'
          disabled={!isValid}
          >
            Create
        </button>
      </form>  
    </div>
    </div>
  )
}

export default AddDreamPopup;