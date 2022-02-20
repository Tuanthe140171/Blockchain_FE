import React from "react";
import Banner from "./components/Banner";
import TopTierCharity from "./components/TopTierCharity";
import DonationCategory from "./components/DonationCategory";

const HomePage = () => {
  return (
    <>
      <Banner />
      <TopTierCharity />
      <DonationCategory />
    </>
  )
};

export default HomePage;
