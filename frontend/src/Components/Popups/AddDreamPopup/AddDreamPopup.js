import React from 'react'
import './AddDreamPopup.css'


function AddDreamPopup({onClose, isOpen, onAddDream}) {

  const [name, setName] = React.useState('')
  const [imgLink, setImgLink] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [dreamLink, setDreamLink] = React.useState('')
/*
  React.useEffect(() => {
    setName("")
    setImgLink("")
    setPrice("")
    setDreamLink("")
  }, [isOpen]);*/

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleImgLinkChange(e) {
    setImgLink(e.target.value)
  }

  function handlePriceChange(e) {
    setPrice(e.target.value)
  }

  function handleDreamLinkChange(e) {
    setDreamLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddDream({
    name,
    imgLink,
    price,
    dreamLink,
    });
  }

  return (
    
    <div className={`add-dream-popup ${isOpen && 'add-dream-popup__opened'}`}>

    <div className="add-dream-popup__container">
    <button 
      className="add-dream-popup__close-button" 
      type="button" 
      onClick={onClose}>
    </button>
    <h2 className="add-dream-popup__title">Add Dream</h2>
      <form 
        className='add-dream-popup__form'
        onSubmit={handleSubmit}>
        <input
          className='add-dream-popup__input'
          name='name'
          type='text'
          placeholder="Name of Dream"
          onChange={handleNameChange}
        ></input>

        <input
          className='add-dream-popup__input'
          name='dreamLink'
          type='url'
          placeholder="Link to dream"
          onChange={handleDreamLinkChange}
        ></input>

        <input
          className='add-dream-popup__input'
          name='price'
          type='text'
          placeholder="Price of Dream"
          onChange={handlePriceChange}
        ></input>

        <input
          className='add-dream-popup__input'
          name='imgLink'
          type='url'
          placeholder="Link to picture"
          onChange={handleImgLinkChange}
        ></input>

        <button 
          className='add-dream-popup__btn'
          type='submit'
          >
            Create
        </button>
      </form>  
    </div>
    </div>
  )
}

export default AddDreamPopup;