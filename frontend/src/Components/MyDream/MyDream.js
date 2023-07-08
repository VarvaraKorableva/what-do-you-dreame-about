import React from 'react'
import './MyDream.css'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/MyDream'

function MyDream({dream, OnDeleteMyDream, onCardClick}) {
  const [isLink, setIsLink] = React.useState(false)

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

  function handleDelete() {
    OnDeleteMyDream(dream);
  }

  function handleClick() {
    onCardClick(dream);
    console.log(dream._id)
  }

  const priceWithZero = dream.price

  function format(str) {
    const s = str.length;
    const chars = str.split('');
    const strWithSpaces = chars.reduceRight((acc, char, i) => {
        const spaceOrNothing = ((((s - i) % 3) === 0) ? ' ' : '');
        return (spaceOrNothing + char + acc);
    }, '');

    return ((strWithSpaces[0] === ' ') ? strWithSpaces.slice(1) : strWithSpaces);
}

  const price = format(priceWithZero)

  function checkLink() {
  if(!(dream.dreamLink === '')){
      setIsLink(true)
    }else{
      setIsLink(false)
    }
  }

  React.useEffect(() => {
    checkLink()
  }, [dream]);

  return ( 
    <div className="myDream__container">
      <div className="myDream__img-container">
        <button 
          className='myDream__deleteBTN'
          type="button"
          onClick={handleDelete}>
        </button>
        <img className="myDream__img" 
          alt = {dream.name} 
          //src = {dream.imgLink}
          src={`http://localhost:3000${dream.imgLink}`}
          onClick={handleClick}
        />
      </div>
      
      <div className="myDream__inf-container">
        {translatedContext === hebrew?
          <p className="myDream__inf-title"><span className='myDream__inf'> {dream.name}</span> :{translatedContext.name}</p>
        :
          <p className="myDream__inf-title">{translatedContext.name}:<span className='myDream__inf'> {dream.name}</span></p>
        }
        {translatedContext === hebrew? 
          <p className="myDream__inf-title">$<span className='myDream__inf'> {price} </span>:{translatedContext.price}</p>
        :
          <p className="myDream__inf-title">{translatedContext.price}:<span className='myDream__inf'> {price} $</span></p>
        }
        {isLink?
        <a className="myDream__inf-title myDream__inf-link" href={dream.dreamLink} target='blank'>{translatedContext.linkToDream}: <span className='myDream__inf'>{dream.dreamLink}</span></a>
        :
        <p className="myDream__inf-title myDream__inf-not-link">{translatedContext.linkToDream} <span className="myDream__not-added">{translatedContext.notAdded}</span></p>
          }
      {/*  <a className="myDream__inf myDream__inf-link" href={dream.dreamLink} target='blank' >Link: {dream.dreamLink}</a>*/}
      </div>

    </div>
  );
}

export default MyDream;