import './OneFriendCard.css';
import { Link } from 'react-router-dom';

function OneFriendCard({friend}) {
  
  return ( 
    <li className="oneFriendCard__container">
      <div className="oneFriendCard__img-container">
        <Link to={`/users/${friend.subscriberId}`}>
          <img className="oneFriendCard__img" 
            alt = {friend.subscriberName} 
            src={`http://localhost:3000${friend.subscriberAvatar}`}
          />
        </Link>
      </div>
      
      <div className="oneFriendCard__inf-container">
        <p className="oneFriendCard__inf">{friend.subscriberName}</p>
      </div>
    </li>
  );
}

export default OneFriendCard;
