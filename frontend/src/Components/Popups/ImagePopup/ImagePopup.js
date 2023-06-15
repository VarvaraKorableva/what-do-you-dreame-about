import React from 'react';
import './ImagePopup.css'


function ImagePopup({ dream, onClose }) {
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
          <img src={dream.imgLink}
            alt={dream.name} 
            className='img-popup__picture'
          />
          <p className="img-popup__picture-name">Name: {dream.name}</p>
          <p className="img-popup__picture-name">Approximate cost: {dream.price} $</p>
          
        </div>
      </div>
    </aside>
  );
}
  
export default ImagePopup;

//<p className="img-popup__picture-name">Где купить - {dream.imgLink}</p>