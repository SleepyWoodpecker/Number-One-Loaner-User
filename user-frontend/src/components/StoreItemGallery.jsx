import React, { useEffect, useState } from "react";
import StoreItem from "./StoreItem";
import SearchBar from "./SearchBar";
import { showFeedbackMessage } from "../Functions";

function StoreItemGallery({
  setTotalOrder,
  totalOrder,
  storeItems,
  setStoreItems,
  sizedItems,
  originalStore,
  requestToAdd,
  setRequestToAdd,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (requestToAdd) {
      showFeedbackMessage(
        `You are currently editing your request`,
        `yellow`,
        setMessage,
        4000
      );
    }
  }, [requestToAdd]);

  let storeItemsDisplay =
    storeItems.length === 0
      ? "LOADING..."
      : storeItems.map((storeItemData) => (
          <StoreItem
            storeItemData={storeItemData}
            totalOrder={totalOrder}
            key={storeItemData.id}
            setTotalOrder={setTotalOrder}
            sizedItems={sizedItems}
            requestToAdd={requestToAdd}
          />
        ));

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input === "") {
      storeItemsDisplay = originalStore.current;
    } else {
      storeItemsDisplay = originalStore.current.filter((storeItem) =>
        storeItem.name.toLowerCase().includes(input.toLowerCase())
      );
    }

    setStoreItems(storeItemsDisplay);
  };

  const handleRequestSearch = () => {
    return;
  };

  const removeRequestModification = () => setRequestToAdd(null);

  let addingStatus = "";
  if (requestToAdd)
    addingStatus = (
      <div className="mx-3 flex justify-center items-center">
        <div
          className="bg-red-200 rounded-md p-1 px-3 text-sm text-center"
          onClick={removeRequestModification}
        >
          Exit request editing mode
        </div>
      </div>
    );

  return (
    <div className="flex justify-evenly flex-col h-full">
      {message}
      {addingStatus}
      <SearchBar
        placeholder="Search Store Items"
        handleSearchInput={handleSearchInput}
        handleRequestSearch={handleRequestSearch}
        value={searchInput}
      />
      <div
        className="flex justify-around flex-wrap overflow-y-scroll"
        style={{ height: "34.5rem" }}
      >
        {storeItemsDisplay}
      </div>
    </div>
  );
}

export default StoreItemGallery;
