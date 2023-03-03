import React from 'react'
import './FriendsSearching.css'
import FullFriendsField from '../FullFriendsField/FullFriendsField'

function FriendsSearching() {
// Сделать контейнер для друзей, но через флекс, хотя можно и через грид
//сделать компонент контейнер + непосредственный друг-карточка друга

return (
  <>

  <div className='friendsSearching__container'>
    <form className='friendsSearching__form'>
       <input className='friendsSearching__input'></input>
       <div className='friendsSearching__input-loop'></div>
    </form>

    <p className='friendsSearching__title'>Friends list:</p>

  <FullFriendsField />

  </div>  
  </>
)
}

export default FriendsSearching;