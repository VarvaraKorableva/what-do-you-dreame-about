import React from 'react'
import './Main.css'
import backgroundImg from '../../../images/mainpicflowers.png'

import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/MainPageLanguageData'

function Main({ isLoggin }) {
  const currentUser = React.useContext(CurrentUserContext)
  const userId = currentUser._id

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
    <div className="main__container">
        <img src={backgroundImg} className="main__pic"></img>

        <div className="main__title-container">
          <h1 className="main__title">What-do-you-dreame-about ?</h1>
          <h2 className="main__subtitle">{translatedContext.subtitle}</h2>
            {isLoggin?
              <Link className="main__subtitle-link" to={`/users/${userId}`}>
                <p className="main__subtitle-btn">{translatedContext.buttonIfLoggin}</p>
              </Link>
            :
              <Link className="main__subtitle-link"to={`/signup`}>
                <p className="main__subtitle-btn">{translatedContext.button}</p>
              </Link>
            }
        </div>

    </div>
  );
}

export default Main;