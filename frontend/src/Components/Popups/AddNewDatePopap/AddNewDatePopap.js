import React from 'react';
import './AddNewDatePopap.css'


function AddNewDatePopap({ onClose, isOpen, onAddDate }) {

    const [name, setName] = React.useState('')
    const [date, setDate] = React.useState('')
    const [description, setDescription] = React.useState('')

    const [errorNameMessage, setErrorNameMessage] = React.useState('')
    const [errorDateMessage, setErrorDateMessage] = React.useState('')
    const [errorDescriptionMessage, setErrorDescriptionMessage] = React.useState('')

    const [errorName, setErrorName] = React.useState(true)
    const [errorDate, setErrorDate] = React.useState(true)
    const [errorDescription, setErrorDescription] = React.useState(false)

    const [isValid, setIsValid] = React.useState(false);
  

    const handleEventChange = (e) => {
      if (!e.target.value.length) {
        setErrorNameMessage('The name of event field must be filled in.')
        setErrorName(true);
       } else if (e.target.value.length < 2) {
        setErrorNameMessage('The name of event must be at least 2 characters long.')
        setErrorName(true);
       } else if (e.target.value.length > 20) {
        setErrorNameMessage('The name of event must be no more than 20 characters.')
        setErrorName(true);
       } else {
        setErrorNameMessage('')
        setErrorName(false);
       }
       setName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value)
        if(e.target.value.length > 25) {
          setErrorDescription(true)
          setErrorDescriptionMessage('The date must not exceed 25 characters.')
        } else {
          setErrorDescription(false)
          setErrorDescriptionMessage('')
        }
    }
  
    function handleDateOfEventChange(e) {
      setDate(e.target.value)
        if(!(e.target.value)) {
          setErrorDate(true)
          setErrorDateMessage('The date must be filled in.')
        } else {
          setErrorDate(false)
          setErrorDateMessage('')
        }
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      onAddDate({
      name,
      date,
      description,
      });
    }
  
    React.useEffect(() => {
      if (errorName || errorDate || errorDescription) {
        setIsValid(false)
      } else {
        setIsValid(true)
      }
    }, [errorName, errorDate, errorDescription])
/*
    React.useEffect(() => {
      setName('')
      setDate('')
      setDescription('')
    }, [])*/

    return (
      
      <div className={`add-new-date-popup ${isOpen && 'add-new-date-popup__opened'}`}>
  
      <div className="add-new-date-popup__container">
      <button 
        className="add-new-date-popup__close-button" 
        type="button" 
        onClick={onClose}>
      </button>
      <h2 className="add-new-date-popup__title">Add a new date</h2>
        <form 
          className='add-new-date-popup__form'
          onSubmit={handleSubmit}>
          <input
            className='add-new-date-popup__input'
            name='name'
            type='text'
            
            placeholder="Name of event"
            onChange={handleEventChange}
          ></input>

          <span className='add-new-date-popup__inputmistake'>{errorNameMessage}</span>
  
          <input
            className='add-new-date-popup__input'
            name='date'
            type='date'
            lang="en"
            
            placeholder="Date of event"
            onChange={handleDateOfEventChange}
          ></input>

          <span className='add-new-date-popup__inputmistake'>{errorDateMessage}</span>
  
          <input
            className='add-new-date-popup__input'
            name='description'
            type='text'
            
            placeholder="Describe the event a little bit"
            onChange={handleDescriptionChange}
          ></input>
          <span className='add-new-date-popup__inputmistake'>{errorDescriptionMessage}</span>
          <button 
            type='submit'
            className={`'add-new-event-popup__btn' ${isValid? 'add-new-event-popup__btn_active': 'add-new-event-popup__btn'}`}
            disabled={!isValid}
          >
            Create
          </button>
        </form>  
      </div>
      </div>
    )
  }
  
export default AddNewDatePopap;