import React from 'react'
import './FriendsSearching.css'
import FullFriendsField from '../FullFriendsField/FullFriendsField'

import * as Api from '../../../Api/Api'

function FriendsSearching({handleGetUsersSubmit, friends}) {

  const [keyWord, setKeyWord] = React.useState('')//setError
  const [error, setError] = React.useState('')
  const [usersAfterFilter, setUsersAfterFilter] = React.useState([])

  const handleSearchInputChange = (e) => {
    setKeyWord(e.target.value)
  }

  /*
  function handleSubmit(e) {
    e.preventDefault();
    const afterFilter = filterItems(friends, keyWord);
    setUsersAfterFilter(afterFilter);
  }*/
  
  function filterItems(friends, keyWord) {
    const queryFriends = Array.isArray(friends)
      ? friends.filter((item) => {
          return (
            typeof item === 'string' && item.toLowerCase().includes(keyWord.toLowerCase())
          );
        })
      : [];
    return queryFriends;
  }
/*
  React.useEffect(() => {
    handleGetUsersSubmit();
  }, []);*/

  function handleSubmit(e) {
    e.preventDefault();
    const afterFilter = filterItems(friends, keyWord)
    setUsersAfterFilter(afterFilter)
    console.log(friends)
    console.log(keyWord)
    console.log(afterFilter)
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
    friends={friends}
    //handleGetOneUserDreamsSubmit={handleGetOneUserDreamsSubmit}
  />

  </div>  
  </>
)
}

export default FriendsSearching;

/**
<div className="friends">
        <ul className="friends__list">
        {
          friends.map((friend) => {
            return (
              <li className="friend-preview" key={friend.id} >
                <Link to={`${friend.id}`}>
                    <img className="friend-preview__image" src={friend.profilePicDark} alt=""/>
                    <span className="friend-preview__name">{friend.name}</span>
                </Link>
              </li>
            )
          })
        }
        </ul>
      </div> 


 */