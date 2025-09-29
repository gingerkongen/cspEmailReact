import React, { useState, useEffect } from "react";

import Navbar from "../components/NavBar";

import FilterRecieversPage from "./FilterRecieversPage";
import HomePage from "./HomePage";
import WriteEmailPage from "./WriteEmailPage";

const Home = () => {
  const [displayedPage, setDisplayedPage] = useState("home");
  const [goldData, setGoldData] = useState();

  const handleNavigation = (navigatedPage) => {
    const validChoices = ["home", "filter", "write"];
    if (validChoices.includes(String(navigatedPage))) {
      setDisplayedPage(String(navigatedPage));
      console.log(String(navigatedPage));
    }
  };

  //   useEffect(() => {
  //     if (goldData) {
  //       console.log(goldData);
  //     }
  //   }, [goldData]);

  return (
    <>
      <Navbar handleNavigation={handleNavigation} />
      <div className={displayedPage === "home" ? "block" : "hidden"}>
        <HomePage />
      </div>
      <div className={displayedPage === "filter" ? "block" : "hidden"}>
        <FilterRecieversPage
          deliverGoldData={(silverData) => setGoldData(silverData)}
        />
      </div>
      <div className={displayedPage === "write" ? "block" : "hidden"}>
        <WriteEmailPage goldData={goldData} />
      </div>
    </>
  );
};

export default Home;
