import React, { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";

function SearchBar({
  value,
  handleSearchInput,
  handleRequestSearch,
  placeholder,
  ...eventListeners
}) {
  const [divClicked, setDivClicked] = useState(false);

  return (
    <form onSubmit={handleRequestSearch} className="m-3 mb-3">
      <div
        className={`p-1 rounded-xl w-full flex justify-between items-center border-2 ${
          divClicked ? "border-orange-400" : ""
        }`}
        onFocus={() => setDivClicked(true)}
        onBlur={() => setDivClicked(false)}
      >
        <input
          value={value}
          onChange={handleSearchInput}
          // style={{ width: "90%" }}
          className="p-1.5 focus-visible:outline-none w-full"
          placeholder={placeholder}
          {...eventListeners}
        ></input>
        <LiaSearchSolid size={30} onClick={handleRequestSearch} />
      </div>
    </form>
  );
}

export default SearchBar;
