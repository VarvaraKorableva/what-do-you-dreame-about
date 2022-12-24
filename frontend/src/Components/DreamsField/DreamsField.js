import React from 'react'
import MyDream from '../MyDream/MyDream'
import PriceCategory from '../PriceCategory/PriceCategory' //about friends page
import './DreamsField.css'
import { useLocation } from 'react-router-dom'

function DreamsField() {

  let location = useLocation();  

const dreams = [
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

  location.pathname === '/my-page'?
    <ul className='dreamsField__field'>
      {dreams.map((dream) => (
        <MyDream 
          key={dream.id}
          dream={dream}
        />
      ))}
    </ul>
  :  
    <ul className='dreamsField__field'>
      {dreams.map((dream) => (
        <PriceCategory 
          key={dream.id}
          dream={dream}
        />
      ))}
    </ul>

);
}
    
export default DreamsField;