import React, { useState } from "react";
import { data } from "./AllProductsData";
import { Link, useParams } from "react-router-dom";

function SearchItems() {
  const { term } = useParams();
  // const [brands, setBrands] = useState([]);
  // const [selectedBrand, setSelectedBrand] = useState(null);
  // const [selectedSize, setSelectedSize] = useState([]);

  const filteredData = data.filter((item) => {
    const { name, seller, subCategory } = item;
    const lowercaseQuery = term.toLowerCase();
    return (
      name.toLowerCase().includes(lowercaseQuery) ||
      seller.name.toLowerCase().includes(lowercaseQuery) ||
      subCategory.toLowerCase().includes(lowercaseQuery)
    );
  });

  return (
    <div>
      <div className="divided_page">
        <div className="left_part">
          <h5>
            <strong>PRODUCTS</strong>
          </h5>
          <input
            className="search_for_products"
            type="text"
            placeholder="Search for Products"
          />
          {/* <div className="category_checkbox_div">
            <h2 style={{ color: "#58595B" }}>Brands</h2>
            {brands.map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  id={brand}
                  value={brand}
                  // onChange={handleBrandChange}
                  checked={selectedBrand === brand}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            ))}
            <div
              style={{
                backgroundColor: "#58595B",
                height: "0.5px",
                width: "95%",
                marginTop: "17px",
              }}
            ></div>
            <h3 style={{ color: "#58595B" }}>Size</h3>
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
            <h3>Sort By</h3>
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
          </div> */}
        </div>
        <div className="right_part">
          {filteredData.map((items) => (
            <Link
              to={`/getsingleproductdetails/${items._id}`}
              className="wishList_items search_items"
              key={items._id}
              style={{ textDecoration: "none" }}
            >
              <div className="wishlist_image">
                <img src={items.displayImage} alt="" />
              </div>
              <div className="wishList_item_details">
                <h5>
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
                  <p style={{ fontSize: "15px", color: "#73757B" }}>
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
}

export default SearchItems;
