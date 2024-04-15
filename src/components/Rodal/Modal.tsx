// ModalComponent.tsx
import { useState, useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useAppContext } from '../../State/AppProvider';
import errorSound from '../../assets/errorsound.mp3';
import { ButtonOk, ButtonX } from './Buttons';
import { sendTrueEvent, sendFalseEvent } from '../WebSocket/WebSocket';


const Modal: React.FC = () => {

  const { state, dispatch } = useAppContext();
  const { modal } = state;
  const { visible, data } = modal;
  const [showModal, setShowModal] = useState(false);
  const audio = new Audio(errorSound);

  useEffect(() => {
    if (visible) {
      setShowModal(false);
      setTimeout(() => {
        setShowModal(true);
      }, 200);

    } else {
      setShowModal(false);
      audio.pause();
    }
  }, [visible, data]);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  useEffect(() => {
    if (visible && data.error) {
      audio.volume = 0.5;
      audio.loop = true;
      audio.play();
    }
  }, [visible, data.error]);

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


  let customStyles = {};

  if (data.error === true) {
    customStyles = {
      border: "10px solid red",
      backgroundColor: "#d6a4a4",
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '90%',
      maxWidth: "600px",
      height: "200px",
      animation: "blinkingBackground 0.3s infinite alternate",
    }
  } else {
    customStyles = {
      border: "3px solid green",
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '90%',
      maxWidth: "600px",
      height: "200px",
    };
  }

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
      <div style={{
        border: "0px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        width: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        

      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}>
          <span style={{
            fontWeight: "bold",
            marginRight: "0px",
            fontSize: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>{data.state} -  {data.time}</span>

        </div>
        <p style={{
          margin: 0,
          marginBottom: "5px",
          fontSize: "30px",
        }}>{data.first_name}</p>
        <p
          style={{
            color: "rgb(141, 4, 4)",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          {data.msg}
        </p>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
        }}
        >
          {data.error 
            ? <>
                <ButtonX onClick={()=> {
                  sendFalseEvent(data)
                  onClose()
                }}/>
                <ButtonOk onClick={()=> {
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
