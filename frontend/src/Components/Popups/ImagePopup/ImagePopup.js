import React from 'react';
import './ImagePopup.css'


function ImagePopup({ dream, onClose }) {

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
          <p className="img-popup__picture-name">{dream.name}</p>
          <p className="img-popup__picture-name">Приблизительная стоимость {dream.price}</p>
          
        </div>
      </div>
    </aside>
  );
}
  
export default ImagePopup;

//<p className="img-popup__picture-name">Где купить - {dream.imgLink}</p>