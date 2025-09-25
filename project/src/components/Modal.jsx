import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center
    transition-colors
  ${open ? "visible bg-black/20" : "invisible"}
  `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        bg-white rounded-xl shadow p-6 transition-all
        ${
          open
            ? "scale-100 opacity-100 overflow-scroll w-[800px] h-[600px] "
            : "scale-125 opacity-0 overflow-hidden  w-[800px] h-[600px] "
        }
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
