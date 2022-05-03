import { Input, Select, Skeleton } from "antd";
import React from "react";
import AppPagination from "../../../../components/AppPagination";
import DoneeCard from "../DoneeCard";
import "./index.scss";

const { Search } = Input;
const { Option } = Select;

type Donee = {
  avatar: string;
  name: string;
  desc: string;
  circumstances: string[];
  tierCharity: number | undefined;
  trustScore: number | undefined;
  id: string;
  location: string;
  walletAddress: string;
  userId: string;
};

type DoneeListProps = {
  donees: Donee[];
  loading: boolean | undefined;
  defaultPageSize: number;
  pageSize: number;
  current: number;
  total: number;
  setCurrentPage: (page: number) => void;
  inputSearch: string;
  setInputSearch: (str: string) => void;
  setSortBy: (str: string) => void;
};

const DoneeList: React.FC<DoneeListProps> = (props) => {
  const { donees, loading, setSortBy } = props;

  return (
    <div className="donee-list">
      <header className="donee-list__header">
        <Search
          className="donee-list__search"
          placeholder="Tìm kiếm theo tên, vị trí ..."
          value={props.inputSearch}
          onChange={(e) => {
            props.setCurrentPage(1);
            props.setInputSearch(e.target.value.replace(/[^a-z0-9A-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g, ""));
          }}
        />
        <div className="donee-list__orderBy">
          <span>Sắp xếp theo</span>
          <Select
            defaultValue="tierCharity"
            style={{ width: 230 }}
            onChange={(value: any) => {
              setSortBy(value);
            }}
            className="donee-list__selection"
          >
            <Option value="trustScore">Trusted Score</Option>
            <Option value="tierCharity">Tier Of Charity</Option>
          </Select>
        </div>
      </header>
      {loading ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
            }}
          >
            {Array.from(new Array(5)).map((_, index) => (
              <Skeleton avatar={true} paragraph={true} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="donee-list__content">
          {donees.map((data) => (
            <DoneeCard
              image={data.avatar}
              name={data.name}
              desc={data.desc}
              circumstances={data.circumstances}
              more={
                data.circumstances.length > 2
                  ? data.circumstances.length - 2
                  : 0
              }
              tierOfCharity={data.tierCharity || 0}
              trustScore={data.trustScore || 0}
              location={data.location}
              key={data.id}
              walletAddress={data.id}
              userId={data.userId}
            />
          ))}
        </div>
      )}
      <div className="donee-list__pagination-wrapper">
        <AppPagination
          defaultPageSize={props.defaultPageSize}
          current={props.current}
          totalPage={props.total}
          pageSize={props.pageSize}
          onChange={(page: number) => props.setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default DoneeList;
