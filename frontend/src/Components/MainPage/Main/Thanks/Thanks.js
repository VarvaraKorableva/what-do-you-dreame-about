import './Thanks.css'
import React from "react"
import { LanguageContext } from '../../../../contexts/TranslationContext'
import choose from '../../../../const/MainPageLanguageData'
import imagePersonWithHurt from '../../../../images/personandhurt.png'
//import imageSalvadorGifts from '../../../../images/salvadorgifts.png'
//<img className="promo__pic" src={imageSalvadorGifts}></img>

function Thanks() {

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
      <div className="">
        <p>Thanks</p>
      </div>
  );
}

export default Thanks;