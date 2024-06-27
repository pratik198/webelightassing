import React, { useEffect } from "react";
import { useState } from "react";
import "./WomenNewArrivals.css";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const WomenNewArrivals = () => {
  const [womenData, setWomenData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    try {
      const limit = 50;
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"gender":"Women"}&limit=${limit}`;
      const options = {
        method: "GET",
        headers: { projectID: "kfdh4hevj36w" },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      // const womenProducts = data?.data?.filter(
      //   (item) => item.gender === "Women" && item.sellerTag === "new arrival"
      // );
      // setWomenData(womenProducts || []);
      setWomenData(
        data?.data?.filter(
          (item) => item.gender === "Women" && item.sellerTag === "new arrival"
        )
      );
      console.log(womenData);
    } catch (err) {
      console.error("err");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const prevSlide = () => {
    console.log("nextBtn is clicked");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? womenData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    console.log("prevBtn is clicked");
    setCurrentIndex((nextIndex) =>
      nextIndex === womenData.length - 1 ? 0 : nextIndex + 1
    );
  };

  const slideStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  return (
    <div>
      <div className="heading">
        <h2>NEW ARRIVALS</h2>
      </div>
      <div className="topRated_carousel_container">
        {womenData.map((product, index) => (
          <Link
            to={`/getsingleproductdetails/${product._id}`}
            style={slideStyle}
            className="slides_container"
          >
            <div key={product._id} className="slides">
              <div
                className="women_new_arr_img_div"
                style={{ overflow: "hidden" }}
              >
                <img
                  className="zoomable_image"
                  style={{ height: "100%", width: "100%" }}
                  src={product.displayImage}
                  alt=".."
                />
              </div>
              <p className="product_brand_name">
                <strong>{product.brand}</strong>
              </p>
              <div className="underLine"></div>
              <p className="product_subcategory_name">{product.subCategory}</p>
              <p className="product_price">
                <strong>₹{product.price}</strong>
              </p>
            </div>
          </Link>
        ))}
      </div>
      {currentIndex !== 0 && (
        <button
          className="women_newArrivals_btn women_newArrivals_prev_btn"
          // className={currentIndex === 0 ? "hidden" : "prev_btn"}
          // style={{ display: currentIndex === 0 ? "none" : "" }}
          onClick={prevSlide}
        >
          <FaAngleLeft
            style={{
              filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8))",
              color: "white",
              fontSize: "35px",
            }}
          />
        </button>
      )}
      <button
        className="women_newArrivals_btn women_newArrivals_next_btn"
        onClick={nextSlide}
      >
        <FaAngleRight
          style={{
            filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8))",
            color: "white",
            fontSize: "35px",
          }}
        />
      </button>
    </div>
  );
};

export default WomenNewArrivals;
