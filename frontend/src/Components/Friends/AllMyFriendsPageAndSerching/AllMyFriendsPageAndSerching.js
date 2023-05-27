import React from 'react'
import './AllMyFriendsPageAndSerching.css'
import AllFriendsField from './AllFriendsField/AllFriendsField'

import * as Api from '../../../Api/Api'

function AllMyFriendsPageAndSerching({friends}) {

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
      friends={friends}
    />

  </div>  

)
}

export default AllMyFriendsPageAndSerching;