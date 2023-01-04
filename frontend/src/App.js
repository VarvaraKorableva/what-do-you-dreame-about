//import logo from './logo.svg'
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import './App.css'
import * as Api from './Api/Api'
import MyPage from './Components/MyPage/MyPage'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import Registration from './Components/Registration/Registration'
import MyFriendsPage from './Components/Friends/MyFriendsPage/MyFriendsPage'
import FriendsDreamsSlider from './Components/Friends/FriendsDreamsSlider/FriendsDreamsSlider'
import Login from './Components/Login/Login'
import FriendsSearching from './Components/Friends/ FriendsSearching/FriendsSearching'
import InfoTooltip from './Components/InfoTooltip/InfoTooltip'
import ChangeMyProfile from './Components/ChangeMyProfile/ChangeMyProfile'

function App() {

  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false)
  const [isLoggin, setIsLoggin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})
  const navigate = useNavigate()

  function handleRegSubmit(login){
    Api.register({
      password:login.password,
      email:login.email,
      name:login.name,
  })
    .then(() => {
      //setNoMistake(true)
      setIsInfoTooltip(true)
      setIsLoggin(true)
    }) 
    .catch((err) => {
      console.log(err)
    })
  }

  function handleLoginSubmit(password, email){
    Api.authorize(password, email)
      .then ((res) => {
        const token = res.token;
        Api.getContent(token)
          .then(() => {
            alert(res)
            //setCurrentUser(res.user)
            navigate('/my-page')
            setIsLoggin(true)
          })
      .catch((err) => {
        //setIsInfoTooltip(true)
        //setNoMistake(false)
        console.log(err)
      })
      })
  }

  function signOut(){
    setIsLoggin(false)
    //setUserEmail("")
    navigate('/sign-in');
  }  
/*
  function handleLoginSubmit(userData){
    Api.authorize({
      password:userData.password,
      email:userData.email,
    })
    .then ((res) => {
      
      navigate('/my-page')
      
      setLoggedIn(true)
      setLogError(false)
    })
    .catch((err) => {
      console.log(err)
      setLoggedIn(false)
      setLogError(true)
      if (err.status === 401 || 404 ) {
        setErrorMessage('Вы ввели неправильный логин или пароль.')
        setTimeout(function(){
          setErrorMessage('');
        }, 5000)
      } else {
        setErrorMessage('На сервере произошла ошибка.')
        setTimeout(function(){
          setErrorChangeProfileMessage('');
        }, 5000)
        }
    })
  }  */
  
/*
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  
  const [isAddDreamPopupOpen, setIsAddDreamPopupOpen] = React.useState(false);

  function handleAddDreamClick() {
    setIsAddDreamPopupOpen(true);
  }

  function handleDeleteDreamClick() {
    setIsDeletePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
*/
  function closeAllPopups() {
    /*setIsEditAvatarPopupOpen(false)
    setIsAddDreamPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsDeletePopupOpen(false)*/
    setIsInfoTooltip(false)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>  
    <div className='App'>
      <Header
        isLoggin={isLoggin}
        signOut={signOut}/>
      <Routes>

        <Route
        path="/sign-up"
        element={
        <Registration
        onRegister={handleRegSubmit}
        />
        }>
        </Route>

        <Route
        path="/sign-in"
        element={
        <Login
          onSubmit={handleLoginSubmit}
        />
        }>
        </Route>

        <Route
        exact path="/my-page"
        element={
        <MyPage/>
        }>
        </Route> 

        <Route
        exact path="/my-friend-page"
        element={
        <MyFriendsPage/>
        }>
        </Route> 

        <Route 
        path='/my-friend-page/:userId' 
        element={<MyFriendsPage/>
        }>
        </Route>

        <Route
        path="/my-friends-full-dreams"
        element={
        <FriendsDreamsSlider/>
        }>
        </Route>

        <Route
        path="/friends-searching"
        element={
        <FriendsSearching/>
        }>
        </Route>

        <Route
        path="/change-my-profile"
        element={
        <ChangeMyProfile/>
        }>
        </Route>


    
      </Routes>

    <InfoTooltip 
      isOpen={isInfoTooltip}
      onClose={closeAllPopups}/>

    <Footer/>
    </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
/*
        <Route
        path="*"
        element={
        <NotFoundPage />
        }>
        </Route>*/