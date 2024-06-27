import React from "react";
import "./WomenCategories.css";
import { Link } from "react-router-dom";

function WomenCategories() {
  const categoriesData = [
    // {
    //   name: "hoodie",
    //   imageUrl:
    //     "https://th.bing.com/th/id/OIG1.8f24IGUnELHfhptnQwss?w=1024&h=1024&rs=1&pid=ImgDetMain",
    // },
    {
      name: "jeans",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Women-Small-Tile-jeans_zam9Lv8.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "jogger",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Women-Small-Tile-Cargos--Joggers_MV7iBIF.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "jumpsuit",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Women-Big-Tile-dresses_0VuGeKT.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "shirt",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Women-Big-Tile-Shirts_XPS96Dq.jpg?format=webp&w=480&dpr=1.3",
    },
    // {
    //   name: "shorts",
    //   imageUrl:
    //     "https://th.bing.com/th/id/OIG1.rCHEdMJ8GvoZ67HDVsPw?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
    // },
    // {
    //   name: "sweater",
    //   imageUrl:
    //     "https://th.bing.com/th/id/OIG3.nIkXMZuEqKwbk28akK78?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
    // },
    // {
    //   name: "trouser",
    //   imageUrl:
    //     "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Women-Small-Tile-all-bottoms_EPMB4iB.jpg?format=webp&w=480&dpr=1.3",
    // },
    {
      name: "tshirt",
      imageUrl:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Women-Small-Tile-OST_PH18NMi.jpg?format=webp&w=480&dpr=1.3",
    },
    {
      name: "kurti",
      imageUrl:
        "https://th.bing.com/th/id/OIG4._zsMHHbfx368JNAaWiAF?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
    },
  ];
  return (
    <>
      <section className="categories_for_women">
        <h3 style={{ margin: "0" }} className="catagoriesForWomen_text">
          CATEGORIES
        </h3>
        <div className="women__top__categories">
          {categoriesData.slice(0, 3).map((categories, index) => (
            <Link
              to={`/womencategorydetails/${categories.name}`}
              key={index}
              className="CatagoriesForWomen__content__top"
            >
              <img
                className="zoomable_image"
                src={categories.imageUrl}
                alt={categories.name}
              />
            </Link>
          ))}
        </div>

        <div className="women__mid__categories">
          {categoriesData.slice(3).map((categories, index) => (
            <Link
              to={`/womencategorydetails/${categories.name}`}
              className="CategoriesForWomen__content__mid"
            >
              <img
                className="zoomable_image"
                src={categories.imageUrl}
                alt={categories.name}
              />
            </Link>
          ))}
        </div>
        {/* <div className="women__bottom__categories">
          {categoriesData.slice(7).map((categories, index) => (
            <div key={index} className="CategoriesForWomen__content__bottom">
              <img
                className="zoomable_image"
                src={categories.imageUrl}
                alt={categories.name}
              />
            </div>
          ))}
        </div> */}
      </section>
    </>
  );
}

export default WomenCategories;
