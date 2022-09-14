import React from "react";

const Modal = ({ parentProps, onClick }) => {
  return (
    <div onClick={onClick} className="Modal">
      {parentProps}
    </div>
  );
};

export default Modal;
