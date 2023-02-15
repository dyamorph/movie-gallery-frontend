import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? styles.modal_active : styles.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? styles.modal_content_active : styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
