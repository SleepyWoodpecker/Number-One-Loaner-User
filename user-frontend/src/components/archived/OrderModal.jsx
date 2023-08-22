import React, { useState } from "react";
import Modal from "../Modal";
import { submitNewRequest } from "../../Services";

function OrderModal({ closeModal, totalOrder }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sizingDate, setSizingDate] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const inputStyle = "focus-visible:outline-orange-300 w-56 m-2";

  const submitOrder = (e) => {
    e.preventDefault();
    // for now, exit if any of the fields are empty
    if (!name || !email || !sizingDate) return;
    submitNewRequest({
      requester: name,
      email,
      requestedItems: totalOrder,
      sizingDate,
      loanRequestId: `${name.slice(0, 5)}-${sizingDate}`,
    });
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      closeModal();
    }, 3000);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSizingDateChange = (e) => {
    setSizingDate(e.target.value);
  };

  return (
    <Modal handleModalClose={closeModal}>
      <div className="flex justify-around items-center w-full h-full flex-col">
        <ul className="text-center list-disc">
          {totalOrder.map((order) => (
            <li key={`${order.name} ${order.quantity}`}>
              {`${order.name} - ${order.quantity}`}{" "}
            </li>
          ))}
        </ul>
        <form className="flex justify-center items-center flex-col">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              className={inputStyle}
              value={name}
              onChange={handleNameChange}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              className={inputStyle}
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Sizing Date: </label>
            <input
              id="date"
              type="date"
              className={`focus-visible:outline-orange-300 w-36 m-2`}
              value={sizingDate}
              onChange={handleSizingDateChange}
            ></input>
          </div>
          {/* in the future need to put in error handling */}
          <button
            type="submit"
            className="text-center p-2 border-2 border-red-300 my-1"
            onClick={submitOrder}
          >
            Submit Request
          </button>
        </form>
        {showMessage && (
          <div className="bg-green-200">Request successfully placed!</div>
        )}
      </div>
    </Modal>
  );
}

export default OrderModal;
