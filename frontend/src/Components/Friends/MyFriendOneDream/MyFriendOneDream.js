import React from 'react'
import './MyFriendOneDream.css';

function MyFriendOneDream({friendDream, onFriendCardClick}) {
  const [isLink, setIsLink] = React.useState(false)

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

  function checkLink() {
    if(!(friendDream.dreamLink === '')){
        setIsLink(true)
      }else{
        setIsLink(false)
      }
    }
  
    React.useEffect(() => {
      checkLink()
    }, [friendDream]);
  
  return ( 
    <div className="myFriendOneDream__container">
      <div className="myFriendOneDream__img-container">

        <img className="myFriendOneDream__img" 
          alt = {friendDream.name} 
          //src = {friendDream.imgLink}
          src={`http://localhost:3000${friendDream.imgLink}`}
          onClick={handleClick}
      />
      </div>
      
      <div className="myFriendOneDream__inf-container">
        <p className="myFriendOneDream__inf">Name: {friendDream.name}</p>
        <p className="myFriendOneDream__inf">Price: {price} $</p>
        {isLink?
        <a className="myFriendOneDream__inf myFriendOneDream__inf-link" href={friendDream.dreamLink} target='blank'>Link: {friendDream.dreamLink}</a>
        :
        <p className="myFriendOneDream__inf myFriendOneDream__inf-not-link">Link: <span className="myFriendOneDream__not-added">not added</span></p>
        }
        {/*<a className="myFriendOneDream__inf myDream__inf-link" href={friendDream.dreamLink} target='blank' >Link: {friendDream.dreamLink}</a>
        
        */}
      </div>

    </div>
  );
}

export default MyFriendOneDream;