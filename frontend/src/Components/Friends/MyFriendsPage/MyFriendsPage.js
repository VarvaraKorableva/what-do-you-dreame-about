import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as Api from '../../../Api/Api'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import './MyFriendsPage.css'
import DreamsField from '../../DreamsField/DreamsField'
import PriceCategory from '../../PriceCategory/PriceCategory'
import Preloader from '../../Preloader/Preloader'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/FriendsPage/Friendspage'

function MyFriendsPage({showLoading, deleteSubscription, allMySubscriptions, onFriendCardClick, addSubscribe, isLoggin, getAllSubscriptions}) {
  
  const [toRenderDreams, setToRenderDreams] = React.useState([])
  const [isShowAllBtnClicked, setIsShowAllBtnClicked] = React.useState(false)
  const [isShowCategoryBtnClicked, setIsShowCategoryBtnClicked] = React.useState(false)
  const [isFilterBtnClicked, setIsFilterBtnClicked] = React.useState(false)
  const [motanots, setMotanots] = React.useState([]) 
  const [isLength, setIsLength] = React.useState(false)
  const [isDatesLength, setIsDatesLength] = React.useState(false)
  const [dates, setDates] = React.useState([]) 
  const [isSubscriptions, setIsSubscriptions] = React.useState(false)
  const [userData, setUserData] = React.useState(null)

  const [countOfHundredsCategory, setCountOfHundredsCategory] = React.useState(Number)//<100
  const [countOfTwoHundredsFCategory, setCountOfTwoHundredsFCategory] = React.useState(Number)//<250
  const [countOfFiveHundredsCategory, setCountOfFiveHundredsCategory] = React.useState(Number)//<500
  const [countMoreFiveHundredsCategory, setCountMoreFiveHundredsCategory] = React.useState(Number)//>500

  const currentUser = React.useContext(CurrentUserContext)
  const userId = currentUser._id

  const navigate = useNavigate()
  
  let { id } = useParams();

  const { language } = React.useContext(LanguageContext)

  const { en, rus, hebrew } = choose;

  let translatedContext = '';
  if (language === 'en') {
    translatedContext = en;
  } else if (language === 'rus') {
    translatedContext = rus;
  } else if (language === 'hebrew') {
    translatedContext = hebrew;
  }

  React.useEffect(() => {
    if(!userId) {
      //I leave it empty so that no server request is made if the user is not authenticated
    }else{
      getAllSubscriptions(userId)
  }}, [userId]);

  React.useEffect(() => {
    setIsSubscriptions(allMySubscriptions.some(subscriber => subscriber.subscriberId === id))
  }, [allMySubscriptions]);

  //let isSubscriptions = allMySubscriptions.some(subscriber => subscriber.subscriberId === id)

  function handleSubscribe() {
    const subscriberId = id;
    addSubscribe(subscriberId, userId);
  }

  function handleDeleteSubscribe() {
    let subscription = allMySubscriptions.find(subscription => subscription.subscriberId === id)
    let subscriptionId = subscription._id //айди подписки (не юзеров)
   
    deleteSubscription(subscriptionId)
  }

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
  
    const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль, если число меньше 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль, если число меньше 10
    const year = date.getFullYear();
  
    const formattedDate = `${day}.${month}.${year}`;
  
    return formattedDate;
  }

  function calculateDaysLeft(targetDate) {
    const currentDate = new Date();
    let endDate = new Date(targetDate);
  
    // Установка года текущей даты в год целевой даты
    endDate.setFullYear(currentDate.getFullYear());
  
    // Разница между целевой датой и текущей датой в миллисекундах
    let timeDiff = endDate.getTime() - currentDate.getTime();
    if(timeDiff < 0) {
      endDate.setFullYear(currentDate.getFullYear() + 1);
      timeDiff = endDate.getTime() - currentDate.getTime();
    }
    
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

  React.useEffect(() => {

    setCountOfHundredsCategory(motanots.filter(dream => dream.price < 101).length)

    setCountOfFiveHundredsCategory(motanots.filter(dream => dream.price <= 500 && dream.price > 201).length)

    setCountOfTwoHundredsFCategory(motanots.filter(dream => dream.price < 251 && dream.price > 100).length)

    setCountMoreFiveHundredsCategory(motanots.filter(dream => dream.price > 501).length)

  }, [motanots]);

  function checkArray() {
    if(motanots.length) {
      return setIsLength(true)
    } else {
      setIsLength(false)
    }
  } 

function checkDateskArray() {
  if(dates.length) {
    return setIsDatesLength(true)
  } else {
    setIsDatesLength(false)
  }
} 

React.useEffect(() => {
  checkDateskArray()
}, [dates]);

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
    setIsFilterBtnClicked(false)
  }

  function changeShowCategoryBtnStatus() {
    setIsShowCategoryBtnClicked(true)
    setIsShowAllBtnClicked(false)
    setIsFilterBtnClicked(false)
  }

  function getResultFor100() {
    setIsFilterBtnClicked(true)
    setIsShowAllBtnClicked(false)
    setIsShowCategoryBtnClicked(false)
    setToRenderDreams(motanots.filter(dream => dream.price < 101))
  }

  function getResultFor250() {
    setIsFilterBtnClicked(true)
    setIsShowAllBtnClicked(false)
    setIsShowCategoryBtnClicked(false)
    setToRenderDreams(motanots.filter(dream => dream.price < 251 && dream.price > 100))
  }

  function getResultFor500() {
    setIsFilterBtnClicked(true)
    setIsShowAllBtnClicked(false)
    setIsShowCategoryBtnClicked(false)
    setToRenderDreams(motanots.filter(dream => dream.price <= 500 && dream.price > 201))
  }

  function getResultForMore500() {
    setIsFilterBtnClicked(true)
    setIsShowAllBtnClicked(false)
    setIsShowCategoryBtnClicked(false)
    setToRenderDreams(motanots.filter(dream => dream.price > 501))
  }

  if (!userData || !motanots) {
    return <div className='my-friends-page__loading'>Loading...</div>;
  }
  
return (
  <>
  {showLoading? 
  <Preloader></Preloader>
  :
  <div>
    <div className='my-friends-page__profile-container'>

      <div className='my-friends-page__inf-container'>
      {/*   <button className='my-friends-page__back-btn' onClick={goBack}>⟵ Back</button>*/}
        <div>
          <p className='my-friends-page__inf'>{userData.name}</p>
          <Link to={`/users/${id}/dates`} className='my-friends-page__inf-link'>
            <p className='my-friends-page__inf-link-text'>{translatedContext.seeAllImportantDatesFor} {userData.name} →</p>
          </Link>
        </div>
        {isLoggin?
          <>
            {isSubscriptions?
              <button 
                className='my-friends-page__add-friend-btn'
                onClick={handleDeleteSubscribe}
              >
                {translatedContext.unsubscribe}
              </button>
            :
              <button 
                className='my-friends-page__add-friend-btn'
                onClick={handleSubscribe}
              >
                {translatedContext.subscribe}
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
    {isDatesLength?
    <div className='my-friends-page__date-info'>
      <p>{translatedContext.TheNextDateForTheFulfillmentOfADreamIs} <span className='my-friends-page__date'>{formattedDate}</span></p>
      <p>{translatedContext.leftUntilTheNextDayOfTheDreamComeTrue} <span className='my-friends-page__date'>{daysLeft}</span> {translatedContext.days}</p>
    </div>
    :<div className='my-friends-page__date-info'>
      <p>{translatedContext.noDatesHaveBeenAdded}</p>
    </div>
    }
    {
      isLength?
      <>
        <div className='my-friends-page__filter-btn-container'>
          <button className='my-friends-page__filter-btn' onClick={changeShowCategoryBtnStatus}>{translatedContext.showCategories}</button>
          <button className='my-friends-page__filter-btn' onClick={showAllFriendsDreams}>{translatedContext.showAllDreams}</button>
        </div>
          {isShowAllBtnClicked?
            <DreamsField
              toRenderFriendsDreams={toRenderDreams}
              onFriendCardClick={onFriendCardClick}
            />
          :
            <>
              {
              isFilterBtnClicked?
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
                  countOfHundredsCategory={countOfHundredsCategory}
                  countOfTwoHundredsFCategory={countOfTwoHundredsFCategory}
                  countOfFiveHundredsCategory={countOfFiveHundredsCategory}
                  countMoreFiveHundredsCategory={countMoreFiveHundredsCategory}
                  
                />
              }
            </>
          }
      </>
      :
      <div className='my-friends-page__container-remind'>
        <p className='my-friends-page__message-about-empty-arr'>{translatedContext.noDreamsHaveBeenAdded}</p>
       {/* <button className='my-friends-page__remind-btn'>to remind?</button> */}
      </div>  
    }
  </div>
  }
  </>
)
}

export default MyFriendsPage;