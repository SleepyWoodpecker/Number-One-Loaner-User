import React, { useRef, useState } from "react";
import StoreItem from "./StoreItem";
import SearchBar from "./SearchBar";

function StoreItemGallery({
  setTotalOrder,
  totalOrder,
  storeItems,
  setStoreItems,
  sizedItems,
}) {
  const [searchInput, setSearchInput] = useState("");
  const originalStore = useRef(storeItems);
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
          />
        ));

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    storeItemsDisplay = originalStore.current.filter((storeItem) =>
      storeItem.name.toLowerCase().includes(input.toLowerCase())
    );
    setStoreItems(storeItemsDisplay);
  };

  const handleRequestSearch = () => {
    return;
  };

  return (
    <div className="flex justify-evenly flex-col h-full">
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
