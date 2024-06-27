import React, { useEffect } from "react";
import "./Categories.css";
import { Link } from "react-router-dom";
import { projectId } from "../../util/Util";

function Categories() {
  const categoriesData = [
    {
      name: "hoodie",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/t7_1_hJ0cLbU.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "jeans",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/mens_big_tile.jjeans_pg_ZSXKOC7.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "jogger",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/t5_1_CUdBnZq.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "shirt",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/mens_big_tile_1_RN8ZSTm.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "shorts",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/t3_3_XLfGj3L.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "sweater",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Tiles_Small_2_seIQjQJ.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "trouser",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/t6_4_km20iS1.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "tshirt",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Tiles_Small4_jXhYiqG.jpg?format=webp&w=480&dpr=1.3",
    },
  ];

  return (
    <section className="CatagoriesForMan__Parent--section">
      <section className="CatagoriesForMan__child--section">
        <h3 className="CatagoriesForMan_text">CATAGORIES</h3>
        <div className="top__categories">
          {categoriesData.slice(0, 3).map((category, index) => (
            <Link
              key={index}
              to={`/getsinglecategorydetails/${category.name}`}
              className="CatagoriesForMan__content__top"
            >
              <img
                className="CatagoriesForMan__content--image-1"
                src={category.imageUrl}
                alt={category.name}
              />
            </Link>
          ))}
        </div>
        <section className="CatagoriesForMan__content--section">
          {categoriesData.slice(3).map((category, index) => (
            <Link
              key={index}
              className="CatagoriesForMan__content"
              to={`/getsinglecategorydetails/${category.name}`}
            >
              <img
                className="CatagoriesForMan__content--image"
                src={category.imageUrl}
                alt={category.name}
              />
            </Link>
          ))}
        </section>
      </section>
    </section>
  );
}

export default Categories;
