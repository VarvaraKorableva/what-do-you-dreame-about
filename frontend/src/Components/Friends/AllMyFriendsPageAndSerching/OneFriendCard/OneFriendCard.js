import './OneFriendCard.css';

function OneFriendCard({friend, OnDeleteMyDream, onCardClick}) {

  
  
  return ( 
    <li className="oneFriendCard__container">
      <div className="oneFriendCard__img-container">
        <img className="oneFriendCard__img" 
          alt = {friend.name} 
          src = {friend.img}
          //onClick={handleClick}
        />
      </div>
      
      <div className="oneFriendCard__inf-container">
        <p className="oneFriendCard__inf">{friend.name}</p>
      </div>
    </li>
  );
}

export default OneFriendCard;