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

export { getMinDay, showFeedbackMessage, compareDates };
