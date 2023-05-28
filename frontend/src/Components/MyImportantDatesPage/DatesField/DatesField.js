import React from 'react'
import OneDate from '../OneDate/OneDate'
import './DatesField.css'
//import { useLocation } from 'react-router-dom'

function DatesField({isCurrentUser, myFriendImportantDates, OnDeleteMyDate, onCardClick, importantDates}) {


/*
    const dates = [
        {
            name:'birthday',
            date:'04.12.1990',
            description:'my favourete day',
        },
        {
            name:'new year',
            date:'31.12.1990',
            description:'happy new year, we dont need to add it',
        },
        {
            name:'new year',
            date:'31.12.1990',
            description:'happy new year, we dont need to add it',
        },
        {
            name:'birthday and merreadge',
            date:'04.12.1990',
            description:'my favourete day',
        },/*
        {
            name:'new year',
            date:'31.12.1990',
            description:'happy new year, we dont need to add it',
        },
        {
            name:'new year',
            date:'31.12.1990',
            description:'happy new year, we dont need to add it',
        },
    ]*/

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