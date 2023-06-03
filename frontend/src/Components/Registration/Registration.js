import React from 'react'
import './Registration.css'
import { Link } from 'react-router-dom'

function Registration({onRegister}){

const [name, setName] = React.useState('')
const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')

const [errorNameMessage, setErrorNameMessage] = React.useState('')
const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')

const [errorName, setErrorName] = React.useState(true)
const [errorEmail, setErrorEmail] = React.useState(true)
const [errorPassword, setErrorPassword] = React.useState(true)

const [isValid, setIsValid] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      password,
      email,
      name
    });
  }

  const handleNameChange = (e) => {
    const validName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
      e.target.value
    )

    if (!e.target.value.length) {
      setErrorNameMessage('The username field must be filled in.')
      setErrorName(true);
     } else if (e.target.value.length < 2) {
      setErrorNameMessage('The username must be at least 2 characters long.')
      setErrorName(true);
     } else if (!validName) {
      setErrorNameMessage('The username should only contain Latin letters, Cyrillic letters, spaces, or hyphens.')
      setErrorName(true);
     } else if (validName) {
      setErrorNameMessage('')
      setErrorName(false);
     } else if (e.target.value.length > 30) {
      setErrorNameMessage('Имя пользователя должно быть не более 30 символов.')
      setErrorName(true);
     } else {
      setErrorNameMessage('')
      setErrorName(false);
     }
     setName(e.target.value)
  }

  const handlePasswordChange = (e) => {
    if (!e.target.value.length) {
      setErrorPasswordMessage('Password must be filled in.');
      setErrorPassword(true);
    } else if (e.target.value.length < 5) {
      setErrorPasswordMessage('Password must contain at least 5 characters.');
      setErrorPassword(true);
    } else if (e.target.value.length > 8) {
      setErrorPasswordMessage('Password must not exceed 8 characters.');
      setErrorPassword(true);
    } else {
      setErrorPasswordMessage('');
      setErrorPassword(false);
    }
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e.target.value
    )

    if (!e.target.value.length) {
      setErrorEmailMessage('Email must be filled in.')
      setErrorEmail(true)
    } else if (!validEmail) {
      setErrorEmailMessage('Invalid email format.')
      setErrorEmail(true)
    } else {
      setErrorEmailMessage('')
      setErrorEmail(false)
    }
    setEmail(e.target.value)
  }

  React.useEffect(() => {
    if (errorName || errorEmail || errorPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorEmail, errorName, errorPassword])

  return (
    <section className='register'>
      <form 
        className='register__form'
        onSubmit={handleSubmit}>
        <h2 className='register__title'>Welcome!</h2>
        <fieldset className='register__fieldset'>
          <label className='register__inputname'>Name<span className='register__inputname-span'>*</span>
            <input className='register__input'
              name="name"
              type="text"
              autoComplete="on"
              defaultValue=""
              onChange={handleNameChange}
            />
            </label>
            <span className='register__inputmistake'>{errorNameMessage}
            </span>  
    
          <label className='register__inputname'>E-mail<span className='register__inputname-span'>*</span>
            <input className='register__input'
              name="email"
              type="email"
              autoComplete="on"
              defaultValue=""
              onChange={handleEmailChange}
            />  
          </label>
          <span className='register__inputmistake'>{errorEmailMessage}
          </span>

          <label className='register__inputname'>Password<span className='register__inputname-span'>*</span>
            <input className='register__input'
              name="password"
              type="password"
              maxLength="8"
              minLength="5"
              autoComplete="on"
              defaultValue=""
              onChange={handlePasswordChange}
            />
          </label>
          <span className='register__inputmistake'>{errorPasswordMessage}
          </span>


      </fieldset>
        <button
          type="submit"
          className={`'register__btn' ${isValid? 'register__btn_active': 'register__btn'}`}
          disabled={!isValid}>
            SignUp
        </button>
        <div className='register__wrapper'>
          <p className='register__subtitle'>Already signUp?
          <Link className='register__entrylink' to="/signin"> SignIn</Link></p>
        </div>
    </form>
    </section>
  );
}

export default Registration;