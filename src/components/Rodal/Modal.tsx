// ModalComponent.tsx
import { useState, useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useAppContext } from '../../State/AppProvider';
import CloseButton from './closeButton';

const Modal: React.FC = () => {

  const { state, dispatch } = useAppContext();
  const { modal } = state;
  const { visible, data } = modal;
  const [showModal, setShowModal] = useState(false);
  console.log(data);

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
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const onClose = () => {
    dispatch({ type: 'SET_MODAL', payload: { visible: false, data: modal.data } });
  };

  let customStyles = {};

  if (data.error === true) {
    customStyles = {
      border: "3px solid red",
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '90%',
      height: "200px",
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
      height: "200px",
    };
  }

  return (
    <Rodal
      visible={showModal}
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
        width: "95%",

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
        {/* <button onClick={
          () => {
            console.log("Button clicked!");
            const newDataForModal = {
              first_name: 'Другий модал',
              time: 'asdf',
              state: 'asdfasdf',
              error: true,
              msg: 'asdfsdf',
            };
            dispatch({ type: 'SET_MODAL', payload: { visible: true, data: newDataForModal } });
          }
        }>Click me!</button> */}
        <CloseButton />
      </div>
    </Rodal>
  );
};

export default Modal;
