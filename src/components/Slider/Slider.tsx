import { useState } from 'react'
import './slider.css'
import 'animate.css/animate.min.css';

interface SliderProps {
    handleSliderClick: (update: 'increase' | 'decrease') => void;
    date: string;
  }

const Slider: React.FC<SliderProps>= ({ handleSliderClick, date }) => {
    const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);
    const [isRightArrowActive, setIsRightArrowActive] = useState(false);
    
    
    const handleLeftArrowClick = () => {
        console.log('handleLeftArrowClick');
        setIsLeftArrowActive(true);
        handleSliderClick('decrease')
        setTimeout(() => setIsLeftArrowActive(false), 300); 
         };
    
      const handleRightArrowClick = () => {
        console.log('handleRightArrowClick');
        setIsRightArrowActive(true);
        handleSliderClick('increase')
        setTimeout(() => setIsRightArrowActive(false), 300);
      };

    return (
    <>
        <div className="slider-container">
            <div className={`arrows-container ${isLeftArrowActive ? 'clicked' : ''}`}>
                <i className="bi bi-arrow-left-circle btnArrow slider-arrows" onClick={handleLeftArrowClick}></i>
            </div>
            <div className='slider-input-container'>
                <span className="date-input slider-input">{date}</span>
            </div>
            <div className={`arrows-container ${isRightArrowActive ? 'clicked' : ''}`}>
                <i className="bi bi-arrow-right-circle btnArrow slider-arrows" onClick={handleRightArrowClick}></i>
            </div>
        </div>
        
    </>
    )
}

export default Slider

