// type: success | warn | fail | info
// removeDelay: auto hide after x milliseconds
import { MdError } from "react-icons/md";
import styles from "./toast.module.scss";

const Toast = (props) => {
  const { messages, type, onClose } = props;
  const toastType = type || "success";

  return messages.length > 0 ? (
    <>
      <div className={`${styles.Toast}`}>
        <div className={`${styles[toastType]} ${styles.toastContainer}`}>
          <ul>
            {messages.map((item) => {
              console.log(item);
              return (
                <li key={item.message}>
                  <div>
                    <MdError />
                  </div>
                  <div>{item.message}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.closeIcon}>
          <span onClick={onClose}>X</span>
        </div>
      </div>
    </>
  ) : null;
};

export default Toast;
