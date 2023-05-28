
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import {useGetMyDatesQuery} from './redux'
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

  const userId = currentUser._id

  const navigate = useNavigate()

  //const {data = [], isloading} = useGetMyDatesQuery();
  
  
  //if (isloading) return <h1>Loading...</h1>

  
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

  function handleRegSubmit(values) {
    Api.register({
      password: values.password,
      email: values.email,
      name: values.name,
    })
    .then(() => {
      setIsAddAvatarPopap(true)
    })
    .then(() => {
      Api.getContent()
      .then((res) => {
        setCurrentUser(res.user)
      })  
    })
    .then(() => {
        setDreams([]);
    }) 
    .then(() => {
      setIsLoggin(true)
      navigate(`/users/${userId}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

    function handleLoginSubmit(password, email){
      Api.authorize(password, email)
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
      .then(() => {
        Api.getMyDates()
          .then((res)=> {
            setImportantDates(res.data)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
  function handleLoginSubmit(password, email){
    Api.authorize(password, email)
      .then ((res) => {
        Api.getContent()
          .then((data) => {
            setCurrentUser(data.user)
            //navigate('/my-page')
            const userId = data.user._id
            navigate(`/users/${userId}`)
            setIsLoggin(true)
        })
        Api.getInitialMyDreams()
          .then((dreams) => {
            setDreams(dreams.data);
        })
        
      })
      .than(() => {
        Api.getMyDates()
          .than((res)=> {
            setImportantDates(res.data)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  */
  
  
  function handleUpdateAvatar(formData) {
    instance.patch('http://localhost:3000/upload', formData)
    .then(response => {
      console.log('ok')
    })
    .then(() => {
      Api.getContent()
      .then((data) => {
        setCurrentUser(data.user)
        closeAllPopups()
      })  
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
        setImportantDates(null)
        console.log(currentUser)
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
  
  function handleAddNewDateSubmit(data) {
    //setShowLoading(true);
    Api.addMyNewDate(data)
      .then((res) => {
        setImportantDates([res, ...importantDates]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setShowLoading(false);
      })
  }
  
  function handleAddDreamSubmit(data) {
    //setShowLoading(true);
    Api.addMyDream(data)
      .then((res) => {
        setDreams([res, ...dreams]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setShowLoading(false);
      })
  }

  const handleDeleteDream = (dream) => {
    Api.deleteDream(dream._id)
      .then(() => {
        Api.getInitialMyDreams()
          .then((dreams) => {
            setDreams(dreams.data);
        })  
/*        setSavedMovies((movies) =>
          movies.filter((m) => m._id !== movie._id)
        )*/
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleGetUsersSubmit() {
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
  Api.changeUserInfo(userData)
    .then((data) => {
      setCurrentUser({
        ...currentUser,
        name: userData.name,
        about: userData.about,
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

function getMyImportantDates() {
  Api.getMyDates()
    .then((res)=> {
      setImportantDates(res.data)
    })
    .catch((err) => {
      console.log(err)
    });
}





//updateUserAvatar
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
        />
        }>
        </Route>

        <Route
        path="/signin"
        element={
        <Login
          onSubmit={handleLoginSubmit}
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
              getMyImportantDates={getMyImportantDates}
              
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
        path="/my-friends"  ///Searching (MY!!!)
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <AllMyFriendsPageAndSerching
              handleGetUsersSubmit={handleGetUsersSubmit}
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
              importantDates={importantDates}
              getMyImportantDates={getMyImportantDates}
             
            />
          </ProtectedRoute>
        }>
        </Route>

        <Route 
        path='/users/:id/dates' 
        element={
          <MyImportantDatesPage
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
      handleUpdateAvatar={handleUpdateAvatar}/>

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