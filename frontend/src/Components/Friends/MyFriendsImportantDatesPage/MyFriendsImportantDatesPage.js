import React from 'react'
import './MyFriendsImportantDatesPage.css'
import MyFriendsDatesField from '../MyFriendsDatesField/MyFriendsDatesField'
//import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { useParams, Link } from 'react-router-dom'
import * as Api from '../../../Api/Api'
//import Preloader from '../Preloader/Preloader'

function MyFriendsImportantDatesPage({}) {

  let { id } = useParams();

  const [isMyFriendDates, setIsMyFriendDates] = React.useState(false)
  const [myFriendImportantDates, setMyFriendImportantDates] = React.useState([])
  const [friendName, setFriendName] = React.useState('')

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
    <div>
      <section className='my-important-dates'>
        {isMyFriendDates?
          <>
          <h3 className='my-important-dates__title'>{`${friendName}'s events`}</h3>
          <MyFriendsDatesField 
            myFriendImportantDates={myFriendImportantDates}
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
  </div>
  );
}


export default MyFriendsImportantDatesPage; 