import React from 'react'
import './ChangeMyProfile.css'
//import { Link } from 'react-router-dom';

function ChangeMyProfile({onChangeInf}){
const isValid = true

const [values, setValues] = React.useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
     onChangeInf({
      birthday: values.birthday,
      about: values.about,
      presentDates: values.presentDates,
      avatar: values.avatar,
      password: values.password,
      name: values.name,
    });
  }

  return (
    <section className='change-information'>
      <form 
        className='change-information__form'
        onSubmit={handleSubmit}>
        <fieldset className='change-information__fieldset'>

          <label className='change-information__inputname'>Birthday<span className='change-information__inputname-span'>*</span>
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
              onChange={handleChange}
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

          <label className='change-information__inputname'>Name<span className='change-information__inputname-span'>*</span>
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

          <label className='change-information__inputname'>Пароль<span className='change-information__inputname-span'>*</span>
            <input className='change-information__input'
              name="password"
              type="password"
              maxLength="8"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
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