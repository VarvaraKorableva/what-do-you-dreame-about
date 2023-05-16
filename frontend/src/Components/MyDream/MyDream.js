import './MyDream.css';

function MyDream({dream, OnDeleteMyDream, onCardClick}) {

  function handleDelete() {
    OnDeleteMyDream(dream);
  }

  function handleClick() {
    onCardClick(dream);
    console.log(dream._id)
  }
  
  return ( 
    <div className="myDream__container">
      <button 
        className='myDream__deleteBTN'
        type="button"
        onClick={handleDelete}>
      </button>
      <img className="myDream__img" 
        alt = {dream.name} 
        src = {dream.imgLink}
        onClick={handleClick}
      />
    </div>
  );
}

export default MyDream;