import './Conclusion.css'

import React from "react"
import { LanguageContext } from '../../../../contexts/TranslationContext'
import choose from '../../../../const/ConclusionLanguage'


function Conclusion() {

  const { language } = React.useContext(LanguageContext)

  const { en, rus, hebrew } = choose;

  let translatedContext = '';
  if (language === 'en') {
    translatedContext = en;
  } else if (language === 'rus') {
    translatedContext = rus;
  } else if (language === 'hebrew') {
    translatedContext = hebrew;
  }
  

  return (
      <div className='conclusion__title'>
        <div className='conclusion__line'></div>
        <h3>{translatedContext.title}</h3>
        <div className='conclusion__heart'></div>
      </div>
  );
}

export default Conclusion;
