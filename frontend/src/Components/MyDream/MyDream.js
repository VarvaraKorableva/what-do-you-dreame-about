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
      <div className="myDream__img-container">
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
      
      <div className="myDream__inf-container">
        <p className="myDream__inf">Name: {dream.name}</p>
        <p className="myDream__inf">Price: {dream.price}</p>
        <a className="myDream__inf myDream__inf-link" href={dream.imgLink} target='blank' >Link: {dream.imgLink}</a>
      </div>


    </div>
  );
}

export default MyDream;