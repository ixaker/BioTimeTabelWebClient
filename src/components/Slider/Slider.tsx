import { useState } from "react";
import "./slider.css";
import "animate.css/animate.min.css";

interface SliderProps {
  handleSliderClick: (update: "increase" | "decrease") => void;
  date: string;
}

const Slider: React.FC<SliderProps> = ({ handleSliderClick, date }) => {
  const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);
  const [isRightArrowActive, setIsRightArrowActive] = useState(false);

  const handleLeftArrowClick = () => {
    console.log("handleLeftArrowClick");
    setIsLeftArrowActive(true);
    handleSliderClick("decrease");
    setTimeout(() => setIsLeftArrowActive(false), 300);
  };

  const handleRightArrowClick = () => {
    console.log("handleRightArrowClick");
    setIsRightArrowActive(true);
    handleSliderClick("increase");
    setTimeout(() => setIsRightArrowActive(false), 300);
  };

  return (
    <>
      <div className="slider-container">
        <div className={`arrows-container ${isLeftArrowActive ? "clicked" : ""}`} onClick={handleLeftArrowClick}>
          {/* <i className="bi bi-arrow-left-circle btnArrow slider-arrows" ></i> */}
          <svg
            className="left-arrow"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="4rem"
            width="4rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M249.38 336 170 256l79.38-80m-68.35 80H342"
            ></path>
            <path
              fill="none"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            ></path>
          </svg>
        </div>
        <div className="slider-input-container">
          <span className="date-input slider-input">{date}</span>
        </div>
        <div className={`arrows-container ${isRightArrowActive ? "clicked" : ""}`} onClick={handleRightArrowClick}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="4em"
            width="4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M262.62 336 342 256l-79.38-80m68.35 80H170"
            ></path>
            <path
              fill="none"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Slider;
