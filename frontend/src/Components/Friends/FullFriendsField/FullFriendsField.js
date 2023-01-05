import React from 'react'
import FriendCard from '../FriendCard/FriendCard'
import './FullFriendsField.css'


function FullFriendsField() {

const friends = [
  {
    'link':'https://media.istockphoto.com/id/1003346946/photo/female-birkenstock-sandals-jeans-striped-t-shirt-rattan-bag-coconut-and-sunglasses-on-blue.jpg?b=1&s=170667a&w=0&k=20&c=GzJvPlBIPcjojsrMeE7R7xDYOT1msxy5cmUmK8-BUiA=',
    'id':'1',
    'name':'vegetable',
    'price': '300',
  },
  {
    'link':'https://images.unsplash.com/photo-1571273260782-bab4699dde20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJhZ3MlMjBhbmQlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    'id':'2',
    'name':'fruit',
    'price': '10000',
  },
  {
    'link':'https://media.istockphoto.com/id/1003346946/photo/female-birkenstock-sandals-jeans-striped-t-shirt-rattan-bag-coconut-and-sunglasses-on-blue.jpg?b=1&s=170667a&w=0&k=20&c=GzJvPlBIPcjojsrMeE7R7xDYOT1msxy5cmUmK8-BUiA=',
    'id':'3',
    'name':'vegetable',
    'price': '3000',
  },
  {
    'link':'https://images.unsplash.com/photo-1571273260782-bab4699dde20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJhZ3MlMjBhbmQlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    'id':'4',
    'name':'fruit',
    'price': '1000',
  },

]
  
return ( 

    <ul className='fullFriendsField__field'>
      {friends.map((friend) => (
        <FriendCard 
          key={friend.id}
          friend={friend}
        />
      ))}
    </ul>

);
}
    
export default FullFriendsField;

