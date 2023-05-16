import React from 'react'
import FriendCard from '../FriendCard/FriendCard'
import './FullFriendsField.css'


function FullFriendsField({friends, handleGetOneUserDreamsSubmit}) {

/*
"friends":[
   {
      "name":"Саша",
      "id":"0",
      "profilePicDark":"/profile-images/bill-dark.png",
      "profilePicLight":"/profile-images/bill-light.png",
      "location":"Санкт-Петербург, Россия",
      "favBirdQuote":"Красна птица пением, а человек – умением.",
      "parrotsOwned":[
         {
            "name":"Кеша",
            "favoriteToys":[
               "бубенчик",
               "бумажный бантик"
            ]
         },
         {
            "name":"Чарли",
            "favoriteToys":[
               "маленькая чашечка",
               "медвежонок"
            ]
         }
      ]
   },
   {
      "name":"Женя",
      "id":"1",
      "profilePicDark":"/profile-images/mary-dark.png",
      "profilePicLight":"/profile-images/mary-light.png",
      "location":"Владивосток, Россия",
      "favBirdQuote":"Лучше синица в руках, чем журавль в небе.",
      "parrotsOwned":[
         {
            "name":"Абрикос",
            "favoriteToys":[
               "карандаш",
               "пищалка"
            ]
         }
      ]
   }
] 



const friends = [
  {
    'avatar':'https://media.istockphoto.com/id/1003346946/photo/female-birkenstock-sandals-jeans-striped-t-shirt-rattan-bag-coconut-and-sunglasses-on-blue.jpg?b=1&s=170667a&w=0&k=20&c=GzJvPlBIPcjojsrMeE7R7xDYOT1msxy5cmUmK8-BUiA=',
    'id':'1',
    'name':'vegetable',
    'price': '300',
  },
  {
    'avatar':'https://images.unsplash.com/photo-1571273260782-bab4699dde20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJhZ3MlMjBhbmQlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    'id':'2',
    'name':'fruit',
    'price': '10000',
  },
  {
    'avatar':'https://media.istockphoto.com/id/1003346946/photo/female-birkenstock-sandals-jeans-striped-t-shirt-rattan-bag-coconut-and-sunglasses-on-blue.jpg?b=1&s=170667a&w=0&k=20&c=GzJvPlBIPcjojsrMeE7R7xDYOT1msxy5cmUmK8-BUiA=',
    'id':'3',
    'name':'vegetable',
    'price': '3000',
  },
  {
    'avatar':'https://images.unsplash.com/photo-1571273260782-bab4699dde20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJhZ3MlMjBhbmQlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    'id':'4',
    'name':'fruit',
    'price': '1000',
  },

]*/

return ( 

    <ul className='fullFriendsField__field'>
      {friends.map((friend) => (
        <FriendCard 
          key={friend._id}
          friend={friend}
          handleGetOneUserDreamsSubmit={handleGetOneUserDreamsSubmit}
        />
      ))}
    </ul>

);
}
    
export default FullFriendsField;
/*
<div className="friends">
        <ul className="friends__list">
        {
          friends.map((friend) => {
            return (
              <li className="friend-preview" key={friend.id} >
                <Link to={`${friend.id}`}>
                    <img className="friend-preview__image" src={friend.profilePicDark} alt=""/>
                    <span className="friend-preview__name">{friend.name}</span>
                </Link>
              </li>
            )
          })
        }
        </ul>
      </div>

*/


/*
return ( 

    <ul className='fullFriendsField__field'>
      {friends.map((friend) => (
        <FriendCard 
          key={friend._id}
          friend={friend}
        />
      ))}
    </ul>

);


*/