import './Promo.css'
import React from "react"
import { LanguageContext } from '../../../../contexts/TranslationContext'
import choose from '../../../../const/MainPageLanguageData'
import imagePersonWithHurt from '../../../../images/personandhurt.png'
import PeoniesSurPic from '../../../../images/peoniessurpic.png'
import PicGift from '../../../../images/girlwithagift.png'
import nicePicClouds from '../../../../images/nicepicclouds.png'
import manPic from '../../../../images/manspic.png'
import happyGirlWithGift from '../../../../images/happygirlwithgift.png'
import PionesPic from '../../../../images/peonies.png'
import blondaGirlWithGiftPic from '../../../../images/blondagirlwithgift.png'
import niceGirlWithGift from '../../../../images/nicegirlwithgift.png'
//<img className="promo__pic" src={imageSalvadorGifts}></img>

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
            <div className="promo__hurt-arrow"></div>
          </div>

          <div className="promo__text-container">
            <h3 className="promo__text">Теперь на вопрос- что тебе подарить? Достаточно отправить ссылку на свою страничку и ты получишь то о чем давно мечтаешь</h3>
            <div className="promo__hurt-arrow"></div>
          </div>
          
          <div className="promo__text-container">
            <h3 className="promo__text">В приложении есть удобное деление по суммам, для того чтобы твои друзья могли выбрать комфортную для себя ценовую категорию</h3>
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
          <h3 className="promo__friend-text">Друзья, как часто мы не знаем, что подарить друг-другу на день рождения, на годовщину, на новый год и на десяток других мероприятий?</h3>
          <h3 className="promo__friend-text">Чем по-настоящему порадовать любимую/ любимого, что точно им понравится? И что точно не будет "не нужным", "занимающим место" или "расстраивающим"?</h3>
          <h3 className="promo__friend-text">Кто-то скажет- "Можно просто спросить"</h3>
          <h3 className="promo__friend-text">Но я вам скажу- Это некомфортный вопрос, лично меня он ставит в неудобное положение, ведь я не знаю, кто на какую сумму рассчитывает, кто куда готов поехать ради моего подарка и тд. Обсуждать делали "на какую сумму", это так ужасно... Уверена, что я не одна такая странная и все испытывают дискомфорт, это можно сравнить с тем, что ты будто что-то просишь, и поэтому я обычно отвечаю- "Ничего, спасибо, у меня все есть"</h3>
          <h3 className="promo__friend-text">Но теперь, достаточно зайти на страничку к своим друзьям и любимым, и увидеть, что именно они хотят получить в подарок. Что точно их обрадует и сделает счастливее.</h3>
        </div>

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


{/*
        <div className="promo__pic-container">
          <div className="promo__text-pic-container">
          <img className="promo__pic" src={PionesPic}></img>
          </div>
          <div className="promo__text-pic-container">
          <img className="promo__pic" src={nicePicClouds}></img>
          </div>
        </div>
*/}