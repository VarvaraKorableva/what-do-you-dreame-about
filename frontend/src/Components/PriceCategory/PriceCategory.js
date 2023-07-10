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
        <button className="price-category__container" onClick = {handle100Click}>
          <p className="price-category__container-cost">{translatedContext.until} 100 $</p>
          <p className="price-category__container-quantity">( {countOfHundredsCategory} )</p>
        </button>
        <button className="price-category__container" onClick = {handle250Click}>
          <p className="price-category__container-cost">{translatedContext.until} 250 $</p>
          <p className="price-category__container-quantity">( {countOfTwoHundredsFCategory} )</p>
        </button>
        <button className="price-category__container" onClick = {handle500Click}>
          <p className="price-category__container-cost">{translatedContext.until} 500 $</p>
          <p className="price-category__container-quantity">( {countOfFiveHundredsCategory} )</p>
        </button>
        <button className="price-category__container" onClick = {handleMore500Click}>
          <p className="price-category__container-cost">{translatedContext.more} 500 $</p>
          <p className="price-category__container-quantity">( {countMoreFiveHundredsCategory} )</p>
        </button>
    </div>
    :

    <p></p>
  );
}
    
export default PriceCategory;

/*
<p className="price-category__message-empty-array">{friend.name} {translatedContext.didntAddAnyDreamsInCategory}</p>
*/