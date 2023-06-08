import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';

import './MyFriendsPage.css'
import DreamsField from '../../DreamsField/DreamsField'
import PriceCategory from '../../PriceCategory/PriceCategory'
import * as Api from '../../../Api/Api'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function MyFriendsPage({deleteSubscription, allMySubscriptions, onFriendCardClick, addSubscribe, isLoggin, getAllSubscriptions}) {
  
  const [toRenderDreams, setToRenderDreams] = React.useState([])
  const [isShowAllBtnClicked, setIsShowAllBtnClicked] = React.useState(false)
  const [isShowCategoryBtnClicked, setIsShowCategoryBtnClicked] = React.useState(false)
  const [isFilterBtnClicked, setIsFilterBtnClicked] = React.useState(false)
  const [motanots, setMotanots] = React.useState([]) 
  const [isLength, setIsLength] = React.useState(false)
  const [dates, setDates] = React.useState([]) 
  //const [isClick, setIsClick] = React.useState(false)
  const [isSubscriptions, setIsSubscriptions] = React.useState(false)
  const [userData, setUserData] = React.useState(null)
  
  const currentUser = React.useContext(CurrentUserContext)
  const userId = currentUser._id

  const navigate = useNavigate()
  
  let { id } = useParams();
 
  React.useEffect(() => {
    setIsSubscriptions(allMySubscriptions.some(subscriber => subscriber.subscriberId === id));
  }, [allMySubscriptions, id]);

  React.useEffect(() => {
    getAllSubscriptions(userId)
  }, []);
  //let isSubscriptions = allMySubscriptions.some(subscriber => subscriber.subscriberId == id)
  //console.log(allMySubscriptions)
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    //const isLiked = card.likes.some(i => i === currentUser._id);
    //let isSubscriptions = allMySubscriptions.some(subscriber => subscriber.subscriberId === id)
  //console.log(dates)
  function handleSubscribe() {
    const subscriberId = id;
    addSubscribe(subscriberId, userId);
  }

  function handleDeleteSubscribe() {
    let subscription = allMySubscriptions.find(subscription => subscription.subscriberId === id)
    let subscriptionId = subscription._id //айди подписки (не юзеров)
   
    deleteSubscription(subscriptionId)
  }

  const date = '20.06.2023';
  const days = 6;

  function findClosestDate(dataArray) {
    const currentDate = new Date(); // Текущая дата
  
    let closestDate = null; // Инициализируем переменную с наиболее близкой датой
    let closestDiff = Infinity; // Инициализируем переменную с наименьшей разницей
  
    for (let i = 0; i < dataArray.length; i++) {
      const { date } = dataArray[i]; // Получаем значение даты из объекта
  
      const diff = Math.abs(currentDate - new Date(date)); // Разница между текущей датой и датой из объекта
  
      if (diff < closestDiff) {
        closestDiff = diff;
        closestDate = date;
      }
    }
  
    return closestDate;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
    const year = date.getFullYear();
  
    const formattedDate = `${day}.${month}.${year}`;
  
    return formattedDate;
  }

  function calculateDaysLeft(targetDate) {
    const currentDate = new Date(); // Текущая дата
    const endDate = new Date(targetDate); // Целевая дата
  
    // Разница между целевой датой и текущей датой в миллисекундах
    const timeDiff = endDate.getTime() - currentDate.getTime();
  
    // Количество дней, полученных путем деления разницы на количество миллисекунд в одном дне
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    return daysLeft;
  }
  
  const closestDate = findClosestDate(dates); //ближайшая дата

  const daysLeft = calculateDaysLeft(closestDate); ///сколько дней осталось до ближайщей даты
  
  const formattedDate = formatDate(closestDate); ///правильный формат даты

  React.useEffect(() => {
    const getUser = (friendUserId) => {
      Api.getDinamicUser(friendUserId)
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
            {isSubscriptions?
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
          src={`http://localhost:3000${userData.avatar}`}>
        </img>
      </div>

    </div>  

    <div className='my-friends-page__date-info'>
      <p>The next date for the fulfillment of a dream is: {formattedDate}</p>
      <p>{daysLeft} days left until the next day of the dream come true</p>
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
