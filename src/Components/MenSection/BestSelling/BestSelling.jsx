import React, { useEffect, useState } from "react";
import "./BestSelling.css";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BestSelling = () => {
  const [menData, setMenData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchData() {
    try {
      const limit = 50;
      const Url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"gender":"Men"}&limit=${limit}`;
      const options = {
        method: "GET",
        headers: { projectID: "kfdh4hevj36w" },
      };

      const response = await fetch(Url, options);
      const data = await response.json();
      // console.log(data)
      const menProducts = data?.data?.filter(
        (item) => item.gender === "Men" && item.sellerTag === "best seller"
      );
      // const topRated = menProducts.filter(
      //   (items) => items.sellerTag === "top rated"
      // );
      setMenData(menProducts || []);
      console.log(menData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const prevSlide = () => {
    console.log("prevBtn is clicked");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? menData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    console.log("nextBtn is clicked");
    setCurrentIndex((nextIndex) =>
      nextIndex === menData.length - 1 ? 0 : nextIndex + 1
    );
  };

  const slideStyle = {
    transform: `translateX(-${currentIndex * 75}%)`,
  };
  return (
    <div>
      <div className="heading">
        <h2>BEST SELLING</h2>
      </div>
      <div className="topRated_carousel_container">
        {menData.map((product, index) => (
          <Link
            to={`/getsingleproductdetails/${product._id}`} //the productID is sent.
            style={slideStyle}
            className="slides_container"
          >
            <div key={product._id} className="slides">
              <div className="topRated_image zoomable_img_div">
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
      {currentIndex != 0 && (
        <button
          className="bestSelling_btn bestSelling_prev_btn"
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
        className="bestSelling_btn bestSelling_next_btn"
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

export default BestSelling;
