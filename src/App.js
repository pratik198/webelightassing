import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Heading from "./Components/Heading/Heading";
import HomePageMen from "./Components/HomePageMen/HomePageMen";
import SingleProductDetails from "./Components/SingleProductDetails/SingleProductDetails";
import SignUpPage from "./Components/Login&SignUp/SignUpPage";
import LoginPage from "./Components/Login&SignUp/LoginPage";
import PrivateRouter from "./Components/Router/PrivateRouter";
import Cart from "./Components/Cart/Cart";
import WishList from "./Components/WishList/WishList";
import { ProductIdProvider } from "./Components/Context/Context";
import SingleCategoryDetails from "./Components/SingleCategory/SingleCategoryDetails";
import HomePageWomen from "./Components/HomePageWomen/HomePageWomen";
import WomenCategoryDetails from "./Components/WomenSection/WomenCategoriesDetails/WomenCategoriesDetails";
import AddAddressPage from "./Components/AddAddressPage/AddAddressPage";
import PaymentPage from "./Components/PaymentPage/PaymentPage";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import SearchItems from "./Components/SearchPage/SearchItems";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Heading />
      <ProductIdProvider>
        <Routes>
          <Route path="/" element={<HomePageMen />} />
          <Route path="/women" element={<HomePageWomen />} />
          <Route
            path="/getsingleproductdetails/:productId" //path of the productId sent.
            element={<SingleProductDetails />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route element={<PrivateRouter />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/delivery-address" element={<AddAddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
          </Route>
          <Route
            path="/getsinglecategorydetails/:category" //path of the category sent.
            element={<SingleCategoryDetails />}
          />
          <Route
            path="/womencategorydetails/:category"
            element={<WomenCategoryDetails />}
          />
          <Route path="/search/:term" element={<SearchItems />} />
        </Routes>
      </ProductIdProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
