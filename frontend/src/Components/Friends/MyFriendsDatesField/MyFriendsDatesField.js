import React from 'react'
import MyFriendsOneDate from '../MyFriendsOneDate /MyFriendsOneDate'
//import './DatesField.css'

function MyFriendsDatesField({ myFriendImportantDates, onCardClick}) {

return ( 
  <ul className='datesField__field'>
    {myFriendImportantDates.map((date) => (
       <MyFriendsOneDate
        key={date._id}
        date={date}
        onCardClick={onCardClick}/>
    ))}
  </ul>
);
}
    
export default MyFriendsDatesField;