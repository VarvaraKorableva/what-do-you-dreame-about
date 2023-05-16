import React from 'react'
import MyDream from '../MyDream/MyDream'
import PriceCategory from '../PriceCategory/PriceCategory' //about friends page
import MyFriendsPage from '../../Components/Friends/MyFriendsPage/MyFriendsPage'
import './DreamsField.css'
import { useLocation } from 'react-router-dom'

function DreamsField({dreams, OnDeleteMyDream, matanots, onCardClick, handleMotanClick}) {

  let location = useLocation();  
//потом удалить только для страници друзей на время
/*
const matanots = [
    {
    'imgLink':'https://media.istockphoto.com/id/1003346946/photo/female-birkenstock-sandals-jeans-striped-t-shirt-rattan-bag-coconut-and-sunglasses-on-blue.jpg?b=1&s=170667a&w=0&k=20&c=GzJvPlBIPcjojsrMeE7R7xDYOT1msxy5cmUmK8-BUiA=',
    '_id':'1',
    'name':'vegetable',
    'price': '300',
  },
  {
    'imgLink':'https://images.unsplash.com/photo-1571273260782-bab4699dde20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJhZ3MlMjBhbmQlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    '_id':'2',
    'name':'fruit',
    'price': '10000',
  },
  {
    'imgLink':'https://media.istockphoto.com/id/1003346946/photo/female-birkenstock-sandals-jeans-striped-t-shirt-rattan-bag-coconut-and-sunglasses-on-blue.jpg?b=1&s=170667a&w=0&k=20&c=GzJvPlBIPcjojsrMeE7R7xDYOT1msxy5cmUmK8-BUiA=',
    '_id':'3',
    'name':'vegetable',
    'price': '3000',
  },
  {
    'imgLink':'https://images.unsplash.com/photo-1571273260782-bab4699dde20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJhZ3MlMjBhbmQlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    '_id':'4',
    'name':'fruit',
    'price': '1000',
  },

]*/

return ( 

  location.pathname === '/my-page'?
    <ul className='dreamsField__field'>
      {dreams.map((dream) => (
        <MyDream 
          key={dream.id}
          dream={dream}
          OnDeleteMyDream={OnDeleteMyDream}
          onCardClick={onCardClick}
        />
      ))}
    </ul>
  :  
    <ul className='dreamsField__field'>
      {matanots.map((dream) => (
        <PriceCategory 
          key={dream._id}
          dream={dream}
          onMotanClick={handleMotanClick}
        />
      ))}
    </ul>

);
}
    
export default DreamsField;

/**
     <ul className='dreamsField__field'>
      {matanot.map((dream) => (
        <PriceCategory 
          key={dream.id}
          dream={dream}
        />
      ))}
    </ul>
 */