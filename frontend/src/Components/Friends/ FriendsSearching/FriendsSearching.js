import React from 'react'
import './FriendsSearching.css'
import FullFriendsField from '../FullFriendsField/FullFriendsField'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/AllMyFriendsPageAndSerching'

function FriendsSearching({handleGetUsersSubmit, friends}) {

  const [keyWord, setKeyWord] = React.useState('')
  const [error, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [usersAfterFilter, setUsersAfterFilter] = React.useState([])
  const [isSubmitClicked, setIsSubmitClicked] = React.useState(false)

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
    handleGetUsersSubmit()
  }, []);

  const handleSearchInputChange = (e) => {
    setKeyWord(e.target.value)
    setError(false)
  }

  function handleSubmit (e) {
    e.preventDefault()
    setIsSubmitClicked(true)
    if (!keyWord) {
      setError(true)
      setErrorMessage(translatedContext.errors.pleaseEnterTheKeyword)
      setTimeout(() => {
        setErrorMessage('');
      }, "2000")
      
    } else {
      setError(false)
      filterAllFriends(friends, keyWord)
    }  
  }

  function filterAllFriends(friends, keyWord) {
    const friendsAfterFilter = filterItems(friends, keyWord)
    setUsersAfterFilter(friendsAfterFilter)
  }

function filterItems(friends, keyWord) {
  return friends.filter((item) => {
    return (
      item.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1
    )
  });
}

return (
  <>

  <div className='friendsSearching__container'>
    <form className='friendsSearching__form' onSubmit={handleSubmit}>
      <span className='friendsSearching__clue'>Начинайте свой ввод</span>
      <input 
        className='friendsSearching__input'
        value={keyWord || ''}
        onChange={handleSearchInputChange}>
      </input>
      {error?<span className='friendsSearching__error-message'>{errorMessage}</span>:<></>}
       <button 
         className='friendsSearching__input-loop-btn'
         type='submit'
       >
      </button>
    </form>

  <FullFriendsField 
    friends={usersAfterFilter}
    isSubmitClicked={isSubmitClicked}
  />

  </div>  
  </>
)
}

export default FriendsSearching;