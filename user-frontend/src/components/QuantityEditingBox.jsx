import React, { useRef, useState } from "react";
import { BsCheck2, BsX } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function QuantityEditingBox({
  order,
  totalOrder,
  setTotalOrder,
  removeItem,
  width = 32,
}) {
  const originalQuantity = useRef(order.quantity);
  const [isEditing, setIsEditing] = useState(false);
  // must remember to change both the quantity and the original quantity I guess
  const [newValue, setNewValue] = useState(order.quantity);
  const handleEditing = () => setIsEditing(true);
  const handleCloseEditor = () => {
    setIsEditing(false);
    if (newValue === "") {
      setNewValue(originalQuantity.current);
    }
  };
  const handleValueInput = (e) => setNewValue(e.target.value);
  const handleItemQuantityUpate = () => {
    handleCloseEditor();
    // can just add on later about how it cannot be a string
    if (newValue !== "") {
      setTotalOrder((totalOrder) =>
        totalOrder.map((orderListItem) =>
          orderListItem.id === order.id
            ? {
                ...orderListItem,
                quantity: Number(newValue),
                originalQuantity: Number(newValue),
              }
            : orderListItem
        )
      );
      originalQuantity.current = newValue;
    }
  };

  return (
    <div className="flex justify-between">
      <div className={`flex justify-center w-${width} items-center text-sm`}>
        {`${order.name} - `}
        {isEditing ? (
          <input
            className=" focus-visible:outline-orange-500 border-2 w-9 text-center rounded-sm"
            value={newValue}
            onChange={handleValueInput}
            autoFocus
            autoComplete="off"
          ></input>
        ) : (
          newValue
        )}
        {/* need think of a better way to delete the entry */}
      </div>
      <div className="flex justify-evenly items-center w-20">
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

export default QuantityEditingBox;
