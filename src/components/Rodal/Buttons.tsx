import CircularProgressTimer from "../Loader/CircleProgres";
interface ButtonProps {
  onClick: () => void;
  buttonText?: string;
  time: number;
  remainingTime: number;
  progress: boolean;
}

export const ButtonX: React.FC<ButtonProps> = ({onClick, buttonText}) => {
  return (
    <button 
      style={buttonXStyle}
      onClick={onClick}  
    >
        <div
          
        >{buttonText}</div>
        
    </button>
    
  )
}

export const ButtonOk: React.FC<ButtonProps> = ({onClick, buttonText}) => {
  return (
    <button 
      style={buttonOkStyle}
      onClick={onClick}
    >
        <div>{buttonText}</div>

    </button>
  )
}

export const ButtonAccept: React.FC<ButtonProps> = ({onClick, buttonText, time, remainingTime, progress}) => {
  return (
    <button 
      style={buttonOkStyle}
      onClick={onClick}
    >
        <div>{buttonText}</div>
        
          {progress
            ? <div
                style={{marginLeft: "10px"}}
              >
                <CircularProgressTimer 
                  time={time} 
                  remainingTime={remainingTime} />
              </div>
            : null
            // <svg 
            //     style={svgXStyle} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
            //     <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
            //   </svg>
          }
        
    </button>
  )
}

// Основний об'єкт зі спільними властивостями
const buttonBaseStyle = {
  border: '2px solid',
  borderRadius: '5px',
  padding: '10px',
  fontSize: '1.6rem',
  lineHeight: '2.5rem',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: "20px 0px 20px 0px",
  width: '45%',
  height: 'auto',
};

const buttonXStyle = {
  ...buttonBaseStyle, 
  border: '2px solid #1f7a1f',
  backgroundColor: '#1f7a1f',
  
};

const buttonOkStyle = {
  ...buttonBaseStyle, 
  border: '2px solid #1f7a1f',
  backgroundColor: '#1f7a1f',
};


