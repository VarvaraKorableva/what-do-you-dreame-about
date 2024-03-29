import React from 'react';
import './AddNewDatePopap.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/popaps/AddNewDatePopap'


function AddNewDatePopap({ onClose, isOpen, onAddDate }) {

    const [name, setName] = React.useState('')
    const [date, setDate] = React.useState('')

    const [errorNameMessage, setErrorNameMessage] = React.useState('')
    const [errorDateMessage, setErrorDateMessage] = React.useState('')

    const [errorName, setErrorName] = React.useState(true)
    const [errorDate, setErrorDate] = React.useState(true)
    const [isValid, setIsValid] = React.useState(false);

    const formRef = React.useRef(null);

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
    React.useEffect(() => {
      if (errorName || errorDate || (!name || !date)) { 
        setIsValid(false)
      } else {
        setIsValid(true)
      }
    }, [errorName, errorDate, name, date]) 

    React.useEffect(() => {
      if (!name || !date) { 
        setIsValid(false)
    }}, [name,date])

    const handleEventChange = (e) => {
      if (!e.target.value.length) {
        setErrorNameMessage(translatedContext.errors.errorNameMessage.theNameOfEventFieldMustBeFilledIn)
        setErrorName(true);
       } else if (e.target.value.length < 2) {
        setErrorNameMessage(translatedContext.errors.errorNameMessage.theNameOfEventMusBeAtLeastCharactersLong)
        setErrorName(true);
       } else if (e.target.value.length > 20) {
        setErrorNameMessage(translatedContext.errors.errorNameMessage.theNameOfEventMustBeNoMoreThanCharacters)
        setErrorName(true);
       } else {
        setErrorNameMessage('')
        setErrorName(false);
       }
       setName(e.target.value)
    }
  
    function handleDateOfEventChange(e) {
      setDate(e.target.value)
        if(!(e.target.value)) {
          setErrorDate(true)
          setErrorDateMessage(translatedContext.errors.errorDateMessage.theDateMustBeFilledIn)
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
      });
      handleFormReset()
      setName('')
      setDate('')
    }

    const handleFormReset = () => {
      formRef.current.reset();
    };

    return (
      
      <div className={`add-new-date-popup ${isOpen && 'add-new-date-popup__opened'}`}>
  
      <div className="add-new-date-popup__container">
      <button 
        className="add-new-date-popup__close-button" 
        type="button" 
        onClick={onClose}>
      </button>
      <h2 className="add-new-date-popup__title">{translatedContext.addANewDatePopapName}</h2>
        <form 
          ref={formRef}
          className='add-new-date-popup__form'
          onSubmit={handleSubmit}>
          <input
            className='add-new-date-popup__input'
            name='name'
            type='text'
            
            placeholder={translatedContext.placeholderNameOfEvent}
            onChange={handleEventChange}
            onInput={handleEventChange}
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
          <button 
            type='submit'
            className={`'add-new-event-popup__btn' ${isValid? 'add-new-event-popup__btn_active': 'add-new-event-popup__btn'}`}
            disabled={!isValid}
          >
            {translatedContext.createButton}
          </button>
        </form>  
      </div>
      </div>
    )
  }
  
export default AddNewDatePopap;