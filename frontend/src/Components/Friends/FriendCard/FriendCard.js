import './FriendCard.css';

function FriendCard({friend}) {
  //Delete to friend? button
  //info about futures dates
  
  return ( 
    <div className="friendCard__container">

      <div className="friendCard__img-container">
        <img className="friendCard__img" 
          alt = {friend.name} 
          src = {friend.link}
        />
      </div>

      <div className="friendCard__friends-info-container">
        <p className="friendCard__friends-name">{friend.name}</p>
        <p className="friendCard__friends-btn">Delete</p>
      </div>

    </div>
  );
}
    
export default FriendCard;