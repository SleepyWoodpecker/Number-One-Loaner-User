import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { requestSearch } from "../Services";
import MessageBox from "./MessageBox";
import RequestTable from "./RequestTable";
import { LuHistory } from "react-icons/lu";

function RequestTracker({ setRequestToAdd, setActivePage }) {
  const [searchId, setSearchId] = useState("");
  const [requestData, setRequestData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showRequestRetrieval, setShowRequestRetrieval] = useState(false);
  const [showLastRecord, setShowLastRecord] = useState(false);
  const handleSearchInput = (e) => setSearchId(e.target.value);

  const handleRequestSearch = async (e, searchId) => {
    let request;
    e.preventDefault();
    try {
      request = await requestSearch(searchId);
    } catch (err) {
      request = err.response.data;
      setShowMessage(true);
    }
    handleCloseLastRecord();
    setRequestData(request);
  };

  const handleShowLastRecord = () => {
    setShowLastRecord(true);
  };

  const handleCloseLastRecord = () => {
    setShowLastRecord(false);
  };

  const getLatestRequest = (e) => {
    const latestRequest = localStorage.getItem("requestId");
    if (!latestRequest) {
      setShowRequestRetrieval(
        <MessageBox color={"red"}>
          No record of request submitted on this device
        </MessageBox>
      );
      setTimeout(() => setShowRequestRetrieval(""), 3000);
    } else {
      setSearchId(latestRequest);
      handleRequestSearch(e, latestRequest);
    }
    handleCloseLastRecord();
  };

  let requestDisplay;
  if (requestData === null) {
    requestDisplay = "";
  } else if (requestData.id) {
    requestDisplay = (
      <RequestTable
        requestData={requestData}
        setRequestData={setRequestData}
        setRequestToAdd={setRequestToAdd}
        setActivePage={setActivePage}
      />
    );
  } else if (requestData.error || requestData === "") {
    requestDisplay = showMessage && (
      <MessageBox color={"red"}>{requestData.error}</MessageBox>
    );
    setTimeout(() => setShowMessage(false), 3000);
  }

  return (
    <div className="relative w-full">
      <div className="z-30">
        <SearchBar
          value={searchId}
          handleSearchInput={handleSearchInput}
          handleRequestSearch={(e) => handleRequestSearch(e, searchId)}
          placeholder={"Enter your request ID"}
          onFocus={handleShowLastRecord}
          // onBlur={handleCloseLastRecord} I really have no idea how to fix this onBlur thing, so I gave up
        />
      </div>

      <div className="absolute ml-3 mr-3 top-10" style={{ width: "92.8%" }}>
        {showLastRecord && (
          <>
            <div onClick={getLatestRequest}>
              <div className="p-2 pt-5 w-full flex justify-between items-center border-2 border-t-0 rounded-b-lg text-sm z-20">
                Use last request submitted on this device
                <LuHistory />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center items-center m-3 mt-5">
        {requestDisplay}
      </div>
      <div className="flex justify-center items-center m-3 mt-5">
        {showRequestRetrieval}
      </div>
    </div>
  );
}

export default RequestTracker;
