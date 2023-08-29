import React, { useState } from "react";
import { sendEmail, submitNewRequest } from "../Services";
import OrderSummary from "./OrderSubmissionPartOne";
import OrderSubmissionPartTwo from "./OrderSubmissionPartTwo";
import OrderSubmissionPartThree from "./OrderSubmissionPartThree";
import OrderProgressBar from "./OrderProgressBar";
import { showFeedbackMessage } from "../Functions";

function OrderSubmissionPage({ totalOrder, setTotalOrder }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [sizingDate, setSizingDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email.includes("@")) {
      showFeedbackMessage(`Email is invalid`, "red", setMessage, 3500);
      setIsSubmitting(false);
      return;
    }

    const request = await submitNewRequest({
      requester: name,
      unit: unit.toUpperCase(),
      email,
      requestedItems: totalOrder,
      sizingDate,
      returnDate,
      number,
      time,
    });

    const emailResponse = await sendEmail({ email, name }, request.id);
    if (emailResponse.ok) {
      showFeedbackMessage(
        `Request successfully submitted! A tracking ID has been sent to ${email}.
        If the confirmation email is not in your inbox, do remember to check your spam folder as well`,
        "green",
        setMessage,
        3500
      );
    }
    setEmail("");
    setSizingDate("");
    setReturnDate("");
    setUnit("");
    setName("");
    setNumber("");
    setTime("");
    setTotalOrder([]);
    setPageNumber(0);
    setIsSubmitting(false);
  };

  const orderPages = [
    <OrderSummary
      totalOrder={totalOrder}
      setTotalOrder={setTotalOrder}
      setPageNumber={setPageNumber}
      setMessage={setMessage}
    />,
    <OrderSubmissionPartTwo
      sizingDate={sizingDate}
      setSizingDate={setSizingDate}
      returnDate={returnDate}
      setReturnDate={setReturnDate}
      time={time}
      setTime={setTime}
      setPageNumber={setPageNumber}
      setMessage={setMessage}
    />,
    <OrderSubmissionPartThree
      name={name}
      setName={setName}
      unit={unit}
      setUnit={setUnit}
      email={email}
      setEmail={setEmail}
      number={number}
      setNumber={setNumber}
      submitOrder={submitOrder}
      setPageNumber={setPageNumber}
      isSubmitting={isSubmitting}
      setMessage={setMessage}
    />,
  ];

  return (
    <div
      className="flex flex-col h-full justify-between"
      style={{ height: "83vh" }}
    >
      {message}
      <OrderProgressBar pageNumber={pageNumber} />
      {/* show a list of the ordered items */}
      {/* input the poc name, unit, poc email, sizing date */}
      {orderPages[pageNumber]}
      <div className="bg-red-100 h-0 w-0"></div>
      <div className="bg-green-100 h-0 w-0"></div>
      <div className="bg-yellow-100 h-0 w-0"></div>
    </div>
  );
}

export default OrderSubmissionPage;
