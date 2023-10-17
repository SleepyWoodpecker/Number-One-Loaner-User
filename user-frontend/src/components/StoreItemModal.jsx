import React, { useState } from "react";
import Modal from "./Modal";
import ControlledNumberInput from "./ControlledNumberInput";
import {
  showFeedbackMessage,
  storeHasStock,
  validateQuantity,
  variationLabel,
} from "../Functions";
import { addToRequestFromStore } from "../Services";

function StoreItemModal({
  closeModal,
  storeItem,
  totalOrder,
  setTotalOrder,
  setMessage,
  sizedItems,
  requestToAdd,
}) {
  const hasSizes = storeItem.sizes.length > 0;
  // console.log(totalOrder);
  const [canSubmit, setCanSubmit] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");

  const handleQuantityChange = (e) => {
    const input = e.target.value;
    setQuantity(input);
    if (!input) {
      // prevent the user from submitting an entry
      preventSubmit();
    } else {
      allowSubmit();
    }
  };

  const preventSubmit = () => {
    setCanSubmit(false);
  };

  const allowSubmit = () => {
    setCanSubmit(true);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  let sizeDropdown = "";
  if (hasSizes) {
    sizeDropdown = (
      <div className="flex justify-center items-center mt-3 w-full">
        <label
          htmlFor="storeItemSize"
          style={{ width: 64.25 }}
          className="text-center"
        >
          {variationLabel(storeItem)}:
        </label>
        <select
          className="focus-visible:outline-orange-500 border-2 px-1.5 py-0.5 justify-self-end w-36 rounded-md m-2 text-center"
          id="storeItemSize"
          value={size}
          onChange={handleSizeChange}
        >
          <option>{""}</option>
          {storeItem.sizes.map((size) => (
            <option key={size} className="text-center">
              {size}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const submitForm = async (e, storeItemData) => {
    e.preventDefault();
    // should add some checking to update the new quantity of the item
    // only add the order if the quantity is positive
    if (!validateQuantity(quantity) || quantity <= 0) {
      showFeedbackMessage(
        "Quantity must be a number!",
        "red",
        setMessage,
        3500
      );
      return;
    }

    if (hasSizes && !size) {
      showFeedbackMessage("Select a size/variation!", "red", setMessage, 3500);
      return;
    }

    // nneed to make an additional check here based on that status
    if (quantity > 0 && !hasSizes) {
      // check if the store item already exists in the cart
      if (
        !requestToAdd &&
        totalOrder.findIndex((order) => order.id === storeItemData.id) !== -1
      ) {
        showFeedbackMessage(
          `${storeItemData.name} is already in the cart`,
          "yellow",
          setMessage,
          2000
        );
        closeModal();
        return;
      }
    }

    let newItem, requestedStoreItem;
    // if the item is a sized item
    if (hasSizes) {
      sizedItems.current.forEach((sizedItem) => {
        const [itemName, itemSize] = sizedItem.name.split(" - ");
        // match the selected item to its entry in the DB
        if (
          itemName === storeItem.name &&
          (`(Size ${size})` === itemSize || `(${size})` === itemSize)
        ) {
          newItem = {
            id: sizedItem.id,
            name: `${itemName} ${itemSize}`,
            quantity,
            originalQuantity: quantity,
            returnedQuantity: 0,
            imgUrl: sizedItem.imgUrl,
            consolidatedItemId: sizedItem.consolidatedItemId,
          };
          requestedStoreItem = sizedItem;
        }
      });
      if (
        !requestToAdd &&
        totalOrder.findIndex((order) => order.id === newItem.id) !== -1
      ) {
        showFeedbackMessage(
          `${newItem.name} is already in the cart`,
          "yellow",
          setMessage,
          3500
        );
        closeModal();
        return;
      } else {
        if (requestToAdd) {
          await addToRequestFromStore(requestToAdd, newItem, setMessage);
        } else {
          setTotalOrder((totalOrder) => totalOrder.concat(newItem));
        }
      }
    } else {
      newItem = {
        id: storeItemData.id,
        name: storeItemData.name,
        quantity,
        originalQuantity: quantity,
        returnedQuantity: 0,
        imgUrl: storeItemData.imgUrl,
      };
      requestedStoreItem = storeItemData;
      if (requestToAdd) {
        await addToRequestFromStore(requestToAdd, newItem, setMessage);
      } else {
        setTotalOrder((previousOrder) => {
          return previousOrder.concat(newItem);
        });
      }
    }

    // tell user if the store does not currently have enough quantity to satisfy the order
    if (!storeHasStock(requestedStoreItem, newItem)) {
      showFeedbackMessage(
        `Quantity of ${requestedStoreItem.name} requested is more than we have in stock. While your order has been recorded, we might be unable to fulfil it.`,
        "yellow",
        setMessage,
        4500
      );
    } else if (!requestToAdd) {
      showFeedbackMessage(
        `${storeItemData.name} added to order`,
        "green",
        setMessage,
        1000
      );
    }

    // add more functionality, such that if the old order for that item already exists, just udpate the quantity with the new quantity
    closeModal();
  };
  return (
    <div>
      <Modal handleModalClose={closeModal}>
        <div className="w-full h-full flex justify-center items-center flex-col">
          {/* styling of image abit sus though */}
          <img
            src={storeItem.imgUrl}
            alt={`${storeItem.name}`}
            className="max-h-80 max-w-8xl flex-grow"
          ></img>
          <h2 className="text-center">{storeItem.name}</h2>
          <form
            onSubmit={(e) => submitForm(e, storeItem)}
            className="text-cente flex flex-col items-center"
          >
            {sizeDropdown}
            <ControlledNumberInput
              storeItem={storeItem}
              preventSubmit={preventSubmit}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
            />
            <button
              type="submit"
              disabled={!canSubmit}
              onClick={(e) => submitForm(e, storeItem)}
              className="text-center p-2 bg-orange-200 my-1 rounded-md"
            >
              Add to request
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default StoreItemModal;
