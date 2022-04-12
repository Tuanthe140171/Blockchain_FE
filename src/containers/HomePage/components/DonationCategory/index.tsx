import React, { useState } from "react";
import { Image } from "antd";

import CategoryCard from "./components/CategoryCard";
import DonationCategoryItem from "./components/CategoryItem";
import "./index.scss";

type DonationCategoryProps = {
  categories: {
    id: string,
    title: string,
    url: string
  }[]
}

const DonationCategory: React.FC<DonationCategoryProps> = (props) => {
  const { categories } = props;
  const [activatedCategory, setActivatedCategory] = useState("");

  const mockData = [
    {
      image: "/icon/bad-lucker-4.svg",
      name: "Nguyễn Minh Thảo",
      desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với sức đối với",
      circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
      more: 2,
      tierOfCharity: 72,
      trustScore: 86,
      id: 1,
    },
    {
      image: "/icon/bad-lucker-5.svg",
      name: "Nguyễn Minh Thảo",
      desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
      circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
      more: 1,
      tierOfCharity: 76,
      trustScore: 69,
      id: 2,
    },
    {
      image: "/icon/bad-lucker-6.svg",
      name: "Nguyễn Diên Vĩ",
      desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
      circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
      more: 2,
      tierOfCharity: 76,
      trustScore: 69,
      id: 3,
    },
    {
      image: "/icon/bad-lucker-4.svg",
      name: "Nguyễn Diên Vĩ",
      desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
      circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
      more: 2,
      tierOfCharity: 76,
      trustScore: 69,
      id: 4,
    },
  ];

  const renderCards = (cards: any) => {
    if (cards.length > 0) {
      let cardGroups = [];
      for (let i = 0; i < mockData.length; i++) {
        if (i % 2 === 0) {
          let tempCategory = [];
          tempCategory.push(
            <CategoryCard
              image={mockData[i].image}
              name={mockData[i].name}
              desc={mockData[i].desc}
              circumstances={mockData[i].circumstances}
              more={mockData[i].more}
              tierOfCharity={mockData[i].tierOfCharity}
              trustScore={mockData[i].trustScore}
              key={mockData[i].id}
              style={{ marginBottom: 30 }}
            />
          );

          i + 1 <= mockData.length - 1 &&
            tempCategory.push(
              <CategoryCard
                image={mockData[i + 1].image}
                name={mockData[i + 1].name}
                desc={mockData[i + 1].desc}
                circumstances={mockData[i + 1].circumstances}
                more={mockData[i + 1].more}
                tierOfCharity={mockData[i + 1].tierOfCharity}
                trustScore={mockData[i + 1].trustScore}
                key={mockData[i + 1].id}
              />
            );

          cardGroups.push(
            <div className="donation-category__card-group" key={i}>
              {tempCategory}
            </div>
          );
        }
      }

      return cardGroups;
    }

    return;
  };

  return (
    <div className="donation-categories">
      <div 
        className="donation-categories__img"
      >
        <Image
            src="/icon/category-corner.svg"
            preview={false}
        />
      </div>
      <div className="donation-categories__list">
        <p className="donation-categories__title">CATEGORIES OF DONATION</p>
        <div className="donation-categories__menu">
          {categories.map((category) => (
            <DonationCategoryItem
              key={category.title}
              title={category.title}
              linkForward={category.url}
              active={activatedCategory === category.title}
              onClick={() => setActivatedCategory(category.title)}
            />
          ))}
        </div>
      </div>
      <div className="donation-categories__cards">{renderCards(mockData)}</div>
    </div>
  );
};

export default DonationCategory;
