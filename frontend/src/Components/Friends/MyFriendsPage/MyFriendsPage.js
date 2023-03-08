import React from 'react'
import { useParams } from 'react-router-dom';
import './MyFriendsPage.css'
import DreamsField from '../../DreamsField/DreamsField'
import * as Api from '../../../Api/Api'

function MyFriendsPage({friends, motanots, handleMotanClick}) {

/*const [motanots, setMotanots] = React.useState([]) */
  
let { id } = useParams();
const friend = friends.find(f => f._id === id);

const isFriend = false
/*
function takeFriendsDreams({id}){
  Api.getOneFriendDreams({id}) 
    .then((res) => {
      console.log(res.data)
      setMotanots(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
} 

React.useEffect(() => {
  Api.getOneFriendDreams() 
    .then((res) => {
      console.log(res.data)
      setMotanots(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
},[])*/
//<h2>{id}</h2>*/
/*
const user = {
  "avatar":"https://images.pexels.com/photos/14491698/pexels-photo-14491698.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "date":"18/01/1984",
  'name':'Ilia Snezhko'
}*/

//const friends = true
/*
about
avatar
email
friends
name*/


return (
  <div>
    <div className='my-friends-page__profile-container'>
      <div className='my-friends-page__inf-container'>
        <p className='my-friends-page__inf'>{friend.name}</p>
        <p className='my-friends-page__inf'>{friend.birthday}</p>
        <p className='my-friends-page__inf'>{friend.about}</p>
      </div>  
      <div className='my-friends-page__img-container'>
        <img className='my-friends-page__img' src={friend.avatar}></img>
        <div className='my-friends-page__container-btn'>
          {isFriend?
            <button className='my-friends-page__delete-friend-btn'>Unsubscribe</button>
          :
            <button className='my-friends-page__add-friend-btn'>Subscribe</button>  
          }  
        </div>
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

/*


    <div className='my-friends-page__inf-upcoming-events'>
      
        <p className='my-friends-page__inf-upcoming-events-info'>Next date for congratulations</p>
        <p className='my-friends-page__inf-upcoming-events-date'>{friend.about}</p>
    
    </div>
      
    <h3 className='my-friends-page__title'>Сhoose price category:</h3>

    <DreamsField
      friends={friends}
    />

*/    