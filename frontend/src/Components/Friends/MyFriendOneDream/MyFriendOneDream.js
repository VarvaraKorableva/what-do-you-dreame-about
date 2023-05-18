import './MyFriendOneDream.css';

function MyFriendOneDream({friendDream, onFriendCardClick}) {

  function handleClick() {
    onFriendCardClick(friendDream);
  }
  
  return ( 
    <div className="myFriendOneDream__container">
      <div className="myFriendOneDream__img-container">

        <img className="myFriendOneDream__img" 
          alt = {friendDream.name} 
          src = {friendDream.imgLink}
          onClick={handleClick}
      />
      </div>
      
      <div className="myFriendOneDream__inf-container">
        <p className="myFriendOneDream__inf">Name: {friendDream.name}</p>
        <p className="myFriendOneDream__inf">Price: {friendDream.price}</p>
        <a className="myFriendOneDream__inf myDream__inf-link" href={friendDream.imgLink} target='blank' >Link: {friendDream.imgLink}</a>
      </div>


    </div>
  );
}

export default MyFriendOneDream;