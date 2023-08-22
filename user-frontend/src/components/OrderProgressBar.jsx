import React from "react";

function OrderProgressBar({ pageNumber }) {
  return (
    <div className="flex justify-center items-center mt-3 mb-5">
      <div className="rounded-full bg-orange-200 h-12 w-12 flex justify-center items-center z-10">
        1
      </div>
      <div
        className={`w-16 h-2 bg-${pageNumber > 0 ? "orange" : "gray"}-200`}
      ></div>
      <div
        className={`rounded-full bg-${
          pageNumber > 0 ? "orange" : "gray"
        }-200 h-12 w-12 flex justify-center items-center z-10`}
      >
        2
      </div>
      <div
        className={`w-16 h-2 bg-${pageNumber > 1 ? "orange" : "gray"}-200`}
      ></div>
      <div
        className={`rounded-full bg-${
          pageNumber > 1 ? "orange" : "gray"
        }-200 h-12 w-12 flex justify-center items-center z-10`}
      >
        3
      </div>
    </div>
  );
}

export default OrderProgressBar;
