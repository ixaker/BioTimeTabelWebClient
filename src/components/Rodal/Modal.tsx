// ModalComponent.tsx
import { useState, useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useAppContext } from '../../State/AppProvider';
import { ButtonOk, ButtonX, ButtonAccept } from './Buttons';
import { sendTrueEvent,sendFalseEvent } from '../WebSocket/WebSocket';
import { messageText } from './messageTexts'
import { CSSProperties } from 'react';

const Modal: React.FC = () => {

  const { state, dispatch } = useAppContext();
  const { modal } = state;
  const { visible, data } = modal;
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let closeTimer: NodeJS.Timeout;
    if (visible) {
      setShowModal(false);
      setTimeout(() => {
        setShowModal(true);
        setRemainingTime(60);
      }, 200);

      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      closeTimer = setTimeout(() => {
        onClose();
      }, 600000);
    } else {
      setShowModal(false);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };

  }, [visible, data]);


  const onClose = () => {
    console.log('onClose start');
    
    console.log({ visible: false, data: modal.data });
    dispatch({ type: 'SET_MODAL', payload: { visible: false, data: modal.data } });
  };

  const commonStyles: CSSProperties = {
    borderRadius: "10px",
    padding: "10px",
    paddingTop: "10px", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '90%',
    maxWidth: "700px",
    backgroundColor: "white",
    height: "fit-content",
  };
  
  const customStyles: CSSProperties = {
    ...commonStyles,
    border: data.error ? "10px solid red" : "10px solid green",
    animation: data.error ? "blinkingBackground 0.3s infinite alternate" : undefined, // При потребі вказати інше значення для animation
    
  };

  return (
    <Rodal
      visible={showModal}
      onClose={onClose}
      leaveAnimation="zoom"
      duration={300}
      closeOnEsc
      showCloseButton
      enterAnimation='zoom'
      showMask
      customStyles={customStyles}
      customMaskStyles={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      
    >
      <div style={modalContainer}>
        <p style={titleStyles}>
          {data.state} -  {data.time}
        </p>
        <p style={nameStyles}>{data.first_name}</p>
        <p style={messageStyles} >
          {data.error ? messageText[data.errorType]?.message : null}
        </p>
        <div style={buttonsContainer}>
          {data.error 
            ? <>
                <ButtonX 
                  onClick={()=> {
                    sendFalseEvent(data)
                    onClose()
                  }}
                  buttonText={messageText[data.errorType]?.noText}
                />
                <ButtonAccept 
                  onClick={()=> {
                    data.errorType === 2 ? sendTrueEvent(data) : null;
                    onClose()
                  }}
                  buttonText={messageText[data.errorType]?.yesText}
                />
              </>
            : <ButtonOk 
                onClick={()=> onClose()}
                buttonText=""
              />
          }
        </div>
        <div style={timerContainer}>
        Час до закриття: {remainingTime} сек.
        </div>
      </div>
    </Rodal>
  );
};

export default Modal;

const modalContainer: CSSProperties = {
  border: "0px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  width: "95%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const titleStyles: CSSProperties = {
  marginTop: "20px",
  margin: "10px",
  fontWeight: "bold",
  marginRight: "0px",
  fontSize: "3.2em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const nameStyles: CSSProperties = {
  margin: 0,
  marginBottom: "10px",
  fontSize: "3.2em",
  fontWeight: "600",
}

const messageStyles: CSSProperties = {
    color: "rgb(141, 4, 4)",
    fontSize: "1.8em",
    fontWeight: "500",
    marginBottom: "10px",
  }

const buttonsContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  
}

const timerContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}
