import MessageBox from "./components/MessageBox";

function showFeedbackMessage(message, color, setStateMessage, timeout) {
  setStateMessage(<MessageBox color={color}>{message}</MessageBox>);
  return setTimeout(() => setStateMessage(""), timeout);
}

function getMinDay() {
  const today = new Date().toLocaleDateString("en-CA");
  const [year, month, day] = today.split("-");
  const minDate = new Date(
    year,
    month - 1,
    Number(day) + 14
  ).toLocaleDateString("en-CA");
  return minDate;
}

function convertStringToDate(dateString) {
  console.log(dateString);
  const dateArray = dateString.split("-");
  // since the months are zero indexed, take the month -1
  dateArray[1]--;
  return new Date(...dateArray);
}

function compareDates(a, b) {
  // should be a - b because I am arranging in ascending order.
  // closer - further < 0
  return convertStringToDate(a) - convertStringToDate(b);
}

// ensure that the input is a positive integer
function validateQuantity(number) {
  const numberRegex = /^\d+$/;
  return numberRegex.test(number);
}
// check if the item's variations should be displayed as a size or type
function variationLabel(item) {
  if (item.name === "Uniform Top") {
    return "Type";
  }
  return "Size";
}

// show a notificaiton if the available quantity is less than the requested quantity
function storeHasStock(storeItem, requestedItem) {
  return Number(requestedItem.quantity) <= storeItem.quantity;
}

export {
  getMinDay,
  showFeedbackMessage,
  compareDates,
  validateQuantity,
  variationLabel,
  storeHasStock,
};
