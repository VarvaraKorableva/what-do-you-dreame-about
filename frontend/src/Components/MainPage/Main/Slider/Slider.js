import './Slider.css'
import dataSlider from './DataSlider';
import React from "react"

function Slider() {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const getNext = () => {
    const newIndex = (currentSlideIndex + 1) % dataSlider.length;
    setCurrentSlideIndex(newIndex);
  };

  const getPrev = () => {
    const newIndex = (currentSlideIndex - 1 + dataSlider.length) % dataSlider.length;
    setCurrentSlideIndex(newIndex);
  };

  return (
      <div className="slider__container">
        {dataSlider.map((item, index) => {
          return(
            <div key={item.id} className={`slide ${index === currentSlideIndex ? 'slide active-anim' : 'slide'}`}>

              <div className="offers__container">
                <p className="offers__title">{item.title}</p>
                <div className="offers__text-wrapper">
                  <img className="offers__pic" src={item.picture}></img>    
                  <div className="offers__text-container">
                    <p className="offers__text">{item.subTitle}</p>
                    <p className="offers__text">{item.text}</p>
                  </div>
                </div>  

              </div>
              <div className='slider-button__btn-container'>
                <button onClick={getPrev} className="slider-button__prev">Previous</button>
                <button onClick={getNext} className="slider-button__next">Next</button>
              </div>

              <div className="slide-container-btn">
                {dataSlider.map((slide, index) => (
               <span
                  key={slide.id}
                  className={`btn-slide ${index === currentSlideIndex ? 'btn-slide_active' : ''}`}
                  onClick={() => setCurrentSlideIndex(index)}
               ></span>
                ))}
              </div>

            </div>
          )
        })}
      </div>
  );
}

export default Slider;