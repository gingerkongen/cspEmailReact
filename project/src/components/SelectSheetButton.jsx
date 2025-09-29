const SelectSheetButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
    inline-flex items-center justify-center
    px-4 h-10
    min-w-[200px]
    bg-gradient-to-r from-sky-500 to-blue-600 rounded-md
    cursor-pointer
    text-white shadow
    hover:scale-105
  "
    >
      Select spreadsheet
    </button>
  );
};

export default SelectSheetButton;
