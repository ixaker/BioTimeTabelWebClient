import { useState } from 'react'
import './slider.css'


interface SliderProps {
    handleSliderClick: (arg: { number: number }) => void;
    date: string;
  }

const Slider: React.FC<SliderProps>= ({ handleSliderClick, date }) => {
    const [number, setNumber] = useState(1);
    
    const handleLeftArrowClick = () => {
        setNumber(1); 
        console.log(number);
        
        handleSliderClick({number: 1}) 
         };
    
      const handleRightArrowClick = () => {
        setNumber(2);
        console.log(number);

        handleSliderClick({number: 2})
      };

    return (
    <>
        <div className="slider-container">
            <div>
                <i className="bi bi-arrow-left-circle btnArrow slider-arrows" onClick={handleLeftArrowClick}></i>
            </div>
            <div>
                <input type="text" className="date-input slider-input" value={date}/>
            </div>
            <div>
                <i className="bi bi-arrow-right-circle btnArrow slider-arrows" onClick={handleRightArrowClick}></i>
            </div>
        </div>
        
    </>
    )
}

export default Slider

