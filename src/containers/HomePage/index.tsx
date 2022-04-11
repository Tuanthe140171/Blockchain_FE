import AppLoading from "../../components/AppLoading";
import Banner from "./components/Banner";
import DonationCategory from "./components/DonationCategory";
import DonationCta from "./components/DonationCta";
import TopDonation from "./components/TopDonation";
import TopTierCharity from "./components/TopTierCharity";
import DefaultLayout from "../../layout/DefaultLayout";
import useFetch from "../../hooks/useFetch";
import { BigNumber } from "bignumber.js";

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
    totalDonation: new BigNumber(topPhilanthropist.totalDonation).div(1e18).toFixed(3),
    lastName: topPhilanthropist.lastName,
    name: topPhilanthropist.name,
    lastDonation: "3m ago",
    image: "/icon/bad-lucker-2.svg"
  })) : []

  const topTierOfCharity = data ? data.topTOCs.map((topTOC: any) => ({
    id: topTOC.id,
    name: `${topTOC.lastName || ""} ${topTOC.name || ""}`,
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với sức đối với",
    avatar: (function () {
      const userAvatar = topTOC.UserMedia.filter(
        (userMedia: any) =>
          userMedia.type === "1" && userMedia.active === 1
      )
        .slice(-1)
        .pop();
      return userAvatar
        ? userAvatar.link
        : "/icon/bad-lucker.svg";
    })(),
    circumstances: topTOC.BadLuckTypes.map(
      (badLuckType: any) => badLuckType.BadLuckerSituation.name
    ),
    trustScore: topTOC.trustScore,
    tierOfCharity: topTOC.tierCharity
  })) : []  

  const categories = data ? data.slides.map((slide: any) => ({
    id: slide.id,
    title: slide.name,
    url: "/a"
  })) : []

  const posts = data ? data.trends.map((trend: any) => ({
    id: trend.Post.id,
    title: trend.Post.title,
    content: trend.Post.content
  })) : []

  return (
    <DefaultLayout>
      <Banner posts={posts} />
      <TopTierCharity topTierOfCharity={topTierOfCharity} />
      <DonationCategory categories={categories} />
      <TopDonation donations={topPhilanthropists} />
      <DonationCta />
      {
        loading && <AppLoading showContent={false} loadingContent={<div></div>} />
      }
    </DefaultLayout>
  );
};

export default HomePage;
