import React from 'react'
import OneFriendCard from '../OneFriendCard/OneFriendCard'
import './AllFriendsField.css'

function AllFriendsField({allMySubsriptions}) {

return ( 
  <>
      <ul className='allFriendsField__field'>
        {allMySubsriptions.map((friend) => (
          <OneFriendCard 
            key={friend.subscriberId}
            friend={friend}
            //OnDeleteMyDream={OnDeleteMyDream}
            //onCardClick={onCardClick}
          />
        ))}
      </ul>
  </>    
);
}
    
export default AllFriendsField;


