import React from "react";
// import Heading from "../Heading/Heading";
import MenCarousel from "../MenSection/MenCarousel/MenCarousel";
import Categories from "../MenSection/Categories/Categories";
import TopRated from "../MenSection/TopRated/TopRated";
import NewArrivals from "../MenSection/NewArrivals/NewArrivals";
import Trending from "../MenSection/Trending/Trending";
import BestSelling from "../MenSection/BestSelling/BestSelling";

const HomePageMen = () => {
  return (
    <div>
      {/* <Heading /> */}
      <MenCarousel />
      <Categories />
      <TopRated />
      <NewArrivals />
      <Trending />
      <BestSelling />
    </div>
  );
};

export default HomePageMen;
