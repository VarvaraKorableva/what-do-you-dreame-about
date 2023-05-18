import React from 'react'
import MyDream from '../MyDream/MyDream'
import MyFriendOneDream from '../Friends/MyFriendOneDream/MyFriendOneDream'
import './DreamsField.css'
import { useLocation } from 'react-router-dom'

function DreamsField({onFriendCardClick, toRenderFriendsDreams, isAddAllBtnClicked, limit, dreams, OnDeleteMyDream, onCardClick}) {

const location = useLocation()

return ( 
  <>
  {location.pathname === '/my-page'?
    <>
    {isAddAllBtnClicked ?
      <ul className='dreamsField__field'>
        {dreams.map((dream) => (
          <MyDream 
            key={dream.id}
            dream={dream}
            OnDeleteMyDream={OnDeleteMyDream}
            onCardClick={onCardClick}/>
        ))}
      </ul>
    :
      <ul className='dreamsField__field'>
        {dreams.length > 0 && dreams.slice(0, limit).map((dream) => (
          <MyDream 
            key={dream.id}
            dream={dream}
            OnDeleteMyDream={OnDeleteMyDream}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    }
    </>
  :
    <ul className='dreamsField__field'>
      {toRenderFriendsDreams.map((friendDream) => (
        <MyFriendOneDream 
          key={friendDream.id}
          friendDream={friendDream}
          onFriendCardClick={onFriendCardClick}/>
      ))}
    </ul>  

  }
  </>    
);
}
    
export default DreamsField;


//create component onefriends drem