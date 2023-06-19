import React from 'react'
import './MyImportantDatesPage.css'
import DatesField from './DatesField/DatesField'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Preloader from '../Preloader/Preloader'

function MyImportantDatesPage({ isLoading, addPopupOpen, getMyImportantDates, importantDates, onDelete }) {

  const currentUser = React.useContext(CurrentUserContext)
  const userId = currentUser._id

  React.useEffect(() => {
    getMyImportantDates(userId) 
  }, []);

const isDates = importantDates.length === 0

  return (
    <section className='my-important-dates'>
      {isLoading?
        <Preloader></Preloader>
      :  
        <>
          {isDates?

            <h2>You can add significant events for yourself, 
            and then people will know when there is still a reason 
            for your dream to come true. 
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
          Add new important date
          </button>
        </>
      }
    </section>
  );
}


export default MyImportantDatesPage; 