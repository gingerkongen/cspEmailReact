import React from "react";

const SendingModal = ({
  open,
  onClose,
  sendingCount,
  sendingLog,
  isSending,
}) => {
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
            ? "scale-100 opacity-100 overflow-scroll w-[600px] h-[400px] "
            : "scale-125 opacity-0 overflow-hidden  w-[600px] h-[400px] "
        }
        `}
      >
        <div className="flex items-center overflow-auto justify-center w-[100%] h-[100%]">
          <div className="h-full w-full overflow-auto border rounded-xl shadow-lg ring-1 ring-black/5 bg-white">
            <div className="mt-3 px-4 text-sm font-medium flex items-center gap-2 text-neutral-700">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Sending... {sendingCount}
            </div>

            <div className="mt-4 px-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Sending log
            </div>

            <div
              className="mt-2 flex flex-col w-full h-full px-3 pb-3
                 rounded-b-xl bg-neutral-50/60 backdrop-blur-[1px] shadow-inner
                 max-h-64 overflow-auto divide-y divide-neutral-200
                 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent"
            >
              {sendingLog.map((message, i) => (
                <div
                  key={i}
                  className="p-2 text-xs leading-5 font-mono break-words
                     odd:bg-white hover:bg-neutral-100/60 transition-colors rounded"
                >
                  {message}
                </div>
              ))}
              {isSending ? (
                <div
                  className="p-2 text-xs leading-5 font-mono break-words
                     odd:bg-white hover:bg-neutral-100/60 transition-colors rounded"
                >
                  ...
                </div>
              ) : (
                <div
                  className="p-2 text-xs leading-5 font-mono break-words
                     odd:bg-white text-green-600 hover:bg-neutral-100/60 transition-colors rounded"
                >
                  All emails sent! You can now close the window
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendingModal;
