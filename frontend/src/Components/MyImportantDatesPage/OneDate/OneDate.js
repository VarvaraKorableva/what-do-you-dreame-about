import React from 'react'
import './OneDate.css';

function OneDate({date, isCurrentUser}) {

  const [expanded, setExpanded] = React.useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  
  const formattedDate = new Date(date.date).toLocaleDateString('en-GB');
/*
  const dateToCorrect = new Date(date.date);
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDate = dateToCorrect.toLocaleDateString('en-US', options);*/
/*
  function handleDelete() {
    OnDeleteMyDream(dream);
  }

  function handleClick() {
    onCardClick(dream);
    console.log(dream._id)
  }*/
  
  return ( 
    <div className={`oneDate__container ${expanded ? 'oneDate__container__opened' : ""}`}>
        
        <button 
          className='oneDate__openBTN'
          type="button"
          onClick={handleClick}
          >
        </button>

        <p className="oneDate__inf-title">{date.name}</p>
        {expanded && (
        <div className="content">
          <p className="oneDate__inf">{formattedDate}</p>
          <p className="oneDate__inf">{date.description}</p>

        {isCurrentUser?

          <div className='oneDate__BTN-container'>
            <button
              //onClick={handleDelete}
              className='oneDate__delete-BTN'
              type="button"
            >
              Delete
            </button>
            <button
              //onClick={handleDelete}
              className='oneDate__delete-BTN'
              type="button"
            >
              To correct
            </button>
          </div>
        :
          <></>
        }
        </div>
      )} 
    </div>
  );
}

export default OneDate;