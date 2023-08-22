import React from "react";

function RequestTable({ requestData }) {
  const { requester, status, requestedItems, sizingDate, unit } = requestData;

  let statusCode;
  if (status === "Pending") {
    statusCode = "yellow";
  } else if (status === "Accepted") {
    statusCode = "green";
  } else if (status === "Rejected") {
    statusCode = "red";
  }

  const sizingDateConfirmation = (
    <div className="rounded-md bg-orange-200 mt-10 px-5 py-3">
      <h1 className="font-semibold text-lg text-center pr-3">
        Sizing scheduled on {sizingDate}
      </h1>
    </div>
  );

  return (
    <div className="w-full mx-2 flex flex-col mt-5">
      <div className="flex justify-between m-0.5" style={{ width: "19rem" }}>
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
      <ul className="px-5 pr-12">
        {requestedItems.map((item) => {
          return (
            <li className="flex justify-between m-1" key={item.id}>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
            </li>
          );
        })}
      </ul>
      {/* show sizing date */}
      {status === "Accepted" ? sizingDateConfirmation : ""}
    </div>
  );
}

export default RequestTable;
