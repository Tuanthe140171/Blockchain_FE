import React from "react";
import Banner from "./components/Banner";
import TopTierCharity from "./components/TopTierCharity";
import DonationCategory from "./components/DonationCategory";
import TopDonation from "./components/TopDonation";
import DonationCta from "./components/DonationCta";

const HomePage = () => {
  return (
    <>
      <Banner />
      <TopTierCharity />
      <DonationCategory />
      <TopDonation />
      <DonationCta />
    </>
  )
};

export default HomePage;
