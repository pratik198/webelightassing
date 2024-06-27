//////////////////////
import React, { useEffect, useState } from "react";
import "./Cart.css";
import EmptyCart from "../../Assets/EmptyCart.png";
import { Link } from "react-router-dom";
// import AddAddressPage from "../AddAddressPage/AddAddressPage";
import { useNavigate } from "react-router-dom";
import { useProductId } from "../Context/Context"; //accessing the context thru custom hook

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const token = localStorage.getItem("JWT_token");
  const navigate = useNavigate();
  const { updatePrice } = useProductId();
  const { addCartProductIDs } = useProductId();

  async function fetchCart() {
    const Url = `https://academics.newtonschool.co/api/v1/ecommerce/cart`;

    const response = await fetch(Url, {
      method: "GET",
      headers: {
        projectID: "f104bi07c490",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    // setCartItems((prevdata) =>
    //   prevdata.filter((item) => item.products?._id !== productId)
    // );
    console.log(data);

    if (data.data.items.length > 0) {
      const totalAmount = data.data.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      setGst(totalAmount * 0.15);
      setCartItems(data.data.items);
      setCartTotal(totalAmount);
      updatePrice(totalAmount, gst); //stored the totalAmount and gst in the context
    }

    const ids = data.data.items.map((item) => item.product._id);
    addCartProductIDs(ids);
  }

  useEffect(() => {
    fetchCart();
  }, [cartTotal, gst]);

  // useEffect(()=>{

  // },[])

  const moveToWishlist = async (productId) => {
    try {
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`;
      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "f104bi07c490",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      /////// DELETE PRODUCT FROM CART ///////////////
      try {
        const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;
        const options = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
          },
        };
        const delResponse = await fetch(url, options);
        const delData = await delResponse.json();
        console.log(delData);
        if (!delResponse.ok) {
          throw new Error("Failed to remove product from cart");
        }
      } catch (error) {
        console.error(error);
      }

      if (response.ok) {
        console.log("product moved to WL");
        setCartItems((prevItem) =>
          prevItem.filter((item) => item.product._id !== productId)
        );
        // setCartItems((prevdata) =>
        //   prevdata.filter((item) => item.products._id !== productId)
        // );
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //////////// REMOVE PRODUCT FROM THE CART ////////////
  const removeProduct = async (productId) => {
    try {
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "f104bi07c490",
          "Content-Type": "application/json",
        },
      };
      const delResponse = await fetch(url, options);
      const delData = await delResponse.json();
      console.log(delData);
      if (delResponse.ok) {
        // throw new Error("Failed to remove product from cart");
        setCartItems((prevItem) =>
          prevItem.filter((item) => item.product._id !== productId)
        );
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = () => {
    const prices = cartItems.map((item) => item.product.price);
    navigate(`/delivery-address ? prices = ${JSON.stringify(prices)}`);
  };

  if (!cartItems) {
    return <div>Loading...</div>;
  }
  return (
    <div className="myCart">
      <div className="cart_header">
        <strong>
          {" "}
          <span style={{ color: "#4F7A7A" }}> MY BAG </span>- - - - - - - - - -
          - - - - - ADDRESS - - - - - - - - - - - - - PAYMENT
        </strong>
      </div>
      <div className="cart_container">
        <div className="cart_items_container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart_items">
                <div className="each_cart_item">
                  <div className="cart_item_image">
                    <img
                      src={item.product.displayImage}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="each_cart_item_details">
                    <h3
                      className="cart_item_details_h3_media_query"
                      style={{ fontSize: "14px", color: "#58595B" }}
                    >
                      {item.product.name}
                    </h3>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="price_div">
                    <p style={{ marginBottom: "0" }}>
                      <strong>₹ {item.product.price}</strong>
                    </p>
                    <p
                      className="cart_items_price_mrp_media_query"
                      style={{ margin: "0", fontSize: "13px" }}
                    >
                      <strong style={{ color: "#58595B" }}>
                        MRP incl. of all taxes
                      </strong>
                    </p>
                  </div>
                </div>
                <div
                  style={{ height: " 1px", backgroundColor: "#F0F0F0" }}
                ></div>
                <div className="cart_action_buttons">
                  <button onClick={() => removeProduct(item.product._id)}>
                    REMOVE
                  </button>
                  <button onClick={() => moveToWishlist(item.product?._id)}>
                    MOVE TO WISHLIST
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty_cart_div">
              <img src={EmptyCart} alt="" />
              <Link to="/">
                <button>CONTINUE SHOPPING</button>
              </Link>
            </div>
          )}
        </div>
        {cartItems.length > 0 ? (
          <div className="place_order_div">
            <p style={{ color: "#58595B" }}>BILLING DETAILS</p>
            <div className="billing_details">
              <div>
                <p> Cart Total (Excl. of all taxes)</p> ₹{cartTotal}
              </div>
              <div>
                <p>GST</p> ₹{gst}
              </div>
              <div>
                <p>Shipping Charges</p> ₹0
              </div>
              <div>
                <p>Total Amount</p> ₹{cartTotal + gst}
              </div>
            </div>
            <Link to="/delivery-address">
              <button onClick={placeOrder}>PLACE ORDER</button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Cart;
