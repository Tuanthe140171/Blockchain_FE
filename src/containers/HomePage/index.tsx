import AppLoading from "../../components/AppLoading";
import Banner from "./components/Banner";
import DonationCategory from "./components/DonationCategory";
import DonationCta from "./components/DonationCta";
import TopDonation from "./components/TopDonation";
import TopTierCharity from "./components/TopTierCharity";
import DefaultLayout from "../../layout/DefaultLayout";
import useFetch from "../../hooks/useFetch";
//@ts-ignore
import { BigNumber } from "bignumber.js";
import { useState } from "react";
import moment from "moment";

const convertToLocaleString = (time: string) => {
  const t3 = time.replace("seconds", "giây");
  const t4 = t3.replace("minutes", "phút");
  const t5 = t4.replace("minute", "phút");
  const t6 = t5.replace("hours", "giờ");
  const t7 = t6.replace("hour", "giờ");
  const t8 = t7.replace("days", "ngày");
  const t9 = t8.replace("day", "ngày");
  const t10 = t9.replace("months", "tháng");
  const t11 = t10.replace("month", "tháng");
  const t12 = t11.replace("years", "năm");
  const t13 = t12.replace("year", "năm");
  const t14 = t13.replace("a few", "Một vài");
  const t15 = t14.replace("an", "Một");
  const t16 = t15.replace("a", "Một");
  return t16;
};

const getTimeDiff = (time: any) => {
  const timestamp = moment(time).fromNow(true);
  const convertedTime = convertToLocaleString(timestamp);
  return convertedTime;
};

const HomePage = () => { 
    const [activatedCategory, setActivatedCategory] = useState("1");
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
    lastDonation: getTimeDiff(topPhilanthropist.transactionsFrom[0].date),
    image: (function () {
      const userAvatar = topPhilanthropist.UserMedia.filter(
        (userMedia: any) =>
          userMedia.type === "1" && userMedia.active === 1
      )
        .slice(-1)
        .pop();

      return userAvatar
        ? userAvatar.link
        : "/icon/bad-lucker.svg";
    })()
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
    trustScore: topTOC.trustScore || 0,
    tierOfCharity: topTOC.tierCharity || 0
  })) : []  

  const categories = data ? data.slides.map((slide: any) => ({
    id: slide.id,
    title: slide.name,
    url: "/donee"
  })) : []

  const chosenSlide = data ? data.slides.filter((slide: any) => slide.id === activatedCategory) : undefined;
  const users = chosenSlide ? chosenSlide[0].Users.slice(0, 4).map((user: any) => ({
    id: user.id,
    name: `${user.lastName || ""} ${user.name || ""}`,
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với sức đối với",
    avatar: (function () {
      const userAvatar = user.UserMedia.filter(
        (userMedia: any) =>
          userMedia.type === "1" && userMedia.active === 1
      )
        .slice(-1)
        .pop();

      return userAvatar
        ? userAvatar.link
        : "/icon/bad-lucker.svg";
    })(),
    // circumstances: topTOC.BadLuckTypes.map(
    //   (badLuckType: any) => badLuckType.BadLuckerSituation.name
    // ),
    trustScore: user.trustScore || 0,
    tierOfCharity: user.tierCharity || 0
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
      <DonationCategory users={users} categories={categories}  setActivatedCategory={setActivatedCategory} activatedCategory={activatedCategory} />
      <TopDonation donations={topPhilanthropists} />
      <DonationCta />
      {
        loading && <AppLoading showContent={false} loadingContent={<div></div>} />
      }
    </DefaultLayout>
  );
};

export default HomePage;