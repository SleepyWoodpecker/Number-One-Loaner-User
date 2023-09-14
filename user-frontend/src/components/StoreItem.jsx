import React, { useState } from "react";
import StoreItemModal from "./StoreItemModal";

function StoreItem({ storeItemData, totalOrder, setTotalOrder, sizedItems }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      {message}
      <div className="rounded-xl shadow-lg p-2 flex items-center jutstify-around m-1 border-2">
        <div onClick={openModal} className="">
          <img
            src={storeItemData.imgUrl}
            alt={storeItemData.name}
            // to ensure that the items remain centered, these values have to be numbers instead of percentages
            className="w-32 h-32 rounded"
          />
          <h2 className="text-center">{storeItemData.name}</h2>
        </div>
        {showModal && (
          <StoreItemModal
            closeModal={closeModal}
            storeItem={storeItemData}
            totalOrder={totalOrder}
            setTotalOrder={setTotalOrder}
            setMessage={setMessage}
            sizedItems={sizedItems}
          />
        )}
      </div>
    </>
  );
}

export default StoreItem;
