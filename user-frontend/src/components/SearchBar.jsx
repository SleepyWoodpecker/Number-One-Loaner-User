import React from "react";
import { LiaSearchSolid } from "react-icons/lia";

function SearchBar({
  value,
  handleSearchInput,
  handleRequestSearch,
  placeholder,
}) {
  return (
    <form onSubmit={handleRequestSearch} className="m-3 mb-3">
      <div className="p-1 rounded-xl w-full flex justify-between items-center border-2">
        <input
          value={value}
          onChange={handleSearchInput}
          style={{ width: "90%" }}
          className="p-1.5 focus-visible:outline-none"
          placeholder={placeholder}
        ></input>
        <LiaSearchSolid size={30} onClick={handleRequestSearch} />
      </div>
    </form>
  );
}

export default SearchBar;
