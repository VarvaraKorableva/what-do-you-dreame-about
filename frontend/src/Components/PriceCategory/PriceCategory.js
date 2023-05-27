import './PriceCategory.css';
import React from 'react'

function PriceCategory({
  isLength, friend, 
  getResultFor100,
  getResultFor250,
  getResultFor500,
  getResultForMore500
}) {

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
        <button className="price-category__container" onClick = {handle100Click}>Until 100 $</button>
        <button className="price-category__container" onClick = {handle250Click}>Until 250 $</button>
        <button className="price-category__container" onClick = {handle500Click}>Until 500 $</button>
        <button className="price-category__container" onClick = {handleMore500Click}>More 500 $</button>
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