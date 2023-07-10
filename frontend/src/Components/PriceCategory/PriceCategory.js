import './PriceCategory.css';
import React from 'react'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/FriendsPage/Friendspage'

function PriceCategory({
  isLength, friend, 
  getResultFor100,
  getResultFor250,
  getResultFor500,
  countOfHundredsCategory,
  countOfTwoHundredsFCategory,
  countOfFiveHundredsCategory,
  countMoreFiveHundredsCategory,
  getResultForMore500
}) {

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

  function handle100Click() {
    getResultFor100()
  }

  function handle250Click() {
    getResultFor250()
  }

  function handle500Click() {
    getResultFor500()
  }

  function handleMore500Click() {
    getResultForMore500()
  }

  return ( 
    isLength?

    <div className='price-category__field'>
        <button className="price-category__container" onClick = {handle100Click}>{translatedContext.until} 100 $ {countOfHundredsCategory}</button>
        <button className="price-category__container" onClick = {handle250Click}>{translatedContext.until} 250 $ {countOfTwoHundredsFCategory}</button>
        <button className="price-category__container" onClick = {handle500Click}>{translatedContext.until} 500 $ {countOfFiveHundredsCategory}</button>
        <button className="price-category__container" onClick = {handleMore500Click}>{translatedContext.more} 500 $ {countMoreFiveHundredsCategory}</button>
    </div>
    :

    <p className="price-category__message-empty-array">{friend.name} hasn't added any gifts yet</p>
  );
}
    
export default PriceCategory;

/*function PriceCategory({dream}) {
  
  return ( 
    <div className="price-category__container">
      <p className="price-category__price-title">{dream.price}</p>
      <p className="price-category__amount">Количество dreams</p>
    </div>
  );
}*/