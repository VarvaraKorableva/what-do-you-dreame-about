import React from 'react'
import FriendCard from '../FriendCard/FriendCard'
import './FullFriendsField.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/AllMyFriendsPageAndSerching'


function FullFriendsField({friends, handleGetOneUserDreamsSubmit, isSubmitClicked}) {
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
  <>{isSubmitClicked?
    (friends.length?
      <ul className='fullFriendsField__field'>
        {friends.map((friend) => (
          <FriendCard 
            key={friend._id}
            friend={friend}
             handleGetOneUserDreamsSubmit={handleGetOneUserDreamsSubmit}
          />
        ))}
      </ul>
    :
      <p className='fullFriendsField__nothing-message'>{translatedContext.errors.NothingFoundForYourQuery}</p>
    )
    :
    <p></p>}
  </>  
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