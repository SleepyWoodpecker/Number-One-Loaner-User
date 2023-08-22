import React from "react";
import QuantityEditingBox from "./QuantityEditingBox";
import { showFeedbackMessage } from "../Functions";

function OrderSubmissionPartOne({
  totalOrder,
  setTotalOrder,
  setPageNumber,
  setMessage,
}) {
  const removeItem = (targetItemId) =>
    setTotalOrder((totalOrder) =>
      totalOrder.filter((order) => order.id !== targetItemId)
    );

  const handleMoveToNextPage = () => {
    if (totalOrder.length === 0) {
      showFeedbackMessage(
        "Must have at least 1 item in the cart",
        "red",
        setMessage,
        3500
      );
      return;
    }

    setPageNumber((pageNumber) => pageNumber + 1);
  };

  return (
    <div className="flex justify-between items-center flex-col justify-self-end h-full">
      <h2 className="font-semibold text-xl">Your Order</h2>
      <hr
        style={{ borderColor: "#575757" }}
        className="mb-0.5 rounded-md h-1 w-64"
      />
      <div
        className="w-full overflow-y-scroll mt-2"
        style={{ height: "23rem" }}
      >
        <ul className="flex justify-center flex-col ">
          {totalOrder.map((order) => {
            return (
              <li key={order.id} className="flex justify-around">
                <div className="">
                  <img
                    src={order.imgUrl}
                    alt={order.name}
                    className="rounded-md my-2"
                    style={{ height: "6.2rem", width: "6.2rem" }}
                  ></img>
                </div>
                <QuantityEditingBox
                  removeItem={removeItem}
                  order={order}
                  totalOrder={totalOrder}
                  setTotalOrder={setTotalOrder}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className="w-64 text-center rounded-lg bg-orange-200 my-3 p-1.5"
        onClick={handleMoveToNextPage}
      >
        Next
      </button>
    </div>
  );
}

export default OrderSubmissionPartOne;
