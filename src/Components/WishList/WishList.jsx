import React, { useEffect, useState } from "react";
import "./WishList.css";
import { token } from "../util/Util";
import { projectId } from "../util/Util";
import { Link, useNavigate } from "react-router-dom";
import EmptyWishList from "../../Assets/EmptyWishList.png";
import { useProductId } from "../Context/Context";

const WishList = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [results, setResults] = useState("");
  // const { productId } = useParams();    // productId is recieved here
  const { productIds } = useProductId();
  console.log(productIds);
  // const navigate = useNavigate();
  const getWishListItems = async () => {
    try {
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: `${projectId}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setWishlistData(data.data.items);
      setResults(data.results);
      console.log(wishlistData);
    } catch (error) {}
  };
  useEffect(() => {
    getWishListItems();
  }, []);

  /////////// MOVE TO CART ///////////////
  const moveToCart = async (productId) => {
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: `${projectId}`,
        },
        body: JSON.stringify({
          quantity: "1",
          size: "s",
        }),
      });

      const data = await response.json();
      console.log(data);

      ////////////// DELETE PRODUCT FROM WISHLIST //////////////////
      try {
        const url = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productId}`;
        const options = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: `${projectId}`,
          },
        };
        const delResponse = await fetch(url, options);
        const delData = await response.json();

        console.log(delData);
        if (!delResponse.ok) {
          throw new Error("Failed to remove product from wishlist");
        }
      } catch (error) {
        console.error(error);
      }

      if (response.ok) {
        // navigate("/cart");
        setWishlistData((prevData) =>
          prevData.filter((item) => item.products._id !== productId)
        );
        setResults((prev) => prev - 1);
      } else {
        console.error("Error adding to cart:", data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // window.alert("item is already in cart");
    }
  };

  // const handleNavigation = () => {
  //   navigate(`/getsingleproductdetails/${productId}`);
  // };
  return (
    <div className="wishlist_container">
      {wishlistData.length > 0 ? (
        <h3 className="wishlist_h3_media_query">
          <strong>My WishList ({results}items)</strong>
        </h3>
      ) : (
        <div></div>
      )}
      <div className="wishList_items_container">
        {wishlistData.length > 0 ? (
          wishlistData.map((items, index) => (
            <div
              className="wishList_items"
              key={index}
              // onClick={handleNavigation}
            >
              <div className="wishlist_image">
                <img src={items.products.displayImage} alt="" />
              </div>
              <div className="wishList_item_details">
                <h5>
                  <strong>{items.products.name}</strong>
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
                  className="wishlist_price_media_query"
                  style={{
                    display: " flex",
                    gap: "10px",
                    alignItems: "center",
                    height: "25px",
                    fontSize: "13px",
                    color: "#585c70",
                  }}
                >
                  <p>
                    <strong>₹ {items.products.price}</strong>
                  </p>
                  <p style={{ fontSize: "14px", color: "#73757B" }}>
                    MRP incl. of all taxes
                  </p>
                </div>
              </div>
              <div
                className="move_to_cart_btn"
                onClick={() => moveToCart(items.products._id)}
              >
                MOVE TO CART
              </div>
            </div>
          ))
        ) : (
          <div className="empty_wishlist_div">
            <div className="empty_wishlist_img_div_media_query">
              <img src={EmptyWishList} alt="" />
            </div>
            <Link to="/">
              <button>CONTINUE SHOPPING</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
