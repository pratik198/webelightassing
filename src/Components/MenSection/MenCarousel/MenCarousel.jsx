import React, { useEffect, useState } from "react";
import "./MenCarousel.css";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const MenCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-Banner-copy.jpg?format=webp&w=1500&dpr=1.3",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web-banner_2_riunQNc.jpg?format=webp&w=1374&dpr=1.0",
    "https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/7199120240225121644.jpg?format=webp&w=1500&dpr=1.3",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web_4.jpg?format=webp&w=1500&dpr=1.3",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_1_dJYGOBE.jpg?format=webp&w=1374&dpr=1.0",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_Banner_just_launched_2.jpg?format=webp&w=1500&dpr=1.3",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_oversized_t-shirt_bif_vive_big_print.jpg?format=webp&w=1374&dpr=1.0",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web-banner_1_vLSlS1v.jpg?format=webp&w=1374&dpr=1.0",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-Banner_21.jpg?format=webp&w=1374&dpr=1.0",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web_copy_1.jpg?format=webp&w=1500&dpr=1.3",
  ];

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
    console.log("prev btn is clicked");
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    console.log("next btn is clicked");
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="carousel_container">
        <div
          className="carousel_slide"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <img key={index} src={image} style={{ width: "100%" }} alt=".." />
          ))}
        </div>
        <button className="men_carousel_btn prev_btn" onClick={prevSlide}>
          <FaAngleLeft
            style={{
              filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8))",
              color: "white",
              fontSize: "35px",
            }}
          />
        </button>
        <button className="men_carousel_btn next_btn" onClick={nextSlide}>
          <FaAngleRight
            style={{
              filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8))",
              color: "white",
              fontSize: "35px",
            }}
          />
        </button>
      </div>
      <br />
      <br />
      <br />
      <div className="carousel_dots_div">
        <div className="carousel_dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? "dot active" : "dot"}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenCarousel;
