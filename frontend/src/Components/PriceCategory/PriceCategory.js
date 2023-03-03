import './PriceCategory.css';

function PriceCategory({dream}) {
  
  return ( 
    <div className="myDream__container">
      <p className="myDream__price-title">{dream.price}</p>
      <p className="myDream__amount">Количество dreams</p>
    </div>
  );
}
    
export default PriceCategory;