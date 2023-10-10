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
  categories,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");
  const [chosenCategory, setChosenCategory] = useState("All");

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

  let storeItemsDisplay;

  if (storeItems === null) {
    return <div className="flex justify-center items-center">LOADING...</div>;
  }

  if (storeItems) {
    storeItemsDisplay =
      storeItems.length === 0 ? (
        <div className="flex justify-center items-center">Item not found</div>
      ) : (
        storeItems.map((storeItemData) => (
          <StoreItem
            storeItemData={storeItemData}
            totalOrder={totalOrder}
            key={storeItemData.id}
            setTotalOrder={setTotalOrder}
            sizedItems={sizedItems}
            requestToAdd={requestToAdd}
          />
        ))
      );
  }

  const handleFilterChange = (e) => {
    const newCategory = e.target.value;
    setSearchInput("");
    setChosenCategory(newCategory);
    if (newCategory === "all") {
      setStoreItems(originalStore.current);
      return;
    }
    storeItemsDisplay = originalStore.current.filter(
      (storeItem) => storeItem.category === newCategory
    );
    setStoreItems(storeItemsDisplay);
  };

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
        categories={categories}
        filter={chosenCategory}
        handleFilterChange={handleFilterChange}
        placeholder={`Search in ${
          chosenCategory === "all" ? "store" : chosenCategory
        } items...`}
        handleSearchInput={handleSearchInput}
        handleRequestSearch={handleRequestSearch}
        value={searchInput}
      />
      <div
        className="flex justify-around flex-wrap overflow-y-scroll items-center"
        style={{ height: "34.5rem" }}
      >
        {storeItemsDisplay}
      </div>
    </div>
  );
}

export default StoreItemGallery;
