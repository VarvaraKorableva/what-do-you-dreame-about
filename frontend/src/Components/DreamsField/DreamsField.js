import React from 'react'
import MyDream from '../MyDream/MyDream'
import MyFriendOneDream from '../Friends/MyFriendOneDream/MyFriendOneDream'
import './DreamsField.css'
import { useLocation } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/FriendsPage/Friendspage'

function DreamsField({ onFriendCardClick, toRenderFriendsDreams, isAddAllBtnClicked, limit, dreams, OnDeleteMyDream, onCardClick}) {
const currentUser = React.useContext(CurrentUserContext)
const location = useLocation()
const userId = currentUser._id

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

return ( 
  <>
  {location.pathname === `/users/${userId}`?
    <>
    {isAddAllBtnClicked ?
      <ul className='dreamsField__field'>
        {dreams.map((dream) => (
          <MyDream 
            key={dream._id}
            dream={dream}
            OnDeleteMyDream={OnDeleteMyDream}
            onCardClick={onCardClick}/>
        ))}
      </ul>
    :
      <ul className='dreamsField__field'>
        {dreams.length > 0 && dreams.slice(0, limit).map((dream) => (
          <MyDream 
            key={dream._id}
            dream={dream}
            OnDeleteMyDream={OnDeleteMyDream}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    }
    </>
  :
  (toRenderFriendsDreams.length === 0?
    <p className='dreamsField__noOneDreamInCategory-Message'>{translatedContext.nothingHasBeenAddedInThisPriceRange}</p>
    :
    <ul className='dreamsField__field'>
      {toRenderFriendsDreams.map((friendDream) => (
        <MyFriendOneDream 
          key={friendDream._id}
          friendDream={friendDream}
          onFriendCardClick={onFriendCardClick}/>
      ))}
    </ul>
  )

  }
  </>    
);
}
    
export default DreamsField;


//create component onefriends drem