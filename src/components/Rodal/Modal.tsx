// ModalComponent.tsx
import React, {useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useAppContext } from '../../State/AppProvider';

// interface ModalProps {
//   visible: boolean;
//   onClose: () => void;
//   closeOnEsc?: boolean;
//   showCloseButton?: boolean;
//   className?: string;
//   enterAnimation?: string;
//   showMask?: boolean;
//   customStyles?: { modal: string }; 
//   customMaskStyles?: { mask: string };
//   type: 'warning' | 'success';
//   text: string;
// }

const Modal: React.FC = () => {
const [autoCloseTimer, setAutoCloseTimer] = useState<number | null>(null);
const { state, dispatch } = useAppContext();
const { modal } = state;
const { visible, data } = modal;




  useEffect(() => {
    if (visible) {
      startAutoCloseTimer();
    } else {
      cancelAutoCloseTimer();
    }
    return cancelAutoCloseTimer; 
  }, [visible]);
  
  const startAutoCloseTimer = () => {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer); // Скасовуємо попередній таймер, якщо він існує
    }

    const timer = setTimeout(() => {
      onClose();
    }, 100000);

    setAutoCloseTimer(timer); // Зберігаємо ідентифікатор таймера в стані
  };

  const cancelAutoCloseTimer = () => {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer); // Скасовуємо таймер при закритті модального вікна вручну
      setAutoCloseTimer(null);
    }
  };

  const onClose = () => {
    dispatch({ type: 'SET_MODAL', payload: { visible: false,  data: modal.data} });
  };

  let customStyles = {};
  console.log(data);
  
  if (data.error === true) {
    customStyles = { 
      border: "2px solid red",
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '80%',
      height: "200px",
    }
  } else {
    customStyles = {
      border: "1px solid green",
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '80%',
      height: "200px",
    };
  }
  
  return (
    <Rodal 
        visible={visible} 
        onClose={onClose} 
        
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
        width: "90%",
        
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          marginBottom: "10px", 
        }}>
          <span style={{ 
            fontWeight: "bold", 
            marginRight: "5px", 
            fontSize: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>{data.state} -  {data.time}</span>
        </div>
        <p style={{ 
          margin: 0,
          fontSize: "30px",
          }}>{data.first_name}</p>
      </div>
    </Rodal>
  );
};

export default Modal;
