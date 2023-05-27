import React from 'react'
import OneFriendCard from '../OneFriendCard/OneFriendCard'
//import MyFriendOneDream from '../Friends/MyFriendOneDream/MyFriendOneDream'
import './AllFriendsField.css'
import { useLocation } from 'react-router-dom'

function AllFriendsField({onFriendCardClick, toRenderFriendsDreams, isAddAllBtnClicked, limit, dreams, OnDeleteMyDream, onCardClick}) {

const location = useLocation()

const friends = [
   /* 
  {
   name: "Ivan",
   img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
   id: '12345'
  },
  {name: "Ivan",
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    id: '123456'
  },
  {
    name: "Ivan",
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    id: '12345'
  },
  {name: "Ivan",
     img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
     id: '123456'
  },
  {
    name: "Segrei",
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    id: '12345'
   },*/
   {name: "Varvara",
     img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
     id: '123456'
   },
   {
     name: "Ivan",
     img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
     id: '12345'
   },
   {name: "Svetoslav Ozerov",
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      id: '123456'
   },
  
]

return ( 
  <>
      <ul className='allFriendsField__field'>
        {friends.map((friend) => (
          <OneFriendCard 
            key={friend.id}
            friend={friend}
            //OnDeleteMyDream={OnDeleteMyDream}
            //onCardClick={onCardClick}
          />
        ))}
      </ul>
    
  </>    
);
}
    
export default AllFriendsField;


