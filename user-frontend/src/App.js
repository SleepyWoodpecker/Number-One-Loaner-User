import React, { useState, useEffect, useRef } from "react";
import StoreItemGallery from "./components/StoreItemGallery";
import OrderSubmissionPage from "./components/OrderSubmissionPage";
import RequestTracker from "./components/RequestTracker";
import { RiHome2Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { getStoreItems } from "./Services";
import TopBar from "./components/TopBar";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [totalOrder, setTotalOrder] = useState([]);

  // shifted the useEffect here because I did not want multiple fetch requests to the server everytime the user clicked on the catalogue page
  const [storeItems, setStoreItems] = useState([]);
  const sizedItems = useRef([]);
  const consolidatedItems = useRef(null);

  useEffect(() => {
    const sotreItemsRequest = async () => {
      const storeItemsList = await getStoreItems();
      sizedItems.current = storeItemsList.sizedItems;
      consolidatedItems.current = storeItemsList.items;
      setStoreItems(storeItemsList.items);
    };
    sotreItemsRequest();
  }, []);

  /* in the future can expand here by putting numbers on the basket */
  let displayedPage;

  if (activePage === "Home") {
    displayedPage = (
      <StoreItemGallery
        setTotalOrder={setTotalOrder}
        totalOrder={totalOrder}
        storeItems={storeItems}
        setStoreItems={setStoreItems}
        sizedItems={sizedItems}
        originalStore={consolidatedItems}
      />
    );
  } else if (activePage === "Shopping Cart") {
    displayedPage = (
      <OrderSubmissionPage
        setTotalOrder={setTotalOrder}
        totalOrder={totalOrder}
      />
    );
  } else if (activePage === "Request Tracker") {
    displayedPage = <RequestTracker />;
  }

  const handleHomeClick = () => {
    setActivePage("Home");
    // show Home
  };

  const handleShoppingCartClick = () => {
    setActivePage("Shopping Cart");
    // show shopping cart
  };

  const handleSearchClick = () => {
    setActivePage("Request Tracker");
  };

  return (
    <div
      className="p-4 h-full mb-10 mt-10 mid-point-2:max-w-md mid-point-2:mx-auto"
      style={{ height: "85vh" }}
    >
      <TopBar setActivePage={setActivePage} />
      {displayedPage}
      {/* // this is the nav bar at the bottom, but the nav bar cannot accommodate clicking  */}
      <div
        className="bg-orange-200 fixed bottom-0 left-0 right-0 pb-2 h-12 "
        style={{
          boxShadow:
            "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      >
        <ul className="w-full flex justify-around p-2 items-center">
          <li>
            <AiOutlineFileSearch
              size={30}
              onClick={handleSearchClick}
              style={{
                color: activePage === "Request Tracker" ? "black" : "#bfbdbd",
              }}
            />
          </li>
          <li>
            <RiHome2Line
              size={30}
              onClick={handleHomeClick}
              style={{
                color: activePage === "Home" ? "black" : "#bfbdbd",
              }}
            />
          </li>
          <li>
            <FiShoppingCart
              size={30}
              onClick={handleShoppingCartClick}
              style={{
                color: activePage === "Shopping Cart" ? "black" : "#bfbdbd",
              }}
            />
          </li>
        </ul>
      </div>
      <div className="h-0 w-0 bg-yellow-200"></div>
    </div>
  );
}

export default App;
