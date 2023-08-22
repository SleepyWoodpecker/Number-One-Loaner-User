import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { requestSearch } from "../Services";
import MessageBox from "./MessageBox";
import RequestTable from "./RequestTable";

function RequestTracker() {
  const [searchId, setSearchId] = useState("");
  const [requestData, setRequestData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const handleSearchInput = (e) => setSearchId(e.target.value);

  const handleRequestSearch = async (e) => {
    let request;
    e.preventDefault();
    try {
      request = await requestSearch(searchId);
    } catch (err) {
      request = err.response.data;
      setShowMessage(true);
    }
    setRequestData(request);
  };

  let requestDisplay;

  if (requestData === null) {
    requestDisplay = "";
  } else if (requestData.id) {
    requestDisplay = <RequestTable requestData={requestData} />;
  } else if (requestData.error || requestData === "") {
    requestDisplay = showMessage && (
      <MessageBox color={"red"}>{requestData.error}</MessageBox>
    );
    setTimeout(() => setShowMessage(false), 3000);
  }

  return (
    <div>
      <SearchBar
        value={searchId}
        handleSearchInput={handleSearchInput}
        handleRequestSearch={handleRequestSearch}
        placeholder={"Enter your request ID"}
      />
      <div className="flex justify-center items-center m-3">
        {requestDisplay}
      </div>
    </div>
  );
}

export default RequestTracker;
