import React from 'react'
import './ChangeMyProfile.css'
//import { Link } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
//onChangeInf, 
function ChangeMyProfile({onChangeSubmit}){

const currentUser = React.useContext(CurrentUserContext)

const isValid = true

const [values, setValues] = React.useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChangeSubmit({
      birthday: values.birthday,
      about: values.about,
      //presentDates: values.presentDates,
      avatar: values.avatar,
      //password: values.password,
      name: values.name,
    });
  }

  return (
    <section className='change-information'>
      <h3 className='change-information__greetings'>Hello, {currentUser.name}!</h3>
      <form 
        className='change-information__form'
        onSubmit={handleSubmit}>
        <fieldset className='change-information__fieldset'>

          <label className='change-information__inputname'>Birthday
            <input className='change-information__input'
              name="birthday"
              type="text"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
            />
          </label>
          <span className='change-information__inputmistake'>
          </span>  

          <label className='change-information__inputname'>About
            <input className='change-information__input'
              name="about"
              type="text"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
            />
          </label>
          <span className='change-information__inputmistake'>
          </span>  

          <label className='change-information__inputname'>Present dates
            <input className='change-information__input'
              name="presentDates"
              type="text"
              autoComplete="on"
              defaultValue=""
              //onChange={handleChange}
            />
          </label>
          <span className='change-information__inputmistake'>
          </span>

          <label className='change-information__inputname'>Avatar
            <input className='change-information__input'
              name="avatar"
              type="url"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
            />
          </label>
          <span className='change-information__inputmistake'>
          </span>

          <label className='change-information__inputname'>Name
            <input className='change-information__input'
              name="name"
              type="text"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
            />
            </label>
            <span className='change-information__inputmistake'>
            </span>

          <label className='change-information__inputname'>Password
            <input className='change-information__input'
              name="password"
              type="password"
              maxLength="8"
              autoComplete="on"
              defaultValue=""
              
              //onChange={handleChange}
            />
          </label>
          <span className='change-information__inputmistake'>
          </span>

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