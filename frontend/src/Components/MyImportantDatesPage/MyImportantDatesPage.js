import React from 'react'
import './MyImportantDatesPage.css'
import DatesField from './DatesField/DatesField'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { useParams } from 'react-router-dom';


function MyImportantDatesPage({ getMyImportantDates, addPopupOpen, importantDates }) {

  const currentUser = React.useContext(CurrentUserContext)
  const userId = currentUser._id
  let { id } = useParams();
  const [isDates, setIsDates] = React.useState(false)
  const [isCurrentUser, setIsCurrentUser] = React.useState(false)

  function checkUser () {
      if(id){
        setIsCurrentUser(false)
        
      }else {
        setIsCurrentUser(true)
      }
  }

  React.useEffect(() => {
    checkUser();
 }, [id]);

  function checkArr () {
    if(importantDates){
      return setIsDates(true)
    }else {
      setIsDates(false)
    }
  }

  React.useEffect(() => {
    checkArr()
  }, [isDates]);


/*
  if (!importantDates) {
    return <div>Loading...</div>;
  };*/

  return (
    <>
    {isCurrentUser?
      <section className='my-important-dates'>
        {isDates?
          <DatesField 
            importantDates={importantDates}
          />
        :
          <h2>You can add significant events for yourself, 
          and then people will know when there is still a reason 
          for your dream to come true. 
          </h2>
        }
      
        <button 
          className='my-important-dates__add-btn'
          onClick={addPopupOpen}
        >
          Add new important date
        </button>
    </section>
    :
    <></>
  }
  </>
  );
}


export default MyImportantDatesPage; 