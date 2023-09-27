import axios from "axios";
import { showFeedbackMessage } from "./Functions";
const storeBaseUrl = "/api/store";
const requestBaseUrl = "/api/request";
const emailBaseUrl = "/api/email";

// store items

const getStoreItems = async () => {
  const { data: storeItemsList } = await axios.get(storeBaseUrl);
  // should sort based on items that have size and items that do not have size
  return storeItemsList;
};

const submitNewRequest = async (requestParams) => {
  const { data: newRequest } = await axios.post(requestBaseUrl, requestParams);
  return newRequest;
};

// requests

const requestSearch = async (requestId) => {
  const { data: request } = await axios.get(`${requestBaseUrl}/${requestId}`);
  return request;
};

// email
const sendEmail = async (receiver, requestId) => {
  const { data: response } = await axios.post(`${emailBaseUrl}`, {
    receiver,
    requestId,
  });
  return response;
};

const editRequest = async (requestId, newRequest) => {
  const { data: response } = await axios.put(
    `${requestBaseUrl}/${requestId}`,
    newRequest
  );
  return response;
};

const addToRequestFromStore = async (requestId, itemToAdd, setMessage) => {
  const originalRequest = await requestSearch(requestId);
  // check if the added item is inside the list alr
  if (
    originalRequest.requestedItems.findIndex(
      (originalRequestItem) => originalRequestItem.id === itemToAdd.id
    ) !== -1
  ) {
    showFeedbackMessage(
      `${itemToAdd.name} is already in your request`,
      "yellow",
      setMessage,
      4500
    );
    return;
  }
  const modifiedRequestedItems =
    originalRequest.requestedItems.concat(itemToAdd);
  const updatedOrder = await editRequest(requestId, {
    ...originalRequest,
    requestedItems: modifiedRequestedItems,
  });
  showFeedbackMessage(
    `${itemToAdd.name} added to your request`,
    "green",
    setMessage,
    3000
  );
  return updatedOrder;
};

export {
  getStoreItems,
  submitNewRequest,
  requestSearch,
  sendEmail,
  editRequest,
  addToRequestFromStore,
};
