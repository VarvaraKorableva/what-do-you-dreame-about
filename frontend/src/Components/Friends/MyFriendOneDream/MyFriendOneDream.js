import './MyFriendOneDream.css';

function MyFriendOneDream({friendDream, onFriendCardClick}) {

  function handleClick() {
    onFriendCardClick(friendDream);
  }

  const priceWithZero = friendDream.price

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
    <div className="myFriendOneDream__container">
      <div className="myFriendOneDream__img-container">

        <img className="myFriendOneDream__img" 
          alt = {friendDream.name} 
          src = {friendDream.imgLink}
          onClick={handleClick}
      />
      </div>
      
      <div className="myFriendOneDream__inf-container">
        <p className="myFriendOneDream__inf">Name: {friendDream.name}</p>
        <p className="myFriendOneDream__inf">Price: {price} $</p>
        <a className="myFriendOneDream__inf myDream__inf-link" href={friendDream.imgLink} target='blank' >Link: {friendDream.imgLink}</a>
      </div>

    </div>
  );
}

export default MyFriendOneDream;