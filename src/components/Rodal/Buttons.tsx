interface ButtonProps {
  onClick: () => void
}

export const ButtonX: React.FC<ButtonProps> = ({onClick}) => {
  return (
    <button 
      style={buttonXStyle}
      onClick={onClick}  
    >
        <div
          
        >відмінити</div>
        <svg 
          style={svgCheckStyle} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
          </svg>
    </button>
    
  )
}

export const ButtonOk: React.FC<ButtonProps> = ({onClick}) => {
  return (
    <button 
      style={buttonOkStyle}
      onClick={onClick}
    >
        <div>підтвердити</div>
        <svg 
          style={svgXStyle} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>

        </svg>
    </button>
  )
}

const svgCheckStyle = {
  height: '20px',
  width: '20px',
  marginLeft: '10px',
  color: 'white',
};

const svgXStyle = {
  height: '20px',
  width: '20px',
  marginLeft: '10px',
  color: "white"
};

const buttonXStyle = {
  border: '2px solid red',
  borderRadius: '5px',
  padding: '10px',
  fontSize: '20px', 
  backgroundColor: 'red',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'center',
  width: '200px',
  height: '50px',
  margin: "20px",
};

const buttonOkStyle = {
  border: '2px solid green',
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '20px', 
  backgroundColor: 'green',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'center',
  width: '200px',
  margin: "20px",
};