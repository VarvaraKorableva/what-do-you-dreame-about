import React from 'react'
import './AllMyFriendsPageAndSerching.css'
import AllFriendsField from './AllFriendsField/AllFriendsField'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import Preloader from '../../Preloader/Preloader'


function AllMyFriendsPageAndSerching({ isLoading, getAllSubscriptions, allMySubscriptions }) {

const currentUser = React.useContext(CurrentUserContext)
const userId = currentUser._id

const [haveSubsriptions, setHaveSubsriptions] = React.useState(true)
const [keyWord, setKeyWord] = React.useState('')
const [error, setError] = React.useState(false)
const [errorMessage, setErrorMessage] = React.useState('')
const [usersAfterFilter, setUsersAfterFilter] = React.useState([])
const [isInishialArrOfFriends, setIsInishialArrOfFriends] = React.useState(true)

React.useEffect(() => {
  getAllSubscriptions(userId) //(получить все свои подписки)
  //checkArr()
  //console.log(allMySubsriptions)
}, []);


React.useEffect(() => {
  setUsersAfterFilter(allMySubscriptions)
}, [(isInishialArrOfFriends===true)]);

//console.log(allMySubscriptions)
const handleSearchInputChange = (e) => {
  setKeyWord(e.target.value)
  setError(false)
}

function handleSubmit (e) {
  e.preventDefault();
  if (!keyWord) {
    setError(true)
    setErrorMessage('Please enter the keyword')
    setTimeout(() => {
      setErrorMessage('');
    }, "2000");
  } else {
    setError(false)
    setIsInishialArrOfFriends(false)
    filterAllFriends(allMySubscriptions, keyWord)
  }  
}

function filterAllFriends(allMySubscriptions, keyWord) {
  const allMySubscriptionsAfterFilter = filterItems(allMySubscriptions, keyWord)
  setUsersAfterFilter(allMySubscriptionsAfterFilter)
}

function filterItems(friends, keyWord) {
return friends.filter((item) => {
  return (
    item.subscriberName
    .toLowerCase().indexOf(keyWord.toLowerCase()) > -1
  )
});
}

function showAllSubscriptions() {
  setUsersAfterFilter(allMySubscriptions)
}
/*
function checkArr() {
  if(!allMySubscriptions.lenght) {
    setHaveSubsriptions(false)
  } else {
    setHaveSubsriptions(true)
  }
}*/

return (

  <div className='friendsSearching__container'>
    {isLoading? 
      <Preloader></Preloader>
    :
      (haveSubsriptions?
        <>
          <form className='friendsSearching__form' onSubmit={handleSubmit}>
            <input 
              className='AllMyFriendsPageAndSerching__input'
              onChange={handleSearchInputChange}
              >
            </input>
            {error?<span className='allfriendsSearching__error-message'>{errorMessage}</span>:<></>}
              <button 
                className='AllMyFriendsPageAndSerching__input-loop-btn'
                type='submit'
              ></button>
              <button 
                className='friendsSearching__input-all-btn'
                type='button'
                onClick={showAllSubscriptions}
              >All</button>
          </form>
          <p className='allfriendsSearching__title'>My subscriptions list:</p>
            <AllFriendsField 
              allMySubsriptions={usersAfterFilter}
            />
        </>
      :
        <p>Here you will see your subscriptions</p>
      )
    }
  </div>  

)
}

export default AllMyFriendsPageAndSerching;


/*{<form className='friendsSearching__form'>
<input className='friendsSearching__input'></input>
<button 
  className='friendsSearching__input-loop-btn'
  type='submit'
></button>
</form>}*/

//value={keyWord || "" || "All"}