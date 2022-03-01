import React from "react";
import Banner from "./components/Banner";
import DonationCategory from "./components/DonationCategory";
import DonationCta from "./components/DonationCta";
import TopDonation from "./components/TopDonation";
import TopTierCharity from "./components/TopTierCharity";
import DefaultLayout from "../../layout/DefaultLayout";

const HomePage = () => {
  return (
    <DefaultLayout>
      <Banner />
      <TopTierCharity />
      <DonationCategory />
      <TopDonation />
      <DonationCta />
    </DefaultLayout>
  );
};

export default HomePage;
