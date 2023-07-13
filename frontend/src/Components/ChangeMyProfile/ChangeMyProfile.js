import React from 'react'
import './ChangeMyProfile.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/ChangeMyProfile'

function ChangeMyProfile({onChangeSubmit}){

const currentUser = React.useContext(CurrentUserContext)

//const initialName = currentUser.name;
const initialBirthday = (currentUser.birthday === '' || currentUser.birthday === null) ? '': currentUser.birthday;

const [name, setName] = React.useState(currentUser.name)
const [birthday, setBirthday] = React.useState(initialBirthday)
//const [password, setPassword] = React.useState('')

const [errorNameMessage, setErrorNameMessage] = React.useState('')
const [errorBirthdayMessage, setErrorBirthdayMessage] = React.useState('')
//const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')

const [errorName, setErrorName] = React.useState(true)
const [errorBirthday, setErrorBirthday] = React.useState(true)
//const [errorPassword, setErrorPassword] = React.useState(true)
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

const handleNameChange = (e) => {
  const validName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
    e.target.value
  )
  if (!(e.target.value.length)) {
    setName(currentUser.name)
   } else if (e.target.value.length < 2) {
    setErrorNameMessage(translatedContext.errors.errorNameMessage.theUsernameMustBeAtLeastCharactersLong)
    setErrorName(true);
    setName(currentUser.name)
    deleteNameErrorMessage()
    setErrorName(true);
   } else if (!validName) {
    setErrorNameMessage(translatedContext.errors.errorNameMessage.theUsernameShouldOnlyContainLatinLettersCyrillicLetters)
    setErrorName(true);
    setName(currentUser.name)
    deleteNameErrorMessage()
   } else if (validName) {
    setErrorNameMessage('')
    setErrorName(false);
    setName(e.target.value)
   } else if (e.target.value.length > 30) {
    setErrorNameMessage(translatedContext.errors.errorNameMessage.theUsernameMustBeNoMoreThanCharacters)
    setErrorName(true);
    deleteNameErrorMessage()
   } else if (!(e.target.value)) {
    setName(currentUser.name)
   } else {
    setErrorNameMessage('')
    setErrorName(false);
   }
   //setName(e.target.value)
   setName((e.target.value[0].toUpperCase() + e.target.value.slice(1)))
}
/*
const handlePasswordChange = (e) => {
if (e.target.value.length < 5) {
    setErrorPasswordMessage('Password must contain at least 5 characters.');
    setErrorPassword(true);
    deletePasswordErrorMessage()
  } else if (e.target.value.length > 8) {
    setErrorPasswordMessage('Password must not exceed 8 characters.');
    setErrorPassword(true);
    deletePasswordErrorMessage()
  } else {
    setErrorPasswordMessage('');
    setErrorPassword(false);
  }
  setPassword(e.target.value);
};*/

function handleBirthdayOfEventChange(e) {
  //setBirthday(e.target.value)
  if(!(e.target.value)) {
    setErrorBirthday(true)
    setErrorBirthdayMessage(translatedContext.errors.errorBirthdayMessage.theDateMustBeFilledIn)
    deleteBirthdayErrorMessage()
    setBirthday(initialBirthday)
  } else {
    setErrorBirthday(false)
    setErrorBirthdayMessage('')
    setBirthday(e.target.value)
  }
}

React.useEffect(() => {
  if (errorName === false || errorBirthday === false) {
    setIsValid(true)
  } else {
    setIsValid(false)
  }
}, [errorName, errorBirthday])

  function handleSubmit(e) {
    e.preventDefault();
    onChangeSubmit({
      name, birthday
    });
    setBirthday(initialBirthday)
    setName(currentUser.name)

    handleFormReset()
  }
/*
  function deletePasswordErrorMessage(){
    setTimeout(function(){
      setErrorPasswordMessage('');
    }, 3000)
  }*/

  function deleteBirthdayErrorMessage(){
    setTimeout(function(){ 
      setErrorBirthdayMessage('');
    }, 3000)
  }

  function deleteNameErrorMessage(){
    setTimeout(function(){
      setErrorNameMessage('');
    }, 3000)
  }
  // Обработка удаления текста с помощью Backspace
  const handleKeyUp = (e) => {
    if (e.keyCode === 8 && !name) {
      setName(currentUser.name)
      setErrorName(true);
    }
  };

  const handleFormReset = () => {
    formRef.current.reset();
  };

  return (
    <section className='change-information'>
      <h3 className='change-information__greetings'>{translatedContext.greeting} {currentUser.name}!</h3>
      <form 
        ref={formRef}
        className='change-information__form'
        onSubmit={handleSubmit}>
        <fieldset className='change-information__fieldset'> 

          <label className='change-information__inputname'>{translatedContext.name}
            <input className='change-information__input'
              name="name"
              type="text"
              autoComplete="on"
             //defaultValue=""
              placeholder={currentUser.name}
              onChange={handleNameChange}
              onKeyUp={handleKeyUp}
            />
            </label>
            <span className='change-information__inputmistake'>{errorNameMessage}</span>
{/*}
            <label className='change-information__inputname'>{translatedContext.birthday}
            <input className='change-information__input'
              name="birthday"
              type="date"
              autoComplete="on"
              lang="en"
              placeholder={currentUser.birthday}
              onChange={handleBirthdayOfEventChange}
            />
            </label>
            <span className='change-information__inputmistake'>{errorBirthdayMessage}</span>   
  */}
        </fieldset>
        <button
          type="submit"
          className={`'change-information__btn' ${isValid? 'change-information__btn_active': 'change-information__btn'}`}
          disabled={!isValid}>
            {translatedContext.buttonChangeInformation}
        </button>
      </form>
    </section>
  );
}


export default ChangeMyProfile;

/*
<label className='change-information__inputname'>Password
            <input className='change-information__input'
              name="password"
              type="password"
              maxLength="8"
              autoComplete="on"
              defaultValue=""
              onChange={handlePasswordChange}
            />
            </label>
            <span className='change-information__inputmistake'>{errorPasswordMessage}</span>

*/