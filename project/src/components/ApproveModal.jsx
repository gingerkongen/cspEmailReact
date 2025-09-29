import React from "react";

const ApproveModal = ({ open, onClose, children }) => {
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
            ? "scale-100 opacity-100 overflow-auto w-[90%] h-[70%] "
            : "scale-125 opacity-0 overflow-hidden  w-[600px] h-[400px] "
        }
        `}
      >
        <div className="flex align-items justify-center min-w-[90%] h-[90%]">
          <div className="w-3/4 overflow-auto  border rounded-md">Message:</div>
          <div className="w-1/4 overflow-auto border rounded-md">
            Recievers:
          </div>
        </div>
        <div className="flex mt-[20px] justify-center">
          <button
            type="button"
            className="px-4 py-2 rounded-md text-white shadow
                     bg-gradient-to-r from-sky-500 to-blue-600 cursor-pointer hover:scale-110"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
