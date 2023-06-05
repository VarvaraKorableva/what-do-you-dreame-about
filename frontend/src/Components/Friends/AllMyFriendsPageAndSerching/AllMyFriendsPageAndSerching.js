import React from 'react'
import './AllMyFriendsPageAndSerching.css'
import AllFriendsField from './AllFriendsField/AllFriendsField'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function AllMyFriendsPageAndSerching({ getAllSubsriptions, allMySubsriptions}) {

const currentUser = React.useContext(CurrentUserContext)
  
const userId = currentUser._id
/*
React.useEffect(() => {
  handleGetUsersSubmit()
  //console.log(friends)///запросила всех френдсов
}, []);*/

React.useEffect(() => {
  getAllSubsriptions(userId) //(получить всех моих подписчиков )
  console.log(allMySubsriptions)
  //console.log(friends)
}, []);




return (

  <div className='friendsSearching__container'>
    <form className='friendsSearching__form'>
       <input className='friendsSearching__input'></input>
       <button 
         className='friendsSearching__input-loop-btn'
         type='submit'
       ></button>
    </form>

    <p className='allfriendsSearching__title'>Friends list:</p>

    <AllFriendsField 
      allMySubsriptions={allMySubsriptions}
    />

  </div>  

)
}

export default AllMyFriendsPageAndSerching;