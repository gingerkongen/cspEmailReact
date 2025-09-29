import React from "react";

const EmailForm = ({ handleApproveClick }) => {
  return (
    <form className="space-y-4 max-w-4xl">
      <div className="space-y-1">
        <label htmlFor="email-subject" className="text-sm text-neutral-600">
          Subject
        </label>
        <div className="flex items-center h-10 px-3 border rounded-md bg-gradient-to-br from-white to-blue-50">
          <input
            id="email-subject"
            name="subject"
            type="text"
            placeholder="Subject..."
            className="w-full h-full bg-transparent outline-none placeholder-neutral-400"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="email-message" className="text-sm text-neutral-600">
          Message
        </label>
        <div className="px-3 py-2 border rounded-md bg-gradient-to-br from-white via-blue-50 to-blue-100">
          <textarea
            id="email-message"
            name="message"
            rows={15}
            placeholder="Write your message..."
            className="w-full bg-transparent outline-none resize-y placeholder-neutral-400"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          className="px-3 py-2 border cursor-pointer backdrop-blur-lg rounded-md hover:scale-110"
        >
          Test
        </button>
        <button
          type="button"
          onClick={handleApproveClick}
          className="px-4 py-2 rounded-md text-white shadow
                     bg-gradient-to-r from-sky-500 to-blue-600 cursor-pointer hover:scale-110"
        >
          Approve
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
