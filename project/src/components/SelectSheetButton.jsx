const SelectSheetButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-3 backdrop-blur-lg border text-2xl h-20 w-50 rounded-md cursor-pointer hover:scale-105"
    >
      Select spreadsheet
    </button>
  );
};

export default SelectSheetButton;
