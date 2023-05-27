import React from 'react';
import './AddNewDatePopap.css'


function AddNewDatePopap({ onClose, isOpen, onAddDate }) {

    const [name, setName] = React.useState('')
    const [date, setDate] = React.useState('')
    const [description, setDescription] = React.useState('')
  
    function handleEventChange(e) {
      setName(e.target.value)
    }
  
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }
  
    function handleDateOfEventChange(e) {
        setDate(e.target.value)
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      onAddDate({
      name,
      date,
      description,
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
      <h2 className="add-dream-popup__title">Add a new date</h2>
        <form 
          className='add-dream-popup__form'
          onSubmit={handleSubmit}>
          <input
            className='add-dream-popup__input'
            name='name'
            type='text'
            placeholder="Name of event"
            onChange={handleEventChange}
          ></input>
  
          <input
            className='add-dream-popup__input'
            name='date'
            type='date'
            placeholder="Date of event"
            onChange={handleDateOfEventChange}
          ></input>
  
          <input
            className='add-dream-popup__input'
            name='description'
            type='text'
            placeholder="Describe the event a little bit"
            onChange={handleDescriptionChange}
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
  
export default AddNewDatePopap;