const SelectSheetButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
    inline-flex items-center justify-center
    px-4 h-10
    min-w-[200px]
    bg-gradient-to-br from-white to-blue-50 border rounded-md
    cursor-pointer

    hover:scale-105
  "
    >
      Select spreadsheet
    </button>
  );
};

export default SelectSheetButton;
