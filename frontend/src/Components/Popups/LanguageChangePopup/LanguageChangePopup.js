import React from 'react'
import './LanguageChangePopup.css'

import { LanguageContext } from '../../../contexts/TranslationContext';

function LanguageChangePopup({onClose, isOpen}) {

    const { language, changeLanguage } = React.useContext(LanguageContext)

    const handleLanguageChange = (newLanguage) => {
      changeLanguage(newLanguage);
    };

  return (
    <div className={`languageChangePopup__popup ${isOpen && 'languageChangePopup__popup_opened'}`}>
      <div className='languageChangePopup__container'>
        <button className='languageChangePopup__close-btn' onClick={onClose}></button>
        <div className='languageChangePopup__wrapper'>
          <button className='languageChangePopup__lang' onClick={() => handleLanguageChange('en')}>English</button>
          <button className='languageChangePopup__lang' onClick={() => handleLanguageChange('rus')}>Русский</button>
          <button className='languageChangePopup__lang' onClick={() => handleLanguageChange('hebrew')}>עברית</button>
        </div> 
      </div>
    </div>
  );
}
  
export default LanguageChangePopup;