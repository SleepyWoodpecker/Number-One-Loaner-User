import React, { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { capitaliseFirstLetter } from "../Functions";

function SearchBar({
  filter = null,
  categories = null,
  handleFilterChange,
  value,
  handleSearchInput,
  handleRequestSearch,
  placeholder,
  ...eventListeners
}) {
  const [divClicked, setDivClicked] = useState(false);

  let searchFilter;

  if (filter) {
    searchFilter = (
      <select
        value={filter}
        onChange={handleFilterChange}
        className={`rounded-l-xl bg-orange-200 h-full border-2 border-r-0 text-center align-middle ${
          divClicked ? "border-orange-400" : ""
        } ${filter.length > 6 ? "w-28" : "w-16"} `}
      >
        {/* <option value="all">All</option>
        <option value="no. 1">No. 1</option>
        <option value="accessories">Accessories</option> */}
        {categories.map((category) => (
          <option value={category} key={category}>
            {capitaliseFirstLetter(category)}
          </option>
        ))}
      </select>
    );
  }

  return (
    <form onSubmit={handleRequestSearch} className="m-3 mb-3 flex">
      {searchFilter}
      <div
        className={`p-1 w-full flex justify-between items-center border-2 ${
          divClicked ? "border-orange-400" : ""
        } ${filter ? "border-l-0 rounded-r-xl" : "rounded-xl"}`}
        onFocus={() => setDivClicked(true)}
        onBlur={() => setDivClicked(false)}
      >
        <input
          value={value}
          onChange={handleSearchInput}
          // style={{ width: "90%" }}
          className={`p-1.5 focus-visible:outline-none w-full`}
          placeholder={placeholder}
          {...eventListeners}
        ></input>
        <LiaSearchSolid size={30} onClick={handleRequestSearch} />
      </div>
    </form>
  );
}

export default SearchBar;
