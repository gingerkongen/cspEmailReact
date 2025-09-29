import React from "react";
import { FiCopy } from "react-icons/fi";

const Codewords = () => {
  const codeWords = [
    "{{Team}}",
    "{{FirstName}}",
    "{{LastName}}",
    "{{Division}}",
  ];
  return (
    <div className="min-w-[66.666%] h-[385px] rounded-xl border shadow bg-gradient-to-br from-white via-blue-50 to-blue-100 p-4 overflow-auto">
      <h3 className="text-sm font-semibold text-neutral-700 mb-3">
        Codewords:
      </h3>

      <ul className="space-y-2">
        {codeWords.map((word) => (
          <li
            key={word}
            className="flex items-center justify-between rounded-md border px-3 py-2 bg-white/70 hover:bg-white transition overflow-auto"
          >
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(word)}
              className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 text-xs hover:bg-gray-100"
              aria-label={`Copy ${word}`}
              title="Copy"
            >
              {" "}
              <span className="font-mono text-sm">{word}</span>
              <FiCopy size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Codewords;
