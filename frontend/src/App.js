//import logo from './logo.svg'
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
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
import AddDreamPopup from './Components/Popups/AddDreamPopup/AddDreamPopup'
import ImagePopup from './Components/Popups/ImagePopup/ImagePopup'
import MotanOpenPopap from './Components/Popups/MotanOpenPopap/MotanOpenPopap'
import PopapChangeAvatar from './Components/Popups/PopapChangeAvatar/PopapChangeAvatar'
import useWindowDimensions from './hook/useWindowDimensions'

function App() {

  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false)
  const [isAddDreamPopup, setIsAddDreamPopup] = React.useState(false)
  const [isChangeAvatarPopup, setIsChangeAvatarPopup] = React.useState(false)
  const [isLoggin, setIsLoggin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})
  const [dreams, setDreams] = React.useState([])
  const [friends, setFriends] = React.useState([])
  const [motanots, setMotanots] = React.useState([]) 
  const [selectedDream, setSelectedDream] = React.useState({})
  const [selectedMotan, setSelectedMotan] = React.useState({})
  const [limit, setLimit] = React.useState(0)
  const [amount, setAmount] = React.useState(0)
  const [isLength, setIsLength] = React.useState(false)
  const { width } = useWindowDimensions()
  //const [user, setUser] = React.useState({})
  const navigate = useNavigate()

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

  function handleRegSubmit(login){
    Api.register({
      password:login.password,
      email:login.email,
      name:login.name,
  })
    .then(() => {
      Api.getContent()
      .then((data) => {
        setCurrentUser(data.user)
      })  
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
        /*const token = res.token;
        Api.getContent(token)
          .then((data) => {
            setCurrentUser(data.user)
            //setUser(res.user)
            //navigate('/user/:_id')
            navigate('/my-page')
            setIsLoggin(true)
        })*/
        Api.getContent()
          .then((data) => {
            setCurrentUser(data.user)
            //setUser(res.user)
            //navigate('/user/:_id')
            setIsInfoTooltip(true)
            navigate('/my-page')
            setIsLoggin(true)
        })
        Api.getInitialMyDreams()
          .then((dreams) => {
            setDreams(dreams.data);
        })  
      .catch((err) => {
        //setIsInfoTooltip(true)
        //setNoMistake(false)
        console.log(err)
      })
      })
  }

  function handleUpdateAvatar(data) {
    //setShowLoading(true);
    Api.updateUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      /*.finally(() => {
        setShowLoading(false);
    })*/
  }
/*
  React.useEffect(() => {
    Api.getUserInfo()
    .then((data) => {
      setCurrentUser(data.user);
    })
    .catch((err) => {
      console.log(err);
    });
  },[isLoggin]);*/

  function signOut(){
    Api.signOut() 
      .then((res) => {
        setIsLoggin(false)
        setCurrentUser({});
        console.log(currentUser)
        navigate('/signin')
        //тут должен быть не редирект а изменение статуса на не юзера, должен измениться вид
        //типо просматриваешь без регистрации?
      })
      .catch((err) => {
        console.log(err)
        setIsLoggin(false)
      })
  } 

  function handleAddDreamClick(){
    setIsAddDreamPopup(true)
  } 

  function handleChangeAvatarClick(){
    setIsChangeAvatarPopup(true)
  }
  
  function closeAllPopups() {
    /*setIsEditAvatarPopupOpen(false)
    setIsAddDreamPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsDeletePopupOpen(false)*/
    setIsInfoTooltip(false)
    setIsAddDreamPopup(false)
    setIsChangeAvatarPopup(false)
    console.log('button close')
    setSelectedDream({})
    setSelectedMotan({})
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
  //перенесла ее в соответствующий компонент-френдс серчинг
/*
  function handleGetUsersSubmit() {
    Api.getUsers()
      .then((res) => {
        const users = res.data
        //localStorage.setItem('users', users)
        console.log(users)
        //localStorage.setItem('users', JSON.stringify(users))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setShowLoading(false);
      })
  }  */
/*
  React.useEffect(() => {
    Api.getInitialMyDreams()
    .then((dreams) => {
      setDreams(dreams.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[isLoggin]);*/


  function handleGetUsersSubmit() {
    Api.getUsers()
      .then((res) => {
        //const data = res.data
        //console.log(res.data)
        setFriends(res.data)
        //localStorage.setItem('users', users)
       
        //localStorage.setItem('users', JSON.stringify(users))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setShowLoading(false);
      })
  }

  function checkArray() {
    if(motanots.length) {
      return setIsLength(true)
    } else {
      setIsLength(false)
    }
  } 

  ///переписать не на текущего юзера, а на юзера с айди
  function handleGetOneUserDreamsSubmit(_id) {
  Api.getOneFriendDreams(_id) 
  .then((res) => {
    console.log(res.data)
    checkArray()
    setMotanots(res.data)
  })
  .catch((err) => {
    console.log(err)
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
        avatar: userData.avatar,
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
        
        <Route 
        path='/friends/:id' 
        element={
          <MyFriendsPage
            friends={friends}
            motanots={motanots}
            isLength={isLength}
            handleMotanClick={handleMotanClick}
          />
        }>
        </Route>

        <Route
        path="/my-friends-full-dreams"
        element={
        <FriendsDreamsSlider/>
        }>
        </Route>

        <Route
        path="/friends"  ///Searching
        element={
        <FriendsSearching
        friends={friends}
        handleGetUsersSubmit={handleGetUsersSubmit}
        handleGetOneUserDreamsSubmit={handleGetOneUserDreamsSubmit}/>

        }>
        </Route>

        <Route
        path="/change-my-profile"
        element={
        <ChangeMyProfile
          onChangeSubmit={changeUserInfoSubmit}/>
        }>
        </Route>

        <Route
        path="*"
        element={
        <NotFoundPage />
        }>
        </Route>

    
      </Routes>

    <InfoTooltip 
      isOpen={isInfoTooltip}
      onClose={closeAllPopups}/>

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

    <Footer/>
    </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
/*
background-color: rgb(6, 104, 71, 0.4);
*/