import React from 'react';
import './MotanOpenPopap.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/MyFriendOneDream'

function MotanOpenPopap({ motan, onClose }) {
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

  function checkLink() {
    if(!(motan.dreamLink === '')){
        setIsLink(true)
      }else{
        setIsLink(false)
      }
    }
  
    React.useEffect(() => {
      checkLink()
    }, [motan]);

  return (
    <aside className={`motan-open-popap ${motan.imgLink ? 'motan-open-popap__opened' : ''}`}>
      <div className="motan-open-popap__picture-container">
        <button className="motan-open-popap__close-button" type="button" onClick={onClose}>
        </button>
        <div className="motan-open-popap__main-box">
          <img 
            //src={motan.imgLink}
            src={`http://localhost:3000${motan.imgLink}`}
            alt={motan.name} 
            className='motan-open-popap__picture'
          />

          {translatedContext === hebrew ?
            <p className="motan-open-popap__picture-name">{motan.name} :{translatedContext.popup.name}</p>
          :
            <p className="motan-open-popap__picture-name">{translatedContext.popup.name}: {motan.name}</p>
          }
          {translatedContext === hebrew ?
            <p className="motan-open-popap__picture-name">$ {motan.price}: {translatedContext.popup.approximateCost}</p>
          :
            <p className="motan-open-popap__picture-name">{translatedContext.popup.approximateCost}: {motan.price} $</p>
          }
          {isLink?
            <a className="motan-open-popap__picture-name motan-open-popap__picture-name-link" href={motan.dreamLink} target='blank'>
              {translatedContext === hebrew ?
                <p className="motan-open-popap__link">{motan.dreamLink} :{translatedContext.popup.whereCanYouBuy}</p>
              :
                <p className="motan-open-popap__link">{translatedContext.popup.whereCanYouBuy}: {motan.dreamLink}</p>
              }
            </a>
          :
            <></>
          }
        </div>
      </div>
    </aside>
  );
}
  
export default MotanOpenPopap;

/*
    translatedContext.popup: {
        translatedContext.popup.name:'Название',
        translatedContext.popup.approximateCost: 'Приблизительная цена:',
    }
*/