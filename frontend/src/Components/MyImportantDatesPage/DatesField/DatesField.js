import React from 'react'
import OneDate from '../OneDate/OneDate'
import './DatesField.css'

function DatesField({isCurrentUser, myFriendImportantDates, OnDeleteMyDate, onCardClick, importantDates}) {

return ( 

    <>{isCurrentUser?
          <ul className='datesField__field'>
        {importantDates.map((date) => (
          <OneDate 
            key={date._id}
            date={date}
            OnDeleteMyDate={OnDeleteMyDate}
            onCardClick={onCardClick}
            isCurrentUser={isCurrentUser}/>
        ))}
      </ul>
      :
      <ul className='datesField__field'>
      {myFriendImportantDates.map((date) => (
        <OneDate 
          key={date._id}
          date={date}
          onCardClick={onCardClick}
          isCurrentUser={isCurrentUser}/>
      ))}
    </ul>
      }
    </>

);
}
    
export default DatesField;