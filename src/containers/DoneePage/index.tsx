import React, { useState } from "react";
import { Typography } from "antd";
import DoneeSearchFilter from "./components/DoneeSearchFilter";
import DoneeList from "./components/DoneeList";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";
import "./index.scss";

const DoneePage: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("tierCharity");
  const [situations, setSituations] = useState<number[]>([]);
  const [provinces, setProvinces] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputSearch, setInputSearch] = useState("");

  const debouncedKeyword = useDebounce<string>(inputSearch, 500);

  let url = `users/donees?page=${currentPage}&limit=8&keyword=${debouncedKeyword}&orderBy=${sortBy}&orderDirection=DESC&userType=4`;

  if (situations.length > 0) {
    situations.forEach((situation) => {
      url += `&situation[]=${situation}`;
    });
  }

  if (provinces.length > 0) {
    provinces.forEach((province) => {
      url += `&place[]=${province}`;
    });
  }

  const { data, loading } = useFetch<any>(url, {
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  return (
    <div className="donee">
      <Typography.Title level={3} className="donee__title">
        Người cần từ thiện
      </Typography.Title>
      <div className="donee__content">
        <DoneeSearchFilter
          setSituations={setSituations}
          setProvinces={setProvinces}
        />
        <DoneeList
          defaultPageSize={data ? data.limit : 10}
          pageSize={data ? data.limit : 10}
          total={data ? data.count : 0}
          current={currentPage}
          loading={loading}
          setCurrentPage={setCurrentPage}
          inputSearch={inputSearch}
          setInputSearch={(str: string) => setInputSearch(str)}
          setSortBy={(sortBy: string) => setSortBy(sortBy)}
          donees={
            data && data.rows
              ? data.rows.map((data: any) => ({
                  avatar: (function () {
                    const userAvatar = data.UserMedia.filter(
                      (userMedia: any) =>
                        userMedia.type === "1" && userMedia.active === 1
                    )
                      .slice(-1)
                      .pop();
                    return userAvatar
                      ? userAvatar.link
                      : "/icon/bad-lucker.svg";
                  })(),
                  name: data.name,
                  circumstances: data.BadLuckTypes.map(
                    (badLuckType: any) => badLuckType.BadLuckerSituation.name
                  ),
                  tierCharity: data.tierCharity,
                  trustScore: data.trustScore,
                  desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với sức đối với",
                  id: data.walletAddress,
                  location: data.country,
                  userId: data.id,
                }))
              : []
          }
        />
      </div>
    </div>
  );
};

export default DoneePage;
