import React from 'react'
import './ChangeMyProfile.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function ChangeMyProfile({onChangeSubmit}){

const currentUser = React.useContext(CurrentUserContext)

const [values, setValues] = React.useState({});

const isValid = true

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChangeSubmit({
      name: values.name,
      birthday: values.birthday,
      //about: values.about,
      password: values.password,
    });
  }

  return (
    <section className='change-information'>
      <h3 className='change-information__greetings'>Hello, {currentUser.name}!</h3>
      <form 
        className='change-information__form'
        onSubmit={handleSubmit}>
        <fieldset className='change-information__fieldset'> 

          <label className='change-information__inputname'>Name
            <input className='change-information__input'
              name="name"
              type="text"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
            />
            </label>
            <span className='change-information__inputmistake'></span>

            <label className='register__inputname'>Birthday
            <input className='register__input'
              name="birthday"
              type="date"
              autoComplete="on"
              defaultValue=''
              onChange={handleChange}
            />
            </label>
            <span className='register__inputmistake'></span>   
  

            <label className='change-information__inputname'>Password
            <input className='change-information__input'
              name="password"
              type="password"
              maxLength="8"
              autoComplete="on"
              defaultValue=""
            />
            </label>
            <span className='change-information__inputmistake'></span>

        </fieldset>
        <button
          type="submit"
          className={`'change-information__btn' ${isValid? 'change-information__btn_active': 'change-information__btn'}`}
          disabled={!isValid}>
            Change information
        </button>
      </form>
    </section>
  );
}


export default ChangeMyProfile;

/*
            <label className='change-information__inputname'>About
            <input className='change-information__input'
              name="about"
              type="text"
              autoComplete="on"
              defaultValue={currentUser.about}
              onChange={handleChange}
            />
            </label>
            <span className='change-information__inputmistake'></span>
*/