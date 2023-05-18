import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './MyFriendsPage.css'
import DreamsField from '../../DreamsField/DreamsField'
import PriceCategory from '../../PriceCategory/PriceCategory'
//import * as Api from '../../../Api/Api'

function MyFriendsPage({friends, motanots, isLength, onFriendCardClick}) {
  
  const [toRenderDreams, setToRenderDreams] = React.useState([])
  const [isShowAllBtnClicked, setIsShowAllBtnClicked] = React.useState(false)
  const [isShowCategoryBtnClicked, setIsShowCategoryBtnClicked] = React.useState(false)

  const navigate = useNavigate()
  
  let { id } = useParams();
  const friend = friends.find(f => f._id === id);

  //const isFriend = false

  function goBack() {
    navigate(-1);
  }

  const date = '20.06.2023';
  const days = 6;

  function showAllFriendsDreams() {
    setToRenderDreams(motanots)
    changeShowAllBtnStatus()
  }

  function changeShowAllBtnStatus() {
    setIsShowAllBtnClicked(true)
    setIsShowCategoryBtnClicked(false)
  }

  function changeShowCategoryBtnStatus() {
    setIsShowCategoryBtnClicked(true)
    setIsShowAllBtnClicked(false)
  }

  

return (
  <div>
    
    <div className='my-friends-page__profile-container'>

      <div className='my-friends-page__inf-container'>
        <button className='my-friends-page__back-btn' onClick={goBack}>⟵ Back</button>
        <p className='my-friends-page__inf'>{friend.name}</p>
        <p className='my-friends-page__inf'>{friend.birthday}</p>
        <p className='my-friends-page__inf'>{friend.about}</p>
        <p className='my-friends-page__inf'>See all important dates for {friend.name}</p>
        <button className='my-friends-page__add-friend-btn'>Add to the friend</button>
      </div> 
 
      <div className='my-friends-page__img-container'>
        <img className='my-friends-page__img' src={friend.avatar}></img>
      </div>

    </div>  

    <div className='my-friends-page__date-info'>
      <p>The next date for the fulfillment of a dream is: {date}</p>
      <p>{days} days left until the next day of the dream come true</p>
    </div>

    {
      isLength?
      <>
        <div className='my-friends-page__filter-btn-container'>
          <button className='my-friends-page__filter-btn' onClick={changeShowCategoryBtnStatus}>Show  categories</button>
          <button className='my-friends-page__filter-btn' onClick={showAllFriendsDreams}>Show all dreams</button>
        </div>
          {isShowAllBtnClicked?
            <DreamsField
              toRenderFriendsDreams={toRenderDreams}
              onFriendCardClick={onFriendCardClick}
            />
          :
            <PriceCategory
              motanots={motanots}
              isLength={isLength}
              friend={friend}
            /> 
          }
       
      </>
      :
        <></>
    }
  </div>
)
}

export default MyFriendsPage;

/*
    <PriceCategory
      motanots={motanots}
      isLength={isLength}
      friend={friend}
    />


*/