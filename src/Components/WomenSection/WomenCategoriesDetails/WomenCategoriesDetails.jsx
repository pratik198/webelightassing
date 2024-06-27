import React, { useEffect, useState } from "react";
// import "./WomenCategoryDetails.css";
import { useParams } from "react-router-dom";
import { projectId } from "../../util/Util";
import { Link } from "react-router-dom";
import { womenImgUrl } from "../../Data/Data";
import { size } from "../../Data/Data";

const WomenCategoryDetails = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [sortOption, setSortOption] = useState("");

  //for the IMAGE at the top of the singleCategory page
  const getCategoryImage = (category) => {
    const categoryImage = womenImgUrl.find((img) => img.name === category);
    return categoryImage ? categoryImage.imageUrl : "";
  };

  const handleBrandChange = (event) => {
    //2- handling the brand selection.
    const brand = event.target.value;
    setSelectedBrand((prevBrand) => (prevBrand === brand ? null : brand));
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  const handleSortingChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
  };

  const fetchCategoryProducts = async () => {
    try {
      const limit = 1000;
      let url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"subCategory":"${category}"}&limit=${limit}`;

      if (sortOption) {
        const sortValue = JSON.parse(sortOption);
        if (sortValue) {
          url += `&sort=${sortOption}`;
        }
      }

      const options = {
        method: "GET",
        headers: {
          projectID: `${projectId}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      let womenProducts = data?.data?.filter((item) => item.gender === "Women");

      if (selectedSize.length > 0) {
        womenProducts = womenProducts.filter((p) =>
          selectedSize.includes(p.size)
        );
      }

      // if (selectedSize) {
      //   menProducts = menProducts.filter((p) =>
      //     p.size.includes(selectedSize)
      //   );
      // }
      //setBrands
      setBrands(
        Array.from(
          //1- this is to remove duplicates of the array.
          new Set( // to store unique elements in the array.
            data.data
              .filter((item) => item.gender === "Women" && item.brand)
              .map((item) => item.brand)
          )
        )
      );

      //setSizes
      // setSizes(
      //   Array.from(
      //     new Set(
      //       data.data
      //         .filter((item) => item.gender === "Men" && item.size)
      //         .map((item) => item.size)
      //     )
      //   )
      // );

      if (selectedBrand) {
        womenProducts = womenProducts.filter((p) => p.brand === selectedBrand); //if brands selected menProducts will filter only those brands.
      }

      setCategoryProducts(womenProducts.length ? womenProducts : data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, [category, selectedBrand, selectedSize, sortOption]);

  return (
    <div>
      <div className="category_image">
        <img src={getCategoryImage(category)} alt={category} />
      </div>
      <div className="divided_page">
        <div className="left_part">
          {/* <h5>
            <strong>PRODUCTS</strong>
          </h5>
          <input
            className="search_for_products"
            type="text"
            placeholder="Search for Products"
          /> */}
          <div className="category_checkbox_div">
            <h2
              className="single_category_details_h3_media_query"
              style={{ color: "#58595B" }}
            >
              Brands
            </h2>
            <div className="single_category_details_brands_media_query">
              {brands.map((brand) => (
                <div key={brand}>
                  <input
                    type="checkbox"
                    id={brand}
                    value={brand}
                    onChange={handleBrandChange}
                    checked={selectedBrand === brand}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </div>
              ))}
            </div>
            <div
              style={{
                backgroundColor: "#58595B",
                height: "0.5px",
                width: "95%",
                marginTop: "17px",
              }}
            ></div>
            <h3
              className="single_category_details_h3_media_query"
              style={{ color: "#58595B" }}
            >
              Size
            </h3>
            <div className="single_category_details_brands_media_query">
              {size.map((size) => (
                <div key={size}>
                  <input
                    type="checkbox"
                    value={size}
                    onChange={handleSizeChange}
                    checked={selectedSize === size}
                  />
                  <label>{size}</label>
                </div>
              ))}
            </div>
            <h3 className="single_category_details_h3_media_query">Sort By</h3>
            <select
              onChange={handleSortingChange}
              style={{ width: "71%", height: "29px", outline: "none" }}
            >
              <option value="">Select Sorting options</option>
              <option value='{"price":1}'>Price Low to High</option>
              <option value='{"price":-1}'>Price High to Low</option>
              <option value='{"name":1}'>A-Z</option>
              <option value='{"ratings":-1}'>Top Rated</option>
            </select>
          </div>
        </div>
        <div className="right_part">
          {categoryProducts.map((items, index) => (
            <Link
              to={`/getsingleproductdetails/${items._id}`}
              className="wishList_items single_category_details_media_query"
              key={index}
              style={{ textDecoration: "none" }}
            >
              <div className="wishlist_image single_category_details_image_media_query">
                <img src={items.displayImage} alt="" />
              </div>
              <div className="wishList_item_details">
                <h5 className="category_details_h5_media_query">
                  <strong>{items.name}</strong>
                </h5>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#DEDEDE",
                    width: "95%",
                    marginLeft: "7px",
                  }}
                ></div>
                <div
                  className="category_details_price_div_media_query"
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    height: "25px",
                    fontSize: "13.5px",
                    color: "#585c70",
                  }}
                >
                  <p>
                    <strong style={{ color: "#58595B" }}>
                      ₹ {items.price}
                    </strong>
                  </p>
                  <p
                    className="category_details_mrp_media_query"
                    style={{ fontSize: "15px", color: "#73757B" }}
                  >
                    MRP incl. of all taxes
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenCategoryDetails;
