import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

function ContactUs({ setActivePage }) {
  return (
    <div
      className="relative flex justify-center text-center items-center text-xl leading-10 px-6"
      style={{ height: "33rem" }}
    >
      <IoIosArrowRoundBack
        size={45}
        onClick={() => setActivePage("Request Tracker")}
        style={{ color: "#bfbdbd" }}
        className="absolute top-0 -left-3"
      />
      For any further inquries, do contact SSG Louis at 96249225
    </div>
  );
}

export default ContactUs;
