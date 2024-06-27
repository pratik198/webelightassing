import React from "react";
import WomenCarousel from "../WomenSection/WomenCarousel/WomenCarousel";
import WomenCategories from "../WomenSection/WomenCategories/WomenCategories";
import WomenNewArrivals from "../WomenSection/NewArrivals/WomenNewArrivals";
import WomenTopRated from "../WomenSection/WomenTopRated/WomenTopRated";
import WomenTrending from "../WomenSection/WomenTrending/WomenTrending";
import WomenBestSelling from "../WomenSection/WomenBestSelling/WomenBestSelling";

function HomePageWomen() {
  return (
    <div>
      <WomenCarousel />
      <WomenCategories />
      <WomenNewArrivals />
      <WomenTopRated />
      <WomenTrending />
      <WomenBestSelling />
    </div>
  );
}

export default HomePageWomen;
