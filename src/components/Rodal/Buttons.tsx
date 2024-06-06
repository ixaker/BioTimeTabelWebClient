import CircularProgressTimer from "../Loader/CircleProgres";
import styles from "./buttonStyle.module.css";
interface ButtonProps {
  onClick: () => void;
  buttonText?: string;
  time: number;
  remainingTime: number;
  progress: boolean;
}

export const ButtonX: React.FC<ButtonProps> = ({ onClick, buttonText }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div>{buttonText}</div>
    </button>
  );
};

export const ButtonOk: React.FC<ButtonProps> = ({ onClick, buttonText }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div>{buttonText}</div>
    </button>
  );
};

export const ButtonAccept: React.FC<ButtonProps> = ({ onClick, buttonText, time, remainingTime, progress }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div>{buttonText}</div>

      {progress ? (
        <div style={{ marginLeft: "10px" }}>
          <CircularProgressTimer time={time} remainingTime={remainingTime} />
        </div>
      ) : null}
    </button>
  );
};

// Основний об'єкт зі спільними властивостями
// const buttonBaseStyle = {
// border: "2px solid",
// borderRadius: "5px",
// padding: "10px",
// fontSize: "1.6rem",
// lineHeight: "2.5rem",
// color: "white",
// cursor: "pointer",
// display: "flex",
// alignItems: "center",
// justifyContent: "center",
// margin: "20px 0px 20px 0px",
// width: "45%",
// height: "auto",
// };

// const buttonXStyle = {
// ...buttonBaseStyle,
// border: "2px solid #1f7a1f",
// backgroundColor: "#1f7a1f",
// };

// const buttonOkStyle = {
// ...buttonBaseStyle,
// border: "2px solid #1f7a1f",
// backgroundColor: "#1f7a1f",
// };
