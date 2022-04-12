import React, { useState } from "react";
import { Image } from "antd";

import CategoryCard from "./components/CategoryCard";
import DonationCategoryItem from "./components/CategoryItem";
import "./index.scss";

type DonationCategoryProps = {
  categories: {
    id: string,
    title: string,
    url: string,
  }[],
  users: {
    avatar: string,
    name: string,
    desc: string,
    more: number,
    tierOfCharity: number,
    trustScore: number,
    id: string
  }[],
  activatedCategory: string,
  setActivatedCategory: React.Dispatch<React.SetStateAction<string>>
}

const DonationCategory: React.FC<DonationCategoryProps> = (props) => {
  const { users, categories, activatedCategory, setActivatedCategory } = props;

  const renderCards = (cards: any) => {
    if (cards.length > 0) {
      let cardGroups = [];
      for (let i = 0; i < users.length; i++) {
        if (i % 2 === 0) {
          let tempCategory = [];
          tempCategory.push(
            <CategoryCard
              image={users[i].avatar}
              name={users[i].name}
              desc={users[i].desc}
              // circumstances={users[i].circumstances}
              more={users[i].more}
              tierOfCharity={users[i].tierOfCharity}
              trustScore={users[i].trustScore}
              key={users[i].id}
              style={{ marginBottom: 30 }}
            />
          );

          i + 1 <= users.length - 1 &&
            tempCategory.push(
              <CategoryCard
                image={users[i + 1].avatar}
                name={users[i + 1].name}
                desc={users[i + 1].desc}
                // circumstances={users[i + 1].circumstances}
                more={users[i + 1].more}
                tierOfCharity={users[i + 1].tierOfCharity}
                trustScore={users[i + 1].trustScore}
                key={users[i + 1].id}
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
              active={activatedCategory === category.id}
              onClick={() => setActivatedCategory(category.id)}
            />
          ))}
        </div>
      </div>
      <div className="donation-categories__cards">{renderCards(users)}</div>
    </div>
  );
};

export default DonationCategory;
