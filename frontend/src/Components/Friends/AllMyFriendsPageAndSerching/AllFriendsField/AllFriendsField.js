import React from 'react'
import OneFriendCard from '../OneFriendCard/OneFriendCard'
import './AllFriendsField.css'
import {LanguageContext} from '../../../../contexts/TranslationContext'
import choose from '../../../../const/AllMyFriendsPageAndSerching'

function AllFriendsField({allMySubsriptions, isSubmitClicked}) {

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
    {isSubmitClicked?
      allMySubsriptions.length? 
        <ul className='allFriendsField__field'>
          {allMySubsriptions.map((friend) => (
            <OneFriendCard 
              key={friend.subscriberId}
              friend={friend}
            />
          ))}
        </ul>
      :
      <p className='allFriendsField__nothing-to-render-message'>{translatedContext.errors.NothingFoundForYourQuery}</p>
    :
    <ul className='allFriendsField__field'>
      {allMySubsriptions.map((friend) => (
        <OneFriendCard 
          key={friend.subscriberId}
          friend={friend}
        />
      ))}
    </ul>
    }  
  </>    
);
}
    
export default AllFriendsField;


