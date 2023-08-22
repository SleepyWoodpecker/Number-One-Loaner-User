import React from "react";
import CustomInput from "./CustomInput";

function OrderSubmissionPartThree({
  name,
  setName,
  unit,
  setUnit,
  email,
  setEmail,
  number,
  setNumber,
  submitOrder,
  setPageNumber,
  isSubmitting,
}) {
  const handleMoveToPreviousPage = () =>
    setPageNumber((pageNumber) => pageNumber - 1);
  return (
    <div className="flex justify-around items-center flex-col justify-self-end h-full">
      <div className="flex justify-center items-center flex-col justify-self-end h-full w-full">
        <CustomInput desiredValue="Name" input={name} setInput={setName} />
        <CustomInput desiredValue="Unit" input={unit} setInput={setUnit} />
        {/* need to put a validator for the emails */}
        <CustomInput
          desiredValue="Email"
          input={email}
          setInput={setEmail}
          isEmail
        />
        <CustomInput
          desiredValue="HP Number"
          input={number}
          setInput={setNumber}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <button
          className="w-1/2 text-center rounded-lg bg-orange-200 m-3 p-1 mt-7 h-8"
          onClick={handleMoveToPreviousPage}
        >
          Previous
        </button>
        <button
          className="w-1/2 h-8 text-center rounded-lg bg-green-200 m-3 p-1 mt-7 flex justify-center items-center"
          onClick={submitOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <img
              src={require("../Images/Loading.gif")}
              alt="loading animation"
              className="w-1/2 h-8"
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}

export default OrderSubmissionPartThree;
