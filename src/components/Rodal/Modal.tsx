// ModalComponent.tsx
import { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useAppContext } from "../../State/AppProvider";
import { ButtonOk, ButtonX, ButtonAccept } from "./Buttons";
import { sendTrueEvent, sendFalseEvent } from "./../WebSocket/WebSocket";
import { messageText } from "./messageTexts";
import { CSSProperties } from "react";
import styles from "./modal.module.css";

const Modal: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { modal } = state;
  const { visible, data } = modal;
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const time: number = 60;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      setShowModal(false);
      setTimeout(() => {
        setShowModal(true);
        setRemainingTime(time);
      }, 200);

      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setShowModal(false);
    }

    return () => {
      console.log("clearInterval(timer)");

      clearInterval(timer);
    };
  }, [visible, data]);

  const onClose = () => {
    console.log("onClose start");
    console.log({ visible: false, data: modal.data });
    dispatch({
      type: "SET_MODAL",
      payload: { visible: false, data: modal.data },
    });
  };

  useEffect(() => {
    if (remainingTime === 0 && visible) {
      console.log("remainingTime === 0");
      setRemainingTime(60);
      onClose();
    }
  }, [remainingTime, visible]);

  const commonStyles: CSSProperties = {
    borderRadius: "10px",
    padding: "10px",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
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
      showCloseButton={false}
      enterAnimation="zoom"
      showMask
      customStyles={customStyles}
      customMaskStyles={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.modalContainer}>
        <p className={styles.titleStyles}>
          {data.state} - {data.time}
        </p>
        <p className={styles.nameStyles}>{data.first_name}</p>
        <p className={styles.messageStyles}>{data.error ? messageText[data.errorType]?.message : null}</p>
        <div className={styles.buttonsContainer}>
          {data.error ? (
            <>
              <ButtonX
                onClick={() => {
                  sendFalseEvent(data);
                  onClose();
                }}
                buttonText={messageText[data.errorType]?.noText}
                time={60}
                remainingTime={remainingTime}
                progress={false}
              />
              <ButtonAccept
                onClick={() => {
                  data.errorType === 2 ? sendTrueEvent(data) : null;
                  onClose();
                }}
                buttonText={messageText[data.errorType]?.yesText}
                time={60}
                remainingTime={remainingTime}
                progress={data.errorType === 1 || data.errorType === 0}
              />
            </>
          ) : (
            <ButtonOk
              onClick={() => onClose()}
              buttonText="підтвердити"
              time={60}
              remainingTime={remainingTime}
              progress={false}
            />
          )}
        </div>
        <div className={styles.timerContainer}>{/* Час до закриття: {remainingTime} сек. */}</div>
      </div>
    </Rodal>
  );
};

export default Modal;

const modalContainer: CSSProperties = {
  border: "0px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyles: CSSProperties = {
  marginTop: "20px",
  margin: "10px",
  fontWeight: "bold",
  fontSize: "3.2em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const nameStyles: CSSProperties = {
  margin: 0,
  marginBottom: "10px",
  fontSize: "3.2em",
  fontWeight: "600",
};

const messageStyles: CSSProperties = {
  color: "rgb(141, 4, 4)",
  fontSize: "1.5em",
  fontWeight: "500",
  marginBottom: "10px",
};

const buttonsContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
};

const timerContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};
