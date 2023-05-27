import React from 'react'
import './Registration.css'
import { Link } from 'react-router-dom'

function Registration({onRegister}){
const isValid = true

const [values, setValues] = React.useState({});
//const [avatarImg, setAvatarImg] = React.useState(null); 
/*
function handleAvatarChange(e) {
  setAvatarImg(e.target.files[0]);
}*/
  
  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      password: values.password,
      email: values.email,
      name: values.name,
    });
  }

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
              onChange={handleChange}
            />
            </label>
            <span className='register__inputmistake'>
            </span>  
    
          <label className='register__inputname'>E-mail<span className='register__inputname-span'>*</span>
            <input className='register__input'
              name="email"
              type="email"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
            />  
          </label>
          <span className='register__inputmistake'>
          </span>

          <label className='register__inputname'>Password<span className='register__inputname-span'>*</span>
            <input className='register__input'
              name="password"
              type="password"
              maxLength="8"
              autoComplete="on"
              defaultValue=""
              onChange={handleChange}
            />
          </label>
          <span className='register__inputmistake'>
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


/*
<label className='register__inputname'>Avatar<span className='register__inputname-span'></span>
<input className='register__input'
  name="avatar"
  type="file"
  onChange={handleAvatarChange}
/>
</label>

<span className='register__inputmistake'>
</span>*/