import React from "react";
import RequestQuantityEditingBox from "./RequestQuantityEditingBox";
import { editRequest } from "../Services";

function RequestTable({ requestData, setRequestData }) {
  console.log(requestData);
  const {
    requester,
    status,
    requestedItems,
    sizingDate,
    unit,
    returnDate,
    time,
  } = requestData;

  let statusCode;
  if (status === "Pending" || status === "Awaiting Return") {
    statusCode = "yellow";
  } else if (status === "Awaiting Sizing" || status === "Return Complete") {
    statusCode = "green";
  } else if (status === "Rejected") {
    statusCode = "red";
  }

  let displayDate;
  switch (status) {
    case "Pending" || "Awaiting Sizing":
      displayDate = `Sizing: ${sizingDate} @${time}`;
      break;
    default:
      displayDate = `Return: ${returnDate}`;
  }

  const handleChangeRequestData = async (id, newQuantity) => {
    const modifiedRequestedItems = requestData.requestedItems.map((item) => {
      return item.id === id
        ? { ...item, quantity: newQuantity, originalQuantity: newQuantity }
        : item;
    });
    const modifiedOrder = {
      ...requestData,
      requestedItems: modifiedRequestedItems,
    };
    setRequestData(modifiedOrder);
    await editRequest(requestData.id, modifiedOrder);
  };

  return (
    <div className="w-full mx-2 flex flex-col mt-8">
      {/* show sizing date */}
      <div className="w-full flex justify-between">
        <h1 className="font-semibold text-lg">{displayDate}</h1>
        <div>
          {status === "Pending" ? (
            <button
              className="text-sm bg-orange-200 rounded-md p-1"
              onClick={() => console.log("show menu to add item")}
            >
              Add Items
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="flex justify-between m-0.5 mt-5"
        style={{ width: "19rem" }}
      >
        <h1 className="font-semibold ">{`${requester}`}</h1>
        <h1 className="font-semibold ">{unit}</h1>
        <div
          className={`rounded-lg px-2 bg-${statusCode}-200 font-semibold flex items-center`}
        >
          {status}
        </div>
      </div>
      <hr style={{ borderColor: "#575757" }} className="mb-2 rounded-md h-1" />
      {/* show the order items */}
      <ol className="w-72 list-decimal">
        {requestedItems.map((item, i) => {
          return (
            <li className="flex justify-between m-1 mb-3" key={item.id}>
              <p className="w-64 mr-5" style={{ overflowWrap: "break-word" }}>
                {`${i + 1}. ${item.name}`}
              </p>
              {status === "Pending" ? (
                <RequestQuantityEditingBox
                  order={item}
                  setTotalOrder={handleChangeRequestData}
                  width="24"
                />
              ) : (
                <p className="w-8 text-center">{item.quantity}</p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default RequestTable;
