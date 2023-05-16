import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './MyFriendsPage.css'
import DreamsField from '../../DreamsField/DreamsField'
import * as Api from '../../../Api/Api'

function MyFriendsPage({friends, motanots, handleMotanClick}) {

const navigate = useNavigate()
  
let { id } = useParams();
const friend = friends.find(f => f._id === id);

const isFriend = false

function goBack() {
  navigate(-1);
}

return (
  <div>
    <button className='my-friends-page__back-btn' onClick={goBack}>⟵ Назад</button>
    <div className='my-friends-page__profile-container'>
      <div className='my-friends-page__inf-container'>
        <p className='my-friends-page__inf'>{friend.name}</p>
        <p className='my-friends-page__inf'>{friend.birthday}</p>
        <p className='my-friends-page__inf'>{friend.about}</p>
      </div>  
      <div className='my-friends-page__img-container'>
        <img className='my-friends-page__img' src={friend.avatar}></img>
      </div>

    </div>  

    <h3 className='my-friends-page__title'>О чем мечтает {friend.name}</h3>

    <DreamsField
      matanots={motanots}
      handleMotanClick={handleMotanClick}
    />

  </div>
)
}

export default MyFriendsPage;