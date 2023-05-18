import './PriceCategory.css';
import React from 'react'

function PriceCategory({motanots, onMotanClick, isLength, friend}) {
 /*
  function handleClick() {
    onMotanClick(dream);
    console.log(dream._id)
  }*/


  function handleClick() {
    console.log('click')
  }/*
  const [isLength, setIsLength] = React.useState(false)

  function checkArray() {
    if(matanots.length) {
      return setIsLength(true)
    } else {
      setIsLength(false)
    }
  } 

  React.useEffect(() => {
    checkArray()
  }, []);*/

  return ( 
    isLength?

    <div className='price-category__field'>
        <button className="price-category__container" onClick = {handleClick}>Until 100 $</button>
        <button className="price-category__container" onClick = {handleClick}>Until 250 $</button>
        <button className="price-category__container" onClick = {handleClick}>Until 500 $</button>
        <button className="price-category__container" onClick = {handleClick}>More 500 $</button>
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