import React from 'react';
import './MotanOpenPopap.css'


function MotanOpenPopap({ motan, onClose }) {
  const [isLink, setIsLink] = React.useState(false)

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
          <p className="motan-open-popap__picture-name">Name: {motan.name}</p>
          <p className="motan-open-popap__picture-name">Approximate cost: {motan.price} $</p>
          {isLink?
            <a className="motan-open-popap__picture-name motan-open-popap__picture-name-link" href={motan.dreamLink} target='blank'>
              <p className="motan-open-popap__link">Where can you buy: {motan.dreamLink}</p>
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