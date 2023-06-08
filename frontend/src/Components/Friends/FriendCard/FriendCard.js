import './FriendCard.css'
import { Link } from 'react-router-dom';

function FriendCard({friend, handleGetOneUserDreamsSubmit}) {
  //Delete to friend? button
  //info about futures dates

/*
  function handleClick(e) {
    //e.preventDefault();
    //handleFriendsSearchSubmit()
    handleGetOneUserDreamsSubmit(friend._id);
  } */

  return ( 
    <div className="friendCard__container">

      <div className="friendCard__img-container"
           key={friend.id}
        //onClick={handleClick}
      > 
      <Link to={`${friend._id}`}>
        <img className="friendCard__img" 
          alt = {`${friend.name} avatar`} 
          //src = {friend.avatar}
          src={`http://localhost:3000${friend.avatar}`}
          />
      </Link>

      </div>

      <div className="friendCard__friends-info-container">
        <p className="friendCard__friends-name">{friend.name}</p>
        <Link to={`${friend._id}`} className="friendCard__friends-link">
            
            <p className="friendCard__friends-link-text">Go</p>
          
        </Link>
        
      </div>

    </div>
  );
}
    
export default FriendCard;

/*<div className="friendCard__container">

      <div className="friendCard__img-container">
        <img className="friendCard__img" 
          alt = {friend.name
          } 
          src = {friend.avatar
          }
        />
      </div>

      <div className="friendCard__friends-info-container">
        <p className="friendCard__friends-name">{friend.name}</p>
        <p className="friendCard__friends-btn">Delete</p>
      </div>

    </div>*/