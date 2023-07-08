import React from 'react'
import './MyFriendOneDream.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/MyFriendOneDream'

function MyFriendOneDream({friendDream, onFriendCardClick}) {
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

  function handleClick() {
    onFriendCardClick(friendDream);
  }

  const priceWithZero = friendDream.price

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
    if(!(friendDream.dreamLink === '')){
        setIsLink(true)
      }else{
        setIsLink(false)
      }
    }
  
    React.useEffect(() => {
      checkLink()
    }, [friendDream]);
  
  return ( 
    <div className="myFriendOneDream__container">
      <div className="myFriendOneDream__img-container">

        <img className="myFriendOneDream__img" 
          alt = {friendDream.name} 
          //src = {friendDream.imgLink}
          src={`http://localhost:3000${friendDream.imgLink}`}
          onClick={handleClick}
      />
      </div>
      
      <div className="myFriendOneDream__inf-container">

      {translatedContext === hebrew?
        <p className="myFriendOneDream__inf">{friendDream.name} :{translatedContext.name}</p>
        :
        <p className="myFriendOneDream__inf">{translatedContext.name}: {friendDream.name}</p>
      }
      {translatedContext === hebrew?
        <p className="myFriendOneDream__inf">$ {price} :{translatedContext.price}</p>
      :
        <p className="myFriendOneDream__inf">{translatedContext.price}: {price} $</p>
      }
        {isLink?
        <a className="myFriendOneDream__inf myFriendOneDream__inf-link" href={friendDream.dreamLink} target='blank'>{translatedContext.linkToDream}: {friendDream.dreamLink}</a>
        
        :
        <p className="myFriendOneDream__inf myFriendOneDream__inf-not-link">{translatedContext.linkToDream} <span className="myFriendOneDream__not-added">{translatedContext.notAdded}</span></p>
}
      </div>

    </div>
  );
}

export default MyFriendOneDream;