import './PriceCategory.css';

function PriceCategory({dream, onMotanClick}) {
 
  function handleClick() {
    onMotanClick(dream);
    console.log(dream._id)
  }
  

  return ( 
    <div className="price-category__container" onClick = {handleClick}>
      <img className="price-category__img"
        alt = {dream.name} 
        src = {dream.imgLink}
      ></img>
    </div>
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