
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import './App.css'
import * as Api from './Api/Api'
import MyPage from './Components/MyPage/MyPage'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import Registration from './Components/Registration/Registration'
import MyFriendsPage from './Components/Friends/MyFriendsPage/MyFriendsPage'
import AllMyFriendsPageAndSerching from './Components/Friends/AllMyFriendsPageAndSerching/AllMyFriendsPageAndSerching'
//import FriendsDreamsSlider from './Components/Friends/FriendsDreamsSlider/FriendsDreamsSlider'
import Login from './Components/Login/Login'
import FriendsSearching from './Components/Friends/ FriendsSearching/FriendsSearching'
import AddAvatarPopap from './Components/Popups/AddAvatarPopap/AddAvatarPopap'
import ChangeMyProfile from './Components/ChangeMyProfile/ChangeMyProfile'
import AddDreamPopup from './Components/Popups/AddDreamPopup/AddDreamPopup'
import ImagePopup from './Components/Popups/ImagePopup/ImagePopup'
import MotanOpenPopap from './Components/Popups/MotanOpenPopap/MotanOpenPopap'
import AddNewDatePopap from './Components/Popups/AddNewDatePopap/AddNewDatePopap'
import PopapChangeAvatar from './Components/Popups/PopapChangeAvatar/PopapChangeAvatar'
import MyImportantDatesPage from './Components/MyImportantDatesPage/MyImportantDatesPage'
import MyFriendsImportantDatesPage from './Components/Friends/MyFriendsImportantDatesPage/MyFriendsImportantDatesPage'
import useWindowDimensions from './hook/useWindowDimensions'
import axios from 'axios';

function App() {

  const [isAddAvatarPopap, setIsAddAvatarPopap] = React.useState(false)
  const [isAddDreamPopup, setIsAddDreamPopup] = React.useState(false)
  const [isAddNewDatePopup, setIsAddNewDatePopup] = React.useState(false)
  const [isChangeAvatarPopup, setIsChangeAvatarPopup] = React.useState(false)
  const [isLoggin, setIsLoggin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})
  const [dreams, setDreams] = React.useState([])
  const [importantDates, setImportantDates] = React.useState([])
  const [friends, setFriends] = React.useState([])
  const [selectedDream, setSelectedDream] = React.useState({})
  const [selectedMotan, setSelectedMotan] = React.useState({})
  const [limit, setLimit] = React.useState(0)
  const [amount, setAmount] = React.useState(0)
  const [allMySubscriptions,setAllMySubscriptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorLoginMessage, setErrorLoginMessage] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const [isLoginError, setIsLoginError] = React.useState(false)
  

  const userId = currentUser._id

  const navigate = useNavigate()

// Изменить настройки по умолчанию
  axios.defaults.maxContentLength = 3 * 1024 * 1024;
// Создать экземпляр axios с настройками по умолчанию
  const instance = axios.create({
    maxContentLength: 5 * 1024 * 1024,
    withCredentials: true,
  });
 
  const { width } = useWindowDimensions()

  const getLimit = () => {
    if (width <= 700 && width > 450) {
      setLimit(6);
      setAmount(3)
    } else if (width <= 450) {
      setLimit(4);
      setAmount(4)
    } else {
      setLimit(6);
      setAmount(3)
    }
  };

  const addDreams = () => setLimit(limit + amount);

  React.useEffect(getLimit, [width]);

  function handleRegSubmit(userData) {
    Api.register({
      password: userData.password,
      email: userData.email,
      name:userData.name
    })
    .then(() => {
      Api.getContent()
      .then((data) => {
        setCurrentUser(data.user)
      })  
    })
    .then(() => {
      setDreams([]);
    }) 
    .then(() => {
      setIsAddAvatarPopap(true)
    })
    .catch((err) => {
      if (err.status === 409 || 11000) {
        setIsError(true)
        setErrorMessage('Error, such Email already exists.');
      } else {
        setIsError(true)
        setErrorMessage('The server encountered an error. Please try again later.')
        setTimeout(function(){
          setErrorMessage('');
          setIsError(false)
        }, 5000)
      }
    })
  }
    function handleLoginSubmit(userData){
      Api.authorize({
        password: userData.password, 
        email: userData.email
      })
      .then (() => {
        Api.getContent()
          .then((data) => {
            setCurrentUser(data.user)
            const userId = data.user._id
            navigate(`/users/${userId}`)
            setIsLoggin(true)
          })
      })  
      .then (() => {
        Api.getInitialMyDreams()
          .then((dreams) => {
            setDreams(dreams.data);
          })
      })
      /*.then(() => {
        Api.getMyDates()
          .then((res)=> {
            setImportantDates(res.data)
          })
      })*/
      .catch((err) => {
        console.log(err)
        if (err.status === 401 || 11000) {
          setIsLoginError(true)
          setErrorLoginMessage('One of the two does not fit.');
          setTimeout(function(){
            setErrorLoginMessage('')
            //setIsLoginError(false)
          }, 4000)
        } else {
          setIsLoginError(true)
          setErrorLoginMessage('The server encountered an error. Please try again later.')
          setTimeout(function(){
            setErrorLoginMessage('')
            //setIsLoginError(false)
          }, 5000)
        }
        //401
      })
  }

  function handleUpdateAvatar(formData) {
    instance.patch('http://localhost:3000/upload', formData)
    .then(() => {
      Api.getContent()
      .then((data) => {
        setCurrentUser(data.user)
      })  
    })
    .then(() => {
      closeAllPopups()
    }) 
    .catch(error => {
      console.log(error)
    })
    /*.finally(() => {
        
    })*/
  }

  function handleAddAvatar(formData) {
    instance.post('http://localhost:3000/upload', formData)
    .then(() => {
      Api.getContent()
      .then((data) => {
        setCurrentUser(data.user)
      })  
    })
    .then(() => {
      setIsLoggin(true)
      navigate(`/users/${userId}`)
    })
    .then(() => {
      closeAllPopups()
    }) 
    .catch(error => {
      console.log(error)
    });
      /*.finally(() => {
        setShowLoading(false);
    })*/
  }

  function signOut(){
    Api.signOut() 
      .then((res) => {
        setIsLoggin(false)
        setCurrentUser({});
        setImportantDates([])
        setAllMySubscriptions([])
        setFriends([])
        navigate('/signin')
      })
      .catch((err) => {
        console.log(err)
        setIsLoggin(false)
      })
  } 
  
  function handleAddDreamClick(){
    setIsAddDreamPopup(true)
  } 

  function handleAddNewDateClick(){
    setIsAddNewDatePopup(true)
  } 

  function handleChangeAvatarClick(){
    setIsChangeAvatarPopup(true)
  }
  
  function closeAllPopups() {
    setIsAddAvatarPopap(false)
    setIsAddDreamPopup(false)
    setIsChangeAvatarPopup(false)
    setIsAddNewDatePopup(false)
    setSelectedDream({})
    setSelectedMotan({})
  }

  function getMyImportantDates() {
    setIsLoading(true)
    Api.getMyDates()
      .then((res)=> {
        setImportantDates(res.data)
        console.log(importantDates)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //deleteDate
  const handleDeleteMyImportantDate = (date) => {
    setIsLoading(true)
    Api.deleteDate(date._id)
      .then(() => {
        Api.getMyDates()
          .then((res) => {
            setImportantDates(res.data);
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddNewDateSubmit(data) {
    setShowLoading(true);
    Api.addMyNewDate(data)
    .then((res) => {
      setImportantDates([res, ...importantDates]);
      //setImportantDates({ ...importantDates, [res.id]: res });
      //setImportantDates([res, ...Array.from(importantDates)]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setShowLoading(false);
    })
  }
  /*
  function handleAddDreamSubmit(formData) {
    Api.addMyDream(formData)
      .then((res) => {
        setDreams([res, ...dreams]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }*/

  function handleAddDreamSubmit(formData) {
    axios.post('http://localhost:3000/dreams', formData, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        setDreams([res.data, ...dreams]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDeleteDream = (dream) => {
    Api.deleteDream(dream._id)
      .then(() => {
        Api.getInitialMyDreams()
          .then((dreams) => {
            setDreams(dreams.data);
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleGetUsersSubmit() {
    //setShowLoading(true);
    Api.getUsers()
      .then((res) => {
        setFriends(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setShowLoading(false);
      })
  }


function handleDreamClick(dream) {
  setSelectedDream(dream);
}

function handleMotanClick(motan) {
  setSelectedMotan(motan);
}

function changeUserInfoSubmit(userData) {
  Api.changeUserInfo({
    name: userData.name,
    birthday: userData.birthday,
  })
    .then((data) => {
      setCurrentUser({
        ...currentUser,
        name: userData.name,
        birthday: userData.birthday,
      });
      /*setProfileError(false)
      setChangeProfileMessage('Изменения внесены')
      setTimeout(function(){
        setChangeProfileMessage('');
      }, 5000)*/
    })
    .catch((err) => {
      console.log(err)
      /*setProfileError(true)
      if (err.status === 409 || 11000) {
        setErrorChangeProfileMessage('Ошибка, такой Email уже существует.')
        setTimeout(function(){
          setErrorChangeProfileMessage('');
      }, 2000)
      } else {
        setErrorChangeProfileMessage('На сервере произошла ошибка.')
        setTimeout(function(){
          setErrorChangeProfileMessage('');
        }, 5000)
      }*/
    })
}

//Подписки

function addSubscribe(subscriberId, userId) {
  Api.subscribe(subscriberId, userId)
  .then((res) => {
    setAllMySubscriptions([res, ...allMySubscriptions]);
  })
  .catch((err) => {
    console.log(err)
  })
}

function getAllSubscriptions(userId) {
  setShowLoading(true)
  //setIsLoading(true)
  Api.getAllSubscriptions(userId)
  .then((res)=> {
    setAllMySubscriptions(res.transformedSubscriptions)
    console.log(allMySubscriptions)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
  setShowLoading(false)
  //setIsLoading(false)
  })
}

function deleteSubscription(subscriptionId) {
  return Api.deleteSubscription(subscriptionId)
    .then(() => {
      console.log("Subscription deleted successfully");
    })
    .then(() => {
      setAllMySubscriptions((state) => state.filter((item) => item._id !== subscriptionId))
    })
    .catch((err) => {
      console.log("Error deleting subscription:", err);
    });
}

  return (
    
    <CurrentUserContext.Provider value={currentUser}>  
    <div className='App'>

      <Header
        isLoggin={isLoggin}
        signOut={signOut}
      />

      <Routes>

        <Route
        path="/signup"
        element={
        <Registration
        onRegister={handleRegSubmit}
        errorMessage={errorMessage}
        isError={isError}
        />
        }>
        </Route>

        <Route
        path="/signin"
        element={
        <Login
          onSubmit={handleLoginSubmit}
          errorLoginMessage={errorLoginMessage}
          isLoginError={isLoginError}
        />
        }>
        </Route>

        <Route
        exact path={`/users/${userId}`}
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <MyPage
              addPopupOpen={handleAddDreamClick}
              OnDeleteMyDream={handleDeleteDream}
              dreams={dreams}
              onCardClick={handleDreamClick}
              onImgToChangeAvatar={handleChangeAvatarClick}
              addDreams={addDreams}
              limit={limit}
              //getMyImportantDates={getMyImportantDates}
              
            />
          </ProtectedRoute>
        }>
        </Route>  
        
        <Route 
        path='/users/:id' 
        element={
          <MyFriendsPage
            friends={friends}
            isLoggin={isLoggin}
            onFriendCardClick={handleMotanClick}
            addSubscribe={addSubscribe}
            getAllSubscriptions={getAllSubscriptions}
            allMySubscriptions={allMySubscriptions}
            deleteSubscription={deleteSubscription}
            showLoading={showLoading}
          />
        }>
        </Route>

        <Route
        path="/users"  ///Searching
        element={
        <FriendsSearching
          friends={friends}
          handleGetUsersSubmit={handleGetUsersSubmit}
        />
        }>
        </Route>

        <Route
        path="/my-subscriptions"  ///Searching (MY!!!)
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <AllMyFriendsPageAndSerching
              getAllSubscriptions = {getAllSubscriptions}
              allMySubscriptions={allMySubscriptions}
              friends={friends}
              handleGetUsersSubmit={handleGetUsersSubmit}
              isLoading={isLoading}
            />
          </ProtectedRoute>
        }>
        </Route>

        <Route
        path="/change-my-profile"
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <ChangeMyProfile
              onChangeSubmit={changeUserInfoSubmit}
            />
          </ProtectedRoute>
        }>
        </Route>

        <Route
        path={`/users/${userId}/dates`}
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <MyImportantDatesPage
              addPopupOpen={handleAddNewDateClick}
              importantDates={importantDates} //только мои даты
              getMyImportantDates={getMyImportantDates} //получение только моих дат
              isLoading={isLoading}
              onDelete={handleDeleteMyImportantDate}
            />
          </ProtectedRoute>
        }>
        </Route>

        <Route 
        path='/users/:id/dates' 
        element={
          <MyFriendsImportantDatesPage
        />
        }>
        </Route>

        <Route
        path="*"
        element={
          <NotFoundPage />
        }>
        </Route>

      </Routes>

    <AddAvatarPopap 
      isOpen={isAddAvatarPopap}
      onClose={closeAllPopups}
      handleAddAvatar={handleAddAvatar}/>

    <AddDreamPopup
      isOpen={isAddDreamPopup}
      onClose={closeAllPopups}
      onAddDream={handleAddDreamSubmit}
    />  

    <ImagePopup 
      dream={selectedDream}
      onClose={closeAllPopups}
    />

    <MotanOpenPopap
      motan={selectedMotan}
      onClose={closeAllPopups}
    />

    <PopapChangeAvatar
      onClose={closeAllPopups}
      isOpen={isChangeAvatarPopup}
      handleUpdateAvatarSubmit={handleUpdateAvatar}
    />

    <AddNewDatePopap
      isOpen={isAddNewDatePopup}
      onClose={closeAllPopups}
      onAddDate={handleAddNewDateSubmit}
    />

    <Footer/>
    </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;


/*
<Route
        exact path="/my-page"
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <MyPage
              addPopupOpen={handleAddDreamClick}
              OnDeleteMyDream={handleDeleteDream}
              dreams={dreams}
              onCardClick={handleDreamClick}
              onImgToChangeAvatar={handleChangeAvatarClick}
              addDreams={addDreams}
              limit={limit}
            />
          </ProtectedRoute>
        }>
        </Route>  


*/