import React from "react";
import { createPortal } from "react-dom";

function Modal({ children, handleModalClose }) {
  const modalStyle = `bg-white border-2 z-30 fixed p-2 inset-x-12 top-20 py-4 mid-point-3:top-28 mid-point-4:top-32 desktop:top-40 max-w-md mx-auto`;

  return createPortal(
    <div className="fixed">
      <div className={modalStyle}>{children}</div>
      <div
        className="h-full w-full fixed inset-0 bg-gray-500 opacity-50 fixed"
        onClick={handleModalClose}
      ></div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
