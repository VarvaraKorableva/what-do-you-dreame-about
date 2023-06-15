import React from 'react'
import OneDate from '../OneDate/OneDate'
import './DatesField.css'

function DatesField({isCurrentUser, onDelete, onCardClick, importantDates}) {

return ( 
  <ul className='datesField__field'>
    {importantDates.map((date) => (
      <OneDate 
        key={date._id}
        date={date}
        onDelete={onDelete}
        onCardClick={onCardClick}
        isCurrentUser={isCurrentUser}/>
      ))}
  </ul>
);
}
    
export default DatesField;