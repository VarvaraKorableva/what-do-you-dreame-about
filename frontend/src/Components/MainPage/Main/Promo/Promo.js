import './Promo.css'
import React from "react"
import { LanguageContext } from '../../../../contexts/TranslationContext'
import choose from '../../../../const/PromoLanguage'
import imagePersonWithHurt from '../../../../images/personandhurt.png'
//import PeoniesSurPic from '../../../../images/peoniessurpic.png'
//import PicGift from '../../../../images/girlwithagift.png'
//import nicePicClouds from '../../../../images/nicepicclouds.png'
//import manPic from '../../../../images/manspic.png'
import happyGirlWithGift from '../../../../images/happygirlwithgift.png'
//import PionesPic from '../../../../images/peonies.png'
import blondaGirlWithGiftPic from '../../../../images/blondagirlwithgift.png'
import niceGirlWithGift from '../../../../images/nicegirlwithgift.png'

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
        <h2 className="promo__title">{translatedContext.promoSubtitle}</h2>

        <div className="promo__container">
      
          <div className="promo__text-container">
            <h3 className="promo__text">{translatedContext.promoTextForYou}</h3>
            
          </div>

          <div className="promo__text-container">
            <h3 className="promo__text">{translatedContext.promoTextForYouQuestion}</h3>
            
          </div>
          
          <div className="promo__text-container">
            <h3 className="promo__text">{translatedContext.promoTextForYouDescription}</h3>
          </div>
          
        </div>

       {/*<div className="promo__container-right">
          <img className="promo__pic" src={imagePersonWithHurt}></img>
          <div className="promo__friend-text-container">
            <h3 className="promo__friend-text">Как часто мы не значем, что подарить друзьям, чем их порадовать? Теперь, ты можешь зайти на страничку к своим друзьям и увидеть, что именно они хотят получить в подарок.</h3>
            <h3 className="promo__friend-text">Вам стоит только зайти на страничку своего любимого и вы увидите, что сделает его счастливее</h3>
          </div>
          
        </div>*/}


        <div className="promo__only-text-container">
          <h3 className="promo__friend-text">{translatedContext.MainTextAppeal}</h3>
          <h3 className="promo__friend-text">{translatedContext.MainTextQuestion}</h3>
          <h3 className="promo__friend-text">{translatedContext.MainTextAssumption}</h3>
          <h3 className="promo__friend-text">{translatedContext.MainTextTruth}</h3>
          <h3 className="promo__friend-text">{translatedContext.MainTextLast}</h3>
        </div>
       {/*
        <div>
        <p>{translatedContext.MainTextVoteTitleQuestion}</p>
        <p>{translatedContext.MainTextVote}</p>
        <p>{translatedContext.MainTextVoteСlarification}</p>

        <button>{translatedContext.MainTextVoteButtonYesText}</button>
        <button>{translatedContext.MainTextVoteButtonNoText}</button>
        </div>*/}

        <div className="promo__pic-container">
          <div className="promo__text-pic-container">
          <img className="promo__pic" src={niceGirlWithGift}></img>
          </div>
          <div className="promo__text-pic-container">
          <img className="promo__pic" src={imagePersonWithHurt}></img>
          </div>
          <div className="promo__text-pic-container">
          <img className="promo__pic" src={blondaGirlWithGiftPic}></img>
          </div>
          <div className="promo__text-pic-container">
          <img className="promo__pic" src={happyGirlWithGift}></img>
          </div>
        </div>

        

            
      </div>
  );
}

export default Promo;
