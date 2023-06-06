import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';

import './MyFriendsPage.css'
import DreamsField from '../../DreamsField/DreamsField'
import PriceCategory from '../../PriceCategory/PriceCategory'
import * as Api from '../../../Api/Api'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function MyFriendsPage({deleteSubsription, allMySubsriptions, onFriendCardClick, addSubscribe, isLoggin, getAllSubsriptions}) {
  
  const [toRenderDreams, setToRenderDreams] = React.useState([])
  const [isShowAllBtnClicked, setIsShowAllBtnClicked] = React.useState(false)
  const [isShowCategoryBtnClicked, setIsShowCategoryBtnClicked] = React.useState(false)
  const [isFilterBtnClicked, setIsFilterBtnClicked] = React.useState(false)
  const [motanots, setMotanots] = React.useState([]) 
  const [isLength, setIsLength] = React.useState(false)
  const [dates, setDates] = React.useState([]) 
  //const [allMySubsriptions, setAllMySubsriptions] = React.useState([])

  const [userData, setUserData] = React.useState(null)

  const currentUser = React.useContext(CurrentUserContext)

  const userId = currentUser._id

  //const userIdForSub = currentUser._id

  const navigate = useNavigate()
  
  let { id } = useParams();
 

  React.useEffect(() => {
    getAllSubsriptions(userId)
  }, []);

  let isSubsriptions = allMySubsriptions.some(subscriber => subscriber.subscriberId === id)
  //console.log(isSubsriptions)
//const isSubsriptions = true
//console.log(allMySubsriptions)
  function handleSubscribe() {
    const subscriberId = id
    addSubscribe(subscriberId, userId)
  }

  function handleDeleteSubscribe() {
    let subscription = allMySubsriptions.find(subscription => subscription.subscriberId === id)
    console.log(subscription)
    let subscriptionId = subscription._id
    deleteSubsription(subscriptionId)
  }

  const date = '20.06.2023';
  const days = 6;

  React.useEffect(() => {
    const getUser = (userId) => {
      Api.getDinamicUser(userId)
        .then((res) => {
          setUserData(res.user);
        })
        .catch(error => console.error(error));
    };
    getUser(id);
  }, [id]);

  function checkArray() {
    if(motanots.length) {
      return setIsLength(true)
    } else {
      setIsLength(false)
    }
  } 

React.useEffect(() => {
  const getDreams = (userId) => {
    Api.getOneFriendDreams(userId)
      .then((res) => {
        setMotanots(res.data)
        
      })
      .catch(error => console.error(error));
  };
  getDreams(id);
}, [id]);


React.useEffect(() => {
  checkArray()
}, [motanots]);

  function goBack() {
    navigate(-1);
  }
 
React.useEffect(() => {
  const getDates = (userId) => {
    Api.getOneFriendImportantDates(userId)
      .then((res) => {
        //console.log(res.data)
        setDates(res.data)
      })
      .catch(error => console.error(error));
  };
  getDates(id);
}, [id]);

  function showAllFriendsDreams() {
    setToRenderDreams(motanots)
    changeShowAllBtnStatus()
    setIsFilterBtnClicked(false)
  }
//just btn to change field
  function changeShowAllBtnStatus() {
    setIsShowAllBtnClicked(true)
    setIsShowCategoryBtnClicked(false)
  }

  function changeShowCategoryBtnStatus() {
    setIsShowCategoryBtnClicked(true)
    setIsShowAllBtnClicked(false)
  }

  function getResultFor100() {
    setIsFilterBtnClicked(true)
    setToRenderDreams(motanots.filter(dream => dream.price < 101))
  }

  function getResultFor250() {
    setIsFilterBtnClicked(true)
    setToRenderDreams(motanots.filter(dream => dream.price < 251 && dream.price > 100))
  }

  function getResultFor500() {
    setIsFilterBtnClicked(true)
    setToRenderDreams(motanots.filter(dream => dream.price <= 500 && dream.price > 201))
  }

  function getResultForMore500() {
    setIsFilterBtnClicked(true)
    setToRenderDreams(motanots.filter(dream => dream.price > 501))
  }

  if (!userData || !motanots) {
    return <div>Loading...</div>;
  }

/*
  function handleSubscribe(id) {
    //setShowLoading(true);
    Api.subscribe(id)
      .then((res) => {

      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setShowLoading(false);
      })
  }*/
  //subscribe
  
return (
  <div>
    
    <div className='my-friends-page__profile-container'>

      <div className='my-friends-page__inf-container'>
        <button className='my-friends-page__back-btn' onClick={goBack}>⟵ Back</button>

        <p className='my-friends-page__inf'>{userData.name}</p>

        
        <Link to={`/users/${id}/dates`}>
          <p className='my-friends-page__inf'>See all important dates for {userData.name} →</p>
        </Link>

        {isLoggin?
          <>
            {isSubsriptions?
              <button 
                className='my-friends-page__add-friend-btn'
                onClick={handleDeleteSubscribe}
              >
                Unsubscribe
              </button>
            :
              <button 
                className='my-friends-page__add-friend-btn'
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            }
          </>
        :
          <></>
        }
        
      </div> 
 
      <div className='my-friends-page__img-container'>
        <img 
          className='my-friends-page__img' 
          //src={userData.avatar}>
          src={`http://localhost:3000${userData.avatar}`}>
        </img>
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
            <>
              {isFilterBtnClicked?
                <DreamsField
                  toRenderFriendsDreams={toRenderDreams}
                  onFriendCardClick={onFriendCardClick}
                />
              :
                <PriceCategory
                  motanots={motanots}
                  isLength={isLength}
                  friend={userData}
                  getResultFor100={getResultFor100}
                  getResultFor250={getResultFor250}
                  getResultFor500={getResultFor500}
                  getResultForMore500={getResultForMore500}
                />
              }
            </>
          }
      </>
      :
      <div className='my-friends-page__container-remind'>
        <p className='my-friends-page__message-about-empty-arr'>{userData.name}  did't have time to tell about dreams, </p>
        <button className='my-friends-page__remind-btn'>to remind?</button>
      </div>  
    }
  </div>
)
}

export default MyFriendsPage;


/*

{isFilterBtnClicked?
                <DreamsField
                  toRenderFriendsDreams={toRenderDreams}
                  onFriendCardClick={onFriendCardClick}
                />
              :
                <PriceCategory
                  motanots={motanots}
                  isLength={isLength}
                  friend={friend}
                  getResultFor100={getResultFor100}
                  getResultFor250={getResultFor250}
                  getResultFor500={getResultFor500}
                  getResultForMore500={getResultForMore500}
                />
              }

/*<button className='my-friends-page__add-friend-btn'>Look all users</button>*/


/*
        {isLoggin?
          <button 
            className='my-friends-page__add-friend-btn'
            //onClick={handleSubscribe}
          >
              Add to the friend
          </button>
        :
          <></>
        }
        <p className='my-friends-page__inf'>{userData.birthday}</p>
        <p className='my-friends-page__inf'>{userData.about}</p>
*/