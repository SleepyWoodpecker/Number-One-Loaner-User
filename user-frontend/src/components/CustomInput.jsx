import React from "react";
import { getMinDay } from "../Functions";

function CustomInput({
  desiredValue,
  input,
  setInput,
  isEmail = false,
  isDate = false,
  isTime = false,
  options,
}) {
  const handleInputChange = (e) => setInput(e.target.value);

  let inputType = "text";

  if (isEmail) {
    inputType = "email";
  } else if (isDate) {
    inputType = "date";
  }

  // set a minimum and maximum value for date
  const minDay = getMinDay();

  return (
    <div className="flex flex-col items-start my-3 w-full">
      <label
        htmlFor={desiredValue}
        className="ml-1 text-base"
      >{`${desiredValue}`}</label>
      {isTime ? (
        <select
          id={desiredValue}
          className="focus-visible:outline-orange-500 border-2 px-1.5 py-0.5 justify-self-end w-full rounded-md"
          value={input}
          onChange={handleInputChange}
        >
          <option value=""></option>
          <option value="08:00">08:00</option>
          <option value="10:00">10:00</option>
          <option value="13:00">13:00</option>
          <option value="15:00">15:00</option>
        </select>
      ) : (
        <input
          id={desiredValue}
          value={input}
          onChange={handleInputChange}
          type={inputType}
          className="focus-visible:outline-orange-500 border-2 px-1.5 py-0.5 justify-self-end w-full rounded-md"
          min={options?.min && minDay}
          autoComplete={isEmail ? "on" : "off"}
          autoCorrect="off"
        ></input>
      )}
    </div>
  );
}

export default CustomInput;
