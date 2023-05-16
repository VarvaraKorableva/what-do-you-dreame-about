import React from 'react'
import './FriendsSearching.css'
import FullFriendsField from '../FullFriendsField/FullFriendsField'

import * as Api from '../../../Api/Api'

function FriendsSearching({handleGetUsersSubmit, friends, handleGetOneUserDreamsSubmit}) {

  const [keyWord, setKeyWord] = React.useState('')
  //const [users, setUsers] = React.useState([])
// Сделать контейнер для друзей, но через флекс, хотя можно и через грид
//сделать компонент контейнер + непосредственный друг-карточка друга
function handleSubmit(e) {
  e.preventDefault();
  //handleFriendsSearchSubmit()
  handleGetUsersSubmit();
}
/*
function handleGetUsersSubmit() {
  Api.getUsers()
    .then((res) => {
      //const data = res.data
      console.log(res)
      setUsers(res.data)
      //localStorage.setItem('users', users)
     
      //localStorage.setItem('users', JSON.stringify(users))
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      //setShowLoading(false);
    })
} */ /*
//keyWordFromInput
function handleFriendsSearchSubmit() {
  //setKeyWord(keyWordFromInput)
  //localStorage.setItem('keyWord', keyWord)
  Api.getUsers()
  .then((res) => {

    setUsers(res.data)
    
    //const usersAfterFilter = filterUsers(users, keyWord)
    //localStorage.setItem('usersAfterFilter', JSON.stringify(usersAfterFilter))
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    //setIsLoading(false)
  })
}*/
/*
function filterUsers(users, keyWord) {
  const queryUsers = Array.isArray(users) ?
  users.filter((item) => {
    return (
      item.nameRU.toLowerCase().indexOf(keyWord.toLowerCase()) > -1
    )
  })
  : []
  return queryUsers
}*/

return (
  <>

  <div className='friendsSearching__container'>
    <form className='friendsSearching__form' onSubmit={handleSubmit}>
       <input className='friendsSearching__input'></input>
       <button 
         className='friendsSearching__input-loop-btn'
         type='submit'
       ></button>
    </form>

    <p className='friendsSearching__title'>Friends list:</p>

  <FullFriendsField 
    friends={friends}
    handleGetOneUserDreamsSubmit={handleGetOneUserDreamsSubmit}
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