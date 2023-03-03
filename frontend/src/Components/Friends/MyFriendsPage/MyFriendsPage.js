import React from 'react'
import './MyFriendsPage.css'
import DreamsField from '../../DreamsField/DreamsField'

function MyFriendsPage() {

const user = {
  "avatar":"https://images.pexels.com/photos/14491698/pexels-photo-14491698.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "date":"18/01/1984",
}

return (
  <div>
    <div className='myPage_profile-container'>
      <div className='myPage_inf-container'>
        <p className='myPage_inf'>Ilia Snezhko</p>
        <p className='myPage_inf'>18.01.1984</p>
      </div>  
      <img className='myPage_img' src={user.avatar}></img>
    </div>  

    <div className='myFriendsPage__inf-upcoming-events'>
      
        <p className='myFriendsPage__inf-upcoming-events-info'>Next date for congratulations</p>
        <p className='myFriendsPage__inf-upcoming-events-date'>{user.date}</p>
    
    </div>
      
    <h3 className='myPage__title'>Сhoose price category:</h3>

    <DreamsField/>

  </div>  
)
}

export default MyFriendsPage;