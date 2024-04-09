import './slider.css'

const Slider = () => {
  return (
    <div className="slider-container">
      <div>
        <i className="bi bi-arrow-left-circle btnArrow slider-arrows"></i>
      </div>
      <div>
        <input type="text" className="date-input" value="09.04.2024" className="slider-input"/>
      </div>
      <div>
        <i className="bi bi-arrow-right-circle btnArrow slider-arrows"></i>
      </div>
    </div>
  )
}

export default Slider

