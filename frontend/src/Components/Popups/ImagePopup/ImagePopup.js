import React from 'react';
import './ImagePopup.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/MyDream'


function ImagePopup({ dream, onClose }) {

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
/*
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

  const price = format(priceWithZero)*/

  return (
    <aside className={`img-popup ${dream.imgLink ? 'img-popup__opened' : ''}`}>
      <div className="img-popup__picture-container">
        <button className="img-popup__close-button" type="button" onClick={onClose}>
        </button>
        <div>
          <img 
            //src={dream.imgLink}
            src={`http://localhost:3000${dream.imgLink}`}
            alt={dream.name} 
            className='img-popup__picture'
          />
          {translatedContext === hebrew? 
            <p className="img-popup__picture-name">{dream.name} :{translatedContext.popup.name}</p>
          :
            <p className="img-popup__picture-name">{translatedContext.popup.name}: {dream.name}</p>
          }
          {translatedContext === hebrew? 
            <p className="img-popup__picture-name">$ {dream.price} {translatedContext.popup.approximateCost}</p>
          :
            <p className="img-popup__picture-name">{translatedContext.popup.approximateCost} {dream.price} $</p>
          }
        </div>
      </div>
    </aside>
  );
}
  
export default ImagePopup;

//<p className="img-popup__picture-name">Где купить - {dream.imgLink}</p>

/*
    translatedContext.popup.: {
        translatedContext.popup.name:'Название',
        translatedContext.popup.approximateCost: 'Приблизительная цена:',
    }

*/