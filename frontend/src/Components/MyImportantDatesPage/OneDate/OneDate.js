import React from 'react'
import './OneDate.css';

function OneDate({date, onDelete}) {

  const [expanded, setExpanded] = React.useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  function handleDelete() {
    onDelete(date);
  }
  
  const formattedDate = new Date(date.date).toLocaleDateString('en-GB');
  
  return ( 
    <div className={`oneDate__container ${expanded ? 'oneDate__container__opened' : ""}`}>
        
        <button 
          className='oneDate__openBTN'
          type="button"
          onClick={handleClick}
          >
        </button>

        <p className="oneDate__inf-title" onClick={handleClick}>{date.name}</p>
        {expanded && (
        <div className="content">
          <p className="oneDate__inf">{formattedDate}</p>
          <p className="oneDate__inf">{date.description}</p>

          <div className='oneDate__BTN-container'>
            <button
              onClick={handleDelete}
              className='oneDate__delete-BTN'
              type="button"
            >
              Delete
            </button>
            {/*<button
             // onClick={handleDelete}
              className='oneDate__delete-BTN'
              type="button"
            >
              To correct
            </button>*/}
          </div>

        </div>
      )} 
    </div>
  );
}

export default OneDate;