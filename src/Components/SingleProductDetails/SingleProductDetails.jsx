import React, { useEffect, useState } from "react";
import "./SingleProductDetails.css";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useProductId } from "../Context/Context";

const SingleProductDetails = () => {
  const { productId } = useParams(); //the productId is recieved here.
  const { addProductId } = useProductId();
  const [singleProductData, setSingleProductData] = useState(null);
  const [productImage, setProductImage] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState([]);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("JWT_token");
  const projectId = "kfdh4hevj36w";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`;
        const options = {
          method: "GET",
          headers: { projectID: `${projectId}` },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setSingleProductData(data.data);
        const imageData = data.data.images;
        setProductImage(imageData);
        const sizes = data.data.size;
        setAvailableSizes(sizes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    addProductId(productId);
  }, [productId, addProductId]);
  // console.log(addProductId);

  if (!singleProductData) {
    return <div>Loading...</div>;
  }

  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  ///////////// ADD TO CART  ////////////

  const addToCart = async () => {
    if (token === null || token === undefined) {
      navigate("/login");
      return;
    }

    if (selectedSize.length === 0) {
      // alert("please select a size");
      setButtonIsClicked(true);
      return;
    }

    const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: `${projectId}`,
        },
        body: JSON.stringify({
          quantity: quantity,
          size: selectedSize || availableSizes[0],
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/cart");
      } else {
        console.error("Error adding to cart:", data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  ///////////// ADD TO WISHLIST //////////////
  const addToWishlist = async () => {
    if (token === null || token === undefined) {
      navigate("/login");
    }
    try {
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`;
      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: `${projectId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/wishlist");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="single_product_details">
      <div className="sinlge_product_images_div">
        {productImage.map((image, index) => (
          <div className="mapped_product_img_div">
            <img key={index} src={image} alt="" />
          </div>
        ))}
      </div>
      <div className="single_product_details_div">
        <h2 className="single_product_brandname">
          <strong>{singleProductData.name}</strong>
        </h2>
        <p className="single_product_subcategory">
          {singleProductData.subCategory}
        </p>
        <div className="underline"></div>
        <div className="single_product_price">₹ {singleProductData.price}</div>
        <p className="single_product_details_MRP">
          MRP Rs. 1999 incl. of all taxes
        </p>
        <p style={{ marginBottom: "0", fontSize: "13px", color: "#58595b" }}>
          or 3 monthly payments of ₹333 with <br />
          <span style={{ color: "#888888" }}>
            UPI & Cards Accepted, Online approval in 2 minutes
          </span>
        </p>
        <p style={{ margin: "0", color: "red", fontSize: "13px" }}>
          <strong>Get Flat 200 cashback when you pay with Snapmint</strong>
        </p>
        <div className="single_product_sizeChart_div">
          <h3>Please select a size.</h3>
          <div>
            {availableSizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={selectedSize === size ? "selected" : ""}
                style={{ borderColor: selectedSize === size ? "#539090" : "" }}
              >
                {size}
              </button>
            ))}
          </div>
          {buttonIsClicked && selectedSize.length === 0 && (
            <p>please select a size</p>
          )}
          {/* {buttonIsClicked && selectedSize.length !== 0 && (
            <p>please select a size</p>
          )} */}
        </div>
        <div className="select_quantity_div">
          <p>Quantity </p>
          <div>
            <button onClick={decrement}>-</button>
            <p>{quantity}</p>
            <button onClick={increment}>+</button>
          </div>
        </div>
        <div className="add_to_whislist_div">
          <button
            className="single_product_details_buttons_media_query"
            style={{
              backgroundColor: "#EC3D25",
              width: "18em",
              color: "white",
              fontWeight: "bold",
              border: "none",
            }}
            onClick={addToCart}
          >
            ADD TO CART
          </button>
          <button
            className="single_product_details_buttons_media_query"
            style={{
              backgroundColor: "transparent",
              width: "14em",
              border: "1px solid #148CAB",
              color: "#148CAB",
            }}
            onClick={addToWishlist}
          >
            ADD TO WISHLIST
          </button>
        </div>
        <div className="single_product_details_shareInfo">
          Share{" "}
          <div>
            <a href="https://web.whatsapp.com/">
              <FaWhatsapp style={{ height: "25px", width: "25px" }} />
            </a>
            <a href="https://www.facebook.com/share_channel/">
              <FaSquareFacebook style={{ height: "25px", width: "25px" }} />
            </a>{" "}
            <a href="https://twitter.com/intent/post?text=Top%20Gun%3A%20Jets&url=https%3A%2F%2Fwww.thesouledstore.com%2Fproduct%2Ftop-gun-jets-oversized-t-shirts">
              <FaTwitter style={{ height: "25px", width: "25px" }} />
            </a>{" "}
            <a href="https://www.instagram.com/TheSouledStore/">
              <FaInstagram style={{ height: "25px", width: "25px" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
