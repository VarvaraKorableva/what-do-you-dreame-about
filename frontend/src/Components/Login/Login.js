import React from 'react'
import './Login.css'

import { Link } from 'react-router-dom'

function Login({ onSubmit }) {

const isValid = true

const [values, setValues] = React.useState({});

function handleChange(e) {
  const { value, name } = e.target;
  setValues({ ...values, [name]: value });
}

function handleSubmit(e) {
  e.preventDefault();
  onSubmit( values.password, values.email );
}

  return (
    <section className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <Link className='login__logolink' to="/">
        <p className='login__logo'></p>
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <fieldset className='login__fieldset'>
          <label  className='login__inputname'>E-mail
            <input className='login__input'
                 pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
                 type="email"
                 name="email"
                 autoComplete="on"
                 defaultValue=""
                 onChange={handleChange}
            />
          </label>
          <span className='login__inputmistake'>
          </span>

          <label className='login__inputname'>Password
            <input className='login__input'
                 maxLength="8"
                 name="password"
                 type="password"
                 autoComplete="on"
                 defaultValue=""
                 onChange={handleChange}
            />
          </label>
          <span className='login__inputmistake'>
        
          </span>
        </fieldset>

        <button className={`'login__btn' ${isValid? 'login__btn_active': 'login__btn'}`} type='submit' disabled={!isValid}>Войти</button>
          <div className='login__wrapper'>
            <p className='login__subtitle'>Еще не зарегистрированы?
            <Link className='login__entrylink' to="/sign-up">Зарегистрироваться</Link>
            </p>
          </div>
      </form>
    </section>
  )
}

export default Login;