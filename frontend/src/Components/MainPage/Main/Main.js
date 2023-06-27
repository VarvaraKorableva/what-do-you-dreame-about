import React from 'react'
import './Main.css'
import backgroundImg from '../../../images/mainpic.png'

function Main({}) {


  return ( 
    <div className="main__container">
        <img src={backgroundImg} className="main__pic"></img>
        <h1 className="main__title">What-do-you-dreame-about ?</h1>
    </div>
  );
}

export default Main;