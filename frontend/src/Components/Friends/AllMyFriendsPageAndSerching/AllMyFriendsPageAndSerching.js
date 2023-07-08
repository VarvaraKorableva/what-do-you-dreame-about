import React from 'react'
import './AllMyFriendsPageAndSerching.css'
import AllFriendsField from './AllFriendsField/AllFriendsField'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import Preloader from '../../Preloader/Preloader'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/AllMyFriendsPageAndSerching'


function AllMyFriendsPageAndSerching({ isLoading, getAllSubscriptions, allMySubscriptions }) {

const currentUser = React.useContext(CurrentUserContext)
const userId = currentUser._id

const [haveSubsriptions, setHaveSubsriptions] = React.useState(true)
const [keyWord, setKeyWord] = React.useState('')
const [error, setError] = React.useState(false)
const [errorMessage, setErrorMessage] = React.useState('')
const [usersAfterFilter, setUsersAfterFilter] = React.useState(allMySubscriptions)
//const [isInishialArrOfFriends, setIsInishialArrOfFriends] = React.useState(true)
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

React.useEffect(() => {
  getAllSubscriptions(userId) //(получить все свои подписки)
}, []);

React.useEffect(() => {
  setUsersAfterFilter(allMySubscriptions)
  //console.log(isInishialArrOfFriends)
}, []);

const handleSearchInputChange = (e) => {
  setKeyWord(e.target.value)
  setError(false)
}

function handleSubmit (e) {
  e.preventDefault();
  if (!keyWord) {
    setError(true)
    setErrorMessage(translatedContext.errors.pleaseEnterTheKeyword)
    setTimeout(() => {
      setErrorMessage('');
    }, "2000");
  } else {
    setError(false)
    //setIsInishialArrOfFriends(false)
    filterAllFriends(allMySubscriptions, keyWord)
  }  
}

function filterAllFriends(allMySubscriptions, keyWord) {
  const allMySubscriptionsAfterFilter = filterItems(allMySubscriptions, keyWord)
  setUsersAfterFilter(allMySubscriptionsAfterFilter)
}

function filterItems(friends, keyWord) {
return friends.filter((item) => {
  return (
    item.subscriberName
    .toLowerCase().indexOf(keyWord.toLowerCase()) > -1
  )
});
}

function showAllSubscriptions() {
  //setIsInishialArrOfFriends(false)
  setUsersAfterFilter(allMySubscriptions)
}

return (

  <div className='friendsSearching__container'>
    {isLoading? 
      <Preloader></Preloader>
    :
      (haveSubsriptions?
        <>
          <form className='friendsSearching__form' onSubmit={handleSubmit}>
            <input 
              className='AllMyFriendsPageAndSerching__input'
              onChange={handleSearchInputChange}
              >
            </input>
            {error?<span className='allfriendsSearching__error-message'>{errorMessage}</span>:<></>}
              <button 
                className='AllMyFriendsPageAndSerching__input-loop-btn'
                type='submit'
              ></button>
              <button 
                className='friendsSearching__input-all-btn'
                type='button'
                onClick={showAllSubscriptions}
              >{translatedContext.all}</button>
          </form>
          <p className='allfriendsSearching__title'>{translatedContext.mySubscriptionsList}</p>
            <AllFriendsField 
              allMySubsriptions={usersAfterFilter}
            />
        </>
      :
        <p>{translatedContext.hereYouWillSeeYourSubscriptions}</p>
      )
    }
  </div>  

)
}

export default AllMyFriendsPageAndSerching;

/*
    translatedContext.mySubscriptionsList: 'Мои подписки:',
    translatedContext.hereYouWillSeeYourSubscriptions:'Тут ты увидешь свои подписки',
    translatedContext.errors.: {
      translatedContext.errors.pleaseEnterTheKeyword:'Пожалуйста, введите ключевое слово',
    }, 
*/
/*{<form className='friendsSearching__form'>
<input className='friendsSearching__input'></input>
<button 
  className='friendsSearching__input-loop-btn'
  type='submit'
></button>
</form>}*/

//value={keyWord || "" || "All"}