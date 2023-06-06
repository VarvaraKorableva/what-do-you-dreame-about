import React from 'react'
import './AllMyFriendsPageAndSerching.css'
import AllFriendsField from './AllFriendsField/AllFriendsField'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
//import * as Api from './Api/Api'

function AllMyFriendsPageAndSerching({friends, getAllSubsriptions, allMySubsriptions}) {

const currentUser = React.useContext(CurrentUserContext)
const [userDataToRender, setUserDataToRender] = React.useState(null);
const userId = currentUser._id

React.useEffect(() => {
  getAllSubsriptions(userId) //(получить все свои подписки)
  //console.log(allMySubsriptions)

}, []);

const data = allMySubsriptions.transformedSubscriptions;

console.log(data)

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
      allMySubsriptions={data}
    />

  </div>  

)
}

export default AllMyFriendsPageAndSerching;