import React from 'react'
import './FriendsSearching.css'
import FullFriendsField from '../FullFriendsField/FullFriendsField'

function FriendsSearching({handleGetUsersSubmit, friends}) {

  const [keyWord, setKeyWord] = React.useState('')
  const [error, setError] = React.useState(false)
  const [usersAfterFilter, setUsersAfterFilter] = React.useState([])

  React.useEffect(() => {
    handleGetUsersSubmit()
  }, []);

  const handleSearchInputChange = (e) => {
    setKeyWord(e.target.value)
    setError(false)
  }
 
  function handleSubmit (e) {
    e.preventDefault();
    filterAllFriends(friends, keyWord)
  }

  function filterAllFriends(friends, keyWord) {
    const friendsAfterFilter = filterItems(friends, keyWord)
    setUsersAfterFilter(friendsAfterFilter)
    console.log(usersAfterFilter)
  }

  
/*
  function filterItems(friends, keyWord) {
    return friends.filter((item) => {
      return (
        item.nameRU && item.nameRU.toLowerCase().indexOf(keyWord.toLowerCase()) > -1
      )
    })
  }
*/
function filterItems(friends, keyWord) {
  return friends.filter((item) => {
    return (
      item.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1
    )
  });
}

return (
  <>

  <div className='friendsSearching__container'>
    <form className='friendsSearching__form' onSubmit={handleSubmit}>
      <input 
        className='friendsSearching__input'
        value={keyWord || ''}
        onChange={handleSearchInputChange}>
      </input>
       <button 
         className='friendsSearching__input-loop-btn'
         type='submit'
       >
      </button>
    </form>

    <p className='friendsSearching__title'>Friends list:</p>

  <FullFriendsField 
    friends={usersAfterFilter}
  />

  </div>  
  </>
)
}

export default FriendsSearching;