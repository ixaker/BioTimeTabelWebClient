import './slider.css'


interface SliderProps {
    handleSliderClick: (update: 'increase' | 'decrease') => void;
    date: string;
  }

const Slider: React.FC<SliderProps>= ({ handleSliderClick, date }) => {
    
    
    
    const handleLeftArrowClick = () => {
        console.log('handleLeftArrowClick');
        
        handleSliderClick('decrease') 
         };
    
      const handleRightArrowClick = () => {
        console.log('handleRightArrowClick');
        
        handleSliderClick('increase')
      };

    return (
    <>
        <div className="slider-container">
            <div>
                <i className="bi bi-arrow-left-circle btnArrow slider-arrows" onClick={handleLeftArrowClick}></i>
            </div>
            <div>
                <span className="date-input slider-input">{date}</span>
            </div>
            <div>
                <i className="bi bi-arrow-right-circle btnArrow slider-arrows" onClick={handleRightArrowClick}></i>
            </div>
        </div>
        
    </>
    )
}

export default Slider

