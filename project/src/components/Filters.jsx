import React, { useEffect, useState } from "react";

const Filters = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDivisionsOpen, setIsDivisionsOpen] = useState(false);
  const [selectedDivisions, setSelectedDivisions] = useState([
    "D1-TOP",
    "D1-BOTTOM",
    "D2-TOP",
    "D2-BOTTOM",
    "D3-TOP",
    "D3-BOTTOM",
    "NAIA",
  ]);

  const divisionOptions = [
    "D1-TOP",
    "D1-BOTTOM",
    "D2-TOP",
    "D2-BOTTOM",
    "D3-TOP",
    "D3-BOTTOM",
    "NAIA",
  ];

  const toggleDropdown = () => {
    setIsOpen((v) => !v);
    setIsDivisionsOpen(false);
  };

  const toggleDropdownDivisions = () => {
    setIsDivisionsOpen((v) => !v);
  };

  const handleDivisionChange = (division) => {
    setSelectedDivisions((prev) =>
      prev.includes(division)
        ? prev.filter((v) => v !== division)
        : [...prev, division]
    );
  };

  useEffect(() => {
    onFilter(selectedDivisions ?? []);
  }, [selectedDivisions]);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      <button
        className="flex items-center justify-center h-7 px-3 rounded-md max-w-[100px]
                   bg-gradient-to-br from-white to-blue-50 border cursor-pointer text-sm hover:scale-105"
      >
        Filters &#x2193;
      </button>

      {isOpen && (
        <div
          className="absolute flex flex-row justify-between right-0 w-64 rounded-md border shadow-lg z-10
                     bg-gradient-to-br from-white via-blue-50 to-blue-100
                     p-3 "
        >
          {" "}
          <div
            className="relative"
            onMouseEnter={() => {
              setIsDivisionsOpen(true);
            }}
            onMouseLeave={() => {
              setIsDivisionsOpen(false);
            }}
          >
            <button
              className="flex items-center justify-center h-7 px-3 rounded-md max-w-[100px]
                   bg-gradient-to-br from-white to-blue-50 border hover:scale-105 cursor-pointer text-xs"
            >
              Divisions &#x2193;
            </button>
            {isDivisionsOpen && (
              <div
                className="absolute z-20 w-40
                  rounded-xl border shadow
                  bg-gradient-to-br from-white via-blue-50 to-blue-100
                  max-h-60 overflow-auto p-3"
              >
                <div className="max-h-60 overflow-auto space-y-2 text-xs">
                  {divisionOptions.map((d) => (
                    <label key={d} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedDivisions.includes(d)}
                        name="divisions"
                        value={d}
                        className="accent-blue-600 cursor-pointer"
                        onChange={() => handleDivisionChange(d)}
                      />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center justify-center h-7 px-3 rounded-md max-w-[100px]
                   bg-gradient-to-br from-white to-blue-50 border hover:scale-105 cursor-pointer text-xs"
            >
              Date &#x2193;
            </button>
          </div>
          <div className="relative">
            <button
              className="flex items-center justify-center h-7 px-3 rounded-md max-w-[100px]
                   bg-gradient-to-br from-white to-blue-50 border hover:scale-105 cursor-pointer text-xs"
            >
              Player &#x2193;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
