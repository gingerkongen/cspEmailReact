import React from "react";

const PreviewEmail = ({ rawEmail }) => {
  return (
    <div className="space-y-4 min-w-[95%] h-[90%]">
      <div className="space-y-1">
        <label htmlFor="email-subject" className="text-sm text-neutral-600">
          Subject
        </label>
        <div className="flex items-center h-10 px-3  rounded-md bg-gradient-to-br from-white to-blue-50">
          {rawEmail.subject}
        </div>
      </div>

      <div className="space-y-1 h-[70%]">
        <label htmlFor="email-message" className="text-sm text-neutral-600">
          Message
        </label>
        <div
          style={{ tabSize: 2 }}
          className="whitespace-pre-wrap font-mono break-words min-h-10 px-3 overflow-auto py-2 rounded-md bg-gradient-to-br from-white via-blue-50 to-blue-100"
        >
          {rawEmail.body}
        </div>
      </div>
    </div>
  );
};

export default PreviewEmail;
