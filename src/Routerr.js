import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Heading from "./Components/Heading/Heading";
import HomePageMen from "./Components/HomePageMen/HomePageMen";
import SingleProductDetails from "./Components/SingleProductDetails/SingleProductDetails";
import SignUpPage from "./Components/Login&SignUp/SignUpPage";
// import Routerr from "./Router/Routerr";
function Routerr() {
  return (
    <BrowserRouter>
      <Heading />
      <Routes>
        <Route path="/" element={<HomePageMen />} />
        <Route
          path="/getsingleproductdetails/:productId" //path of the productId sent.
          element={<SingleProductDetails />}
        />
        <Route path="/login/" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

///////////////////////////////////////////////////////
//Grouping without making an extra component.
// function HomeMen() {
//   return (
//     <div>
//       <MenCarousel />
//       <Categories />
//       {/* <TopRated />
//       <NewArrivals />
//       <Trending />
//       <TopSelling /> */}
//     </div>
//   );
// }
export default Routerr;
