import React from "react"
import Slider from './Main/Slider/Slider'
import Main from './Main/Main'
import Promo from './Main/Promo/Promo'
import Conclusion from './Main/Conclusion/Conclusion'

function MainPage( {isLoggin} ) {

  return (
    <>
      <Main 
        isLoggin={isLoggin}
      />      
      <Promo></Promo>
      <Slider></Slider>
      <Conclusion></Conclusion>
    </>
  );
}

export default MainPage;

