import React, { useRef, useState } from "react";
import { BsCheck2, BsX } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { validateQuantity } from "../Functions";

function RequestQuantityEditingBox({ order, setTotalOrder, width }) {
  const originalQuantity = useRef(order.quantity);
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(order.quantity);

  const handleQuantityInput = (e) => {
    setNewQuantity(e.target.value);
  };
  const handleEditing = () => setIsEditing(true);
  const handleCloseEditor = () => {
    setNewQuantity(originalQuantity.current);
    setIsEditing(false);
  };
  const handleItemQuantityUpate = async () => {
    if (newQuantity === "") {
      setNewQuantity(originalQuantity.current);
      return;
    } else if (!validateQuantity(newQuantity)) {
      // show a return message about stuff being wrong
      return;
    } else {
      setTotalOrder(order.id, newQuantity);
      originalQuantity.current = newQuantity;
    }
    setIsEditing(false);
  };

  return (
    <div className={`w-${width} flex items-center`}>
      <div className={`mr-4`}>
        {isEditing ? (
          <input
            className={`focus-visible:outline-orange-500 border-2 text-center rounded-sm w-10`}
            value={newQuantity}
            onChange={handleQuantityInput}
            autoFocus
            autoComplete="off"
          ></input>
        ) : (
          newQuantity
        )}
      </div>
      <div className={`flex justify-between w-10`}>
        {isEditing ? (
          <>
            <BsCheck2 size={20} onClick={handleItemQuantityUpate} />
            <BsX size={24} onClick={handleCloseEditor} />
          </>
        ) : (
          <>
            <HiOutlinePencilSquare onClick={handleEditing} size={18} />
            <RiDeleteBin6Line onClick={() => removeItem(order.id)} size={17} />
          </>
        )}
      </div>
    </div>
  );
}

export default RequestQuantityEditingBox;
