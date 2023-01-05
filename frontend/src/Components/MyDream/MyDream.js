import './MyDream.css';

function MyDream({dream}) {
  
  return ( 
    <div className="myDream__container">
      <button className='myDream__deleteBTN'></button>
      <img className="myDream__img" 
        alt = {dream.name} 
        src = {dream.link}
      />
    </div>
  );
}
    
export default MyDream;