//import logo from './logo.svg'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
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

  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);

  //register = password, email, name
  function handleRegSubmit(login){
    Api.register({
      password:login.password,
      email:login.email,
      name:login.name,
  })
    .then(() => {
      //setNoMistake(true)
      setIsInfoTooltip(true)
    }) 
  /*  .then((res) => {
      history.push('/signin');
    })*/
    .catch((err) => {
      console.log(err)
    })
  }
  
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
    <div className='App'>
      <Header/>
      <Routes>

        <Route
        exact path="/sign-up"
        element={
        <Registration
        onRegister={handleRegSubmit}
        />
        }>
        </Route>

        <Route
        exact path="/sign-in"
        element={
        <Login/>
        }>
        </Route>

        <Route
        path="/my-page"
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
        exact path="/my-friends-full-dreams"
        element={
        <FriendsDreamsSlider/>
        }>
        </Route>

        <Route
        exact path="/friends-searching"
        element={
        <FriendsSearching/>
        }>
        </Route>

        <Route
        exact path="/change-my-profile"
        element={
        <ChangeMyProfile/>
        }>
        </Route>

        <Route
        exact path="*"
        element={
        <NotFoundPage />
        }>
        </Route>
    
      </Routes>

    <InfoTooltip 
      isOpen={isInfoTooltip}
      onClose={closeAllPopups}/>

    <Footer/>
    </div>
  );
}

export default App;
