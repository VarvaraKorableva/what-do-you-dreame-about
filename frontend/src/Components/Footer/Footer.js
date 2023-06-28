import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/TranslationContext';
import './Footer.css'

function Footer({ }) {

  const { language, changeLanguage } = React.useContext(LanguageContext)

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    // Здесь вы можете выполнить дополнительные действия, связанные со сменой языка
  };

return (
  <div className='footer__container'>
    <div>
      <p>Текущий язык: {language}</p>
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('rus')}>Русский</button>
      <button onClick={() => handleLanguageChange('hebrew')}>עברית</button>
    </div>

    <a href='https://www.linkedin.com/in/varvara-korableva/' target='blank' className='footer__text'>created by Varvara Korableva</a>
  </div>  
)
}

export default Footer;