import React from 'react'
import './MyImportantDatesPage.css'
import DatesField from './DatesField/DatesField'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { useParams, Link } from 'react-router-dom'
import * as Api from '../../Api/Api'


function MyImportantDatesPage({ addPopupOpen, getMyImportantDates, importantDates }) {

  const currentUser = React.useContext(CurrentUserContext)
  const userId = currentUser._id
  let { id } = useParams();
  const [isDates, setIsDates] = React.useState(false)
  const [isCurrentUser, setIsCurrentUser] = React.useState(false)

  const [isMyFriendDates, setIsMyFriendDates] = React.useState(false)
  const [myFriendImportantDates, setMyFriendImportantDates] = React.useState([])
  const [friendName, setFriendName] = React.useState('')

// Проверяем кто юзер - есть ли каррент юзер?
  function checkUser () {
    if(id){
      setIsCurrentUser(false)
    }else {
      setIsCurrentUser(true)
    }
  }

  React.useEffect(() => {
    checkUser();
 }, []);//
///Проверяем каждый каз когда меняется айди 

//есть ли даты?
  function checkMyArr () {
    if(importantDates.length){
      setIsDates(true)
    }else {
      setIsDates(false)
    }
  }

  React.useEffect(() => {
    const getDates = (id) => { 
    getMyImportantDates(id)
    checkMyArr() 
    }

    if (isCurrentUser && userId) {
      getDates(userId);
    }
  }, [isCurrentUser,userId]);


  React.useEffect(() => {
    const getDates = (id) => { 
    getMyImportantDates(id)
    checkMyArr() 
    }

    if (isCurrentUser && userId) {
      getDates(userId);
    }
  }, [importantDates]);


  React.useEffect(() => {
    const getDates = (id) => {
      Api.getOneFriendImportantDates(id)
        .then((res) => {
          setMyFriendImportantDates(res.data)
        })
        .then(() => {
          //console.log(res.data)
          //setMyFriendImportantDates(res.data)
          //console.log(myFriendImportantDates)
        })
        .catch(error => console.error(error));
    };
    if (id) {
      getDates(id);
    }
  }, [id]);

  React.useEffect(() => {
    const getUser = (userId) => {
      Api.getDinamicUser(userId)
        .then((res) => {
          setFriendName(res.user.name);
        })
        .catch(error => console.error(error));
    };
    if (id) {
      getUser(id);
    }
  }, [id]); 
   



  function checkMyFriendArr () {
    //if(myFriendImportantDates.length){
      if(myFriendImportantDates){
      return setIsMyFriendDates(true)
      //console.log(myFriendImportantDates)
    }else {
      setIsMyFriendDates(false)
    }
  }

  React.useEffect(() => {
    checkMyFriendArr()
  }, [myFriendImportantDates]);

  return (
    <>
    {isCurrentUser?
      <section className='my-important-dates'>
        {isDates?
          <DatesField 
            importantDates={importantDates}
            isCurrentUser={isCurrentUser}
          />
        :
          <h2>You can add significant events for yourself, 
          and then people will know when there is still a reason 
          for your dream to come true. 
          </h2>
        }
      
        <button 
          className='my-important-dates__add-btn'
          onClick={addPopupOpen}
        >
          Add new important date
        </button>
    </section>
    :
    <section className='my-important-dates'>
        {isMyFriendDates?
          <>
          <h3 className='my-important-dates__title'>{`${friendName}'s events`}</h3>
          <DatesField 
            myFriendImportantDates={myFriendImportantDates}
            //isFriend={!isCurrentUser}
          />
          </>
        :
          <h2>{friendName} didn't added any dates
          </h2>
        }
        <Link to={`/users/${id}`}
          className='my-important-dates__link'>
          <p className='my-important-dates__link-text'>Go to {friendName}'s page →</p>
        </Link>
        
    </section>
  }
  </>
  );
}


export default MyImportantDatesPage; 