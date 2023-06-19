import React from 'react'
import './Login.css'

import { Link } from 'react-router-dom'

function Login({ isLoginError, errorLoginMessage, onSubmit }) {

const [isValid, setIsValid] = React.useState(false)

const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')

const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')

const [errorEmail, setErrorEmail] = React.useState(true)
const [errorPassword, setErrorPassword] = React.useState(true)

function handleSubmit(e) {
  e.preventDefault();
  onSubmit({
    password,
    email
  });
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
  if (errorEmail || errorPassword) {
    setIsValid(false)
  } else {
    setIsValid(true)
  }
}, [errorEmail, errorPassword])

  return (
    <section className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <h2 className='login__title'>Glad to see you!</h2>
        <fieldset className='login__fieldset'>
          <label  className='login__inputname'>E-mail
            <input className='login__input'
                 pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
                 type="email"
                 name="email"
                 autoComplete="on"
                 defaultValue=""
                 onChange={handleEmailChange}
            />
          </label>
          <span className='login__inputmistake'>{errorEmailMessage}</span>

          <label className='login__inputname'>Password
            <input className='login__input'
                 maxLength="8"
                 name="password"
                 type="password"
                 autoComplete="on"
                 defaultValue=""
                 onChange={handlePasswordChange}
            />
          </label>
          <span className='login__inputmistake'>{errorPasswordMessage}</span>
          <span className={`${isLoginError?'login__inputmistake' : ''}`}>{errorLoginMessage}</span>
        </fieldset>

        <button className={`'login__btn' ${isValid? 'login__btn_active': 'login__btn'}`} type='submit' disabled={!isValid}>SignIn</button>
          <div className='login__wrapper'>
            <p className='login__subtitle'>Not registered yet?
            <Link className='login__entrylink' to="/signup"> SignUp</Link>
            </p>
          </div>
      </form>
    </section>
  )
}

export default Login;

/*
/^([\w.%+-]+)@([\w-]+.)+([\w]{2,})$/
*/