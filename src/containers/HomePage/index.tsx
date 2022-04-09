import AppLoading from "../../components/AppLoading";
import Banner from "./components/Banner";
import DonationCategory from "./components/DonationCategory";
import DonationCta from "./components/DonationCta";
import TopDonation from "./components/TopDonation";
import TopTierCharity from "./components/TopTierCharity";
import DefaultLayout from "../../layout/DefaultLayout";
import useFetch from "../../hooks/useFetch";

const HomePage = () => {
  const { data, loading } = useFetch<any>(
    'landing-page',
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {
      method: "GET",
    },
  );

  const topPhilanthropists = data ? data.topPhilanthropists.map((topPhilanthropist: any) => ({
    id: topPhilanthropist.id,
    totalDonation: topPhilanthropist.totalDonation,
    lastName: topPhilanthropist.lastName,
    name: topPhilanthropist.name,
    lastDonation: "3m ago",
    image: "/icon/bad-lucker-2.svg"
  })) : []

  return (
    <DefaultLayout>
      <Banner />
      <TopTierCharity />
      <DonationCategory />
      <TopDonation donations={topPhilanthropists} />
      <DonationCta />
      {
        loading && <AppLoading showContent={false} loadingContent={<div></div>} />
      }
    </DefaultLayout>
  );
};

export default HomePage;
