import React from 'react';
import './MotanOpenPopap.css'


function MotanOpenPopap({ motan, onClose }) {

  return (
    <aside className={`motan-open-popap ${motan.imgLink ? 'motan-open-popap__opened' : ''}`}>
      <div className="motan-open-popap__picture-container">
        <button className="motan-open-popap__close-button" type="button" onClick={onClose}>
        </button>
        <div>
          <img src={motan.imgLink}
            alt={motan.name} 
            className='motan-open-popap__picture'
          />
          <p className="motan-open-popap__picture-name">{motan.name}</p>
          <p className="motan-open-popap__picture-name">Приблизительная стоимость {motan.price}</p>
          <a className="motan-open-popap__picture-name motan-open-popap__picture-name-link" href={motan.imgLink} target='blank'>
            <p>Где можно купить: {motan.dreamLink}</p>
          </a>
          
          
        </div>
      </div>
    </aside>
  );
}
  
export default MotanOpenPopap;