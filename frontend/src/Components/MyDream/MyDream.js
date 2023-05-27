import './MyDream.css';

function MyDream({dream, OnDeleteMyDream, onCardClick}) {

  function handleDelete() {
    OnDeleteMyDream(dream);
  }

  function handleClick() {
    onCardClick(dream);
    console.log(dream._id)
  }

  const priceWithZero = dream.price

  function format(str) {
    const s = str.length;
    const chars = str.split('');
    const strWithSpaces = chars.reduceRight((acc, char, i) => {
        const spaceOrNothing = ((((s - i) % 3) === 0) ? ' ' : '');
        return (spaceOrNothing + char + acc);
    }, '');

    return ((strWithSpaces[0] === ' ') ? strWithSpaces.slice(1) : strWithSpaces);
}

  const price = format(priceWithZero)
  
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
        <p className="myDream__inf">Price: {price}</p>
        <a className="myDream__inf myDream__inf-link" href={dream.imgLink} target='blank' >Link: {dream.imgLink}</a>
      </div>

    </div>
  );
}

export default MyDream;