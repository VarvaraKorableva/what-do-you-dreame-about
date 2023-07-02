import './Promo.css'
import React from "react"
import { LanguageContext } from '../../../../contexts/TranslationContext'
import choose from '../../../../const/MainPageLanguageData'

function Promo() {

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
        <h2>{translatedContext.promoSubtitle}</h2>
        <div className="promo__container">
          <div className="promo__text-container">
            <h3 className="promo__text">{translatedContext.promoTextForYou}</h3>
          </div>
        </div>

        <div className="promo__container-right">
          <div className="promo__text-container">
            <h3 className="promo__text">{translatedContext.promoTextForFriend}</h3>
          </div>
        </div>

            
      </div>
  );
}

export default Promo;