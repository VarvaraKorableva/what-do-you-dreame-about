import React from 'react'
import './MyImportantDatesPage.css'
import DatesField from './DatesField/DatesField'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Preloader from '../Preloader/Preloader'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/MyPageLanguageData'

function MyImportantDatesPage({ isLoading, addPopupOpen, getMyImportantDates, importantDates, onDelete }) {

  const currentUser = React.useContext(CurrentUserContext)
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

  React.useEffect(() => {
    getMyImportantDates(userId) 
  }, []);

const isDates = importantDates.length === 0
{/*<Preloader></Preloader>*/}
  return (
    <section className='my-important-dates'>
      {isLoading?
        <p className='myImportantDatesPage__loading'>Loading...</p>
      :  
        <>
          {isDates?

            <h2 className='myImportantDatesPage__message'>{translatedContext.MyImportantDatesPage.message}
            </h2>
          :
            <DatesField 
              importantDates={importantDates}
              onDelete={onDelete}
            />
          }
          <button 
            className='my-important-dates__add-btn'
            onClick={addPopupOpen}
          >
          {translatedContext.MyImportantDatesPage.addButton}
          </button>
        </>
      }
    </section>
  );
}


export default MyImportantDatesPage; 

/*
    translatedContext.MyImportantDatesPage: {
       translatedContext.MyImportantDatesPage.message: 'Вы можете добавить значимые события для себя, и тогда ваши друзья будут знать, когда все еще есть причина для того чтобы исполнить вашу мечту.',
        translatedContext.MyImportantDatesPage.addButton: 'Добавить значимую дату',
    }
*/