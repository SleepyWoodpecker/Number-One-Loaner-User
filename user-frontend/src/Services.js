import axios from "axios";
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

export { getStoreItems, submitNewRequest, requestSearch, sendEmail };
