import React from "react";

const Search = () => {
  return (
    <div className="flex items-center px-3 bg-gradient-to-br from-white to-blue-50 border rounded-md h-7">
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search"
        className="w-full h-full bg-transparent outline-none placeholder-neutral-400"
      />
    </div>
  );
};

export default Search;
