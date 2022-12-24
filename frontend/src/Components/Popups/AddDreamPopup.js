import React from 'react'


function AddDreamPopup() {

  return (
    <>
    <div>
      <h2>Add Dream</h2>
      <form className='addDreamPopup__form'>
        <input
          className='addDreamPopup__input'
          name='name'
          type='text'
          placeholder="Name of Dream"></input>
        <input
          className='addDreamPopup__input'
          name='link'
          type='url'
          placeholder="Link to dream"></input>
        <input
          className='addDreamPopup__input'
          name='price'
          type='text'
          placeholder="Price of Dream"></input>
        <input
          className='addDreamPopup__input'
          name='picture'
          type='url'
          placeholder="Link to picture"></input>
          <button className='addDreamPopup__btn'>
            Create
          </button>
      </form>  
    </div>
    </>
  )
}

export default AddDreamPopup;