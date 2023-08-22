import React from "react";

function ControlledNumberInput({ storeItem, handleQuantityChange, quantity }) {
  return (
    <div className="flex justify-center items-center mmb-3 mt-1">
      <label htmlFor={`${storeItem.name} Quantity`}>Quantity: </label>
      <input
        value={quantity || ""}
        onChange={handleQuantityChange}
        id={`${storeItem.name} Quantity`}
        // haha managed to change it within 5 min this time nice
        className="focus-visible:outline-orange-300 border-orange-200 border-2 w-36 m-2 text-center rounded-md"
        autoComplete="off"
        autoCorrect="off"
      ></input>
    </div>
  );
}

export default ControlledNumberInput;
