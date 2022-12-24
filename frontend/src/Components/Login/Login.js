import React from 'react'
import './Login.css'

import { Link } from 'react-router-dom'

function Login() {

const isValid = true

  return (
    <section className='login'>
      <form className='login__form'>
        <Link className='login__logolink' to="/">
        <p className='login__logo'></p>
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <fieldset className='login__fieldset'>
          <label  className='login__inputname'>E-mail
            <input className='login__input'
                 pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
                 type="email"
                 autoComplete="on"
                 defaultValue=""
            />
          </label>
          <span className='login__inputmistake'>
          </span>

          <label className='login__inputname'>Пароль
            <input className='login__input'
                 maxLength="8"
                 name="password"
                 type="password"
                 autoComplete="on"
                 defaultValue=""
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