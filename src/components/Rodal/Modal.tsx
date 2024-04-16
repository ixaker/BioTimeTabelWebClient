// ModalComponent.tsx
import { useState, useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useAppContext } from '../../State/AppProvider';
import { ButtonOk, ButtonX, ButtonAccept } from './Buttons';
import { sendTrueEvent, sendFalseEvent } from '../WebSocket/WebSocket';
import messageData from './messageTexts.json'
import { CSSProperties } from 'react';

type messageText = {
  "null_Uhod": {
      message: string;
  };
  "Uhod_Uhod": {
      message: string;
  };
  "Prihod_Prihod": {
      message: string;
  };
}

type MessageText = {
  [key in keyof messageText]: {
    message: string;
  };
};

const Modal: React.FC = () => {

  const { state, dispatch } = useAppContext();
  const { modal } = state;
  const { visible, data } = modal;
  const [showModal, setShowModal] = useState(false);
  const [messageText, setMessageText] = useState<MessageText>({} as MessageText);
  
  useEffect(() => {
    setMessageText(messageData);
  },[])

  useEffect(() => {
    if (visible) {
      setShowModal(false);
      setTimeout(() => {
        setShowModal(true);
      }, 200);

    } else {
      setShowModal(false);
    }
  }, [visible, data]);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 600000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const onClose = () => {
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
    bagroundColor: "white",
  };
  
  const customStyles: CSSProperties = {
    ...commonStyles,
    border: data.error ? "10px solid red" : "3px solid green",
    animation: data.error ? "blinkingBackground 0.3s infinite alternate" : undefined, // При потребі вказати інше значення для animation
    height: data.error ? "300px" : "200px",
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
          {messageText[data.errorType]?.message}
        </p>
        <div style={buttonsContainer}>
          {data.error 
            ? <>
                <ButtonX onClick={()=> {
                  sendFalseEvent(data)
                  onClose()
                }}/>
                <ButtonAccept onClick={()=> {
                  sendTrueEvent(data)
                  onClose()
                }}/>
              </>
            : <ButtonOk onClick={()=> onClose()}/>
          }
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
  margin: "10px",
  fontWeight: "bold",
  marginRight: "0px",
  fontSize: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const nameStyles: CSSProperties = {
  margin: 0,
  marginBottom: "5px",
  fontSize: "30px",
}

const messageStyles: CSSProperties = {
    color: "rgb(141, 4, 4)",
    fontSize: "1.5em",
    fontWeight: "bold",
  }

const buttonsContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  
}

