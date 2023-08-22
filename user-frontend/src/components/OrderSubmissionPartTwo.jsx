import React from "react";
import CustomInput from "./CustomInput";
import EmbeddedCalendar from "./EmbeddedCalendar";
import { showFeedbackMessage } from "../Functions";
import { compareDates } from "../Functions";

function OrderSubmissionPartTwo({
  sizingDate,
  setSizingDate,
  returnDate,
  setReturnDate,
  time,
  setTime,
  setPageNumber,
  setMessage,
}) {
  const handleMoveToNextPage = () => {
    const fields = {
      "Sizing Date": sizingDate,
      "Return Date": returnDate,
      Time: time,
    };
    // check that 1: all the necessary fields have been filled in
    const emptyFields = [];
    for (const [fieldName, fieldValue] of Object.entries(fields)) {
      if (!fieldValue) {
        emptyFields.push(fieldName);
      }
    }
    if (emptyFields.length !== 0) {
      showFeedbackMessage(
        `The following fields are empty: ${emptyFields.join(", ")}`,
        "red",
        setMessage,
        5000
      );
      return;
    }
    // 2: Return date cannot be before Sizing date, neither can they be on the same date
    const dateDifference = compareDates(
      fields["Sizing Date"],
      fields["Return Date"]
    );
    if (dateDifference >= 0) {
      showFeedbackMessage(
        "Return date must be after sizing date!",
        "red",
        setMessage,
        5000
      );
      return;
    }
    setPageNumber((pageNumber) => pageNumber + 1);
  };
  const handleMoveToPreviousPage = () =>
    setPageNumber((pageNumber) => pageNumber - 1);

  return (
    <div className="flex justify-between flex-col items-center h-full w-full overflow-y-scroll">
      <EmbeddedCalendar />
      <CustomInput
        desiredValue="Sizing Date"
        input={sizingDate}
        setInput={setSizingDate}
        isDate
        options={{ min: true }}
      />
      <CustomInput
        desiredValue="Return Date"
        input={returnDate}
        setInput={setReturnDate}
        isDate
        options={{ min: true }}
      />
      <CustomInput
        desiredValue="Sizing Time"
        input={time}
        setInput={setTime}
        isTime
      />
      <div className="flex w-full items-center justify-between ">
        <button
          className="w-1/2 text-center rounded-lg bg-orange-200 m-3 p-1 "
          onClick={handleMoveToPreviousPage}
        >
          Previous
        </button>
        <button
          className="w-1/2 text-center rounded-lg bg-orange-200 m-3 p-1 "
          onClick={handleMoveToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderSubmissionPartTwo;
