import React, { useEffect, useState } from "react";
import "./PaymentPage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const { orderDetails } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const togglePaymentOption = (type) => {
    if (paymentType === type) {
      setDropDown(!dropDown);
    } else {
      setPaymentType(type);
      setDropDown(true);
    }
  };

  function handleCardDetailsChange(event) {
    const { name, value } = event.target;
    setCardDetails((prevCardDetails) => ({
      ...prevCardDetails,
      [name]: value,
    }));
  }

  function validateCardDetails() {
    const errors = {};
    if (!cardDetails.cardNumber) {
      errors.cardNumber = "Card number is required";
    }
    if (!cardDetails.month && !cardDetails.year) {
      errors.month = "Expiry date is required";
      errors.year = "Expiry date is required";
    }
    if (!cardDetails.cvv) {
      errors.cvv = "CVV is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleCompleteOrder() {
    if (paymentType === "UPI") {
      completeOrder();
    } else if (paymentType === "Card") {
      if (validateCardDetails()) {
        completeOrder();
      }
    } else {
      alert("Please select a payment method");
    }
  }

  function completeOrder() {
    var confirm = window.confirm("Your order completed");
    if (confirm) {
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(orderDetails.address.firstName);
    console.log(orderDetails.address.pincode);
  }, []);

  return (
    <div>
      <div className="cart_header">
        <strong>
          {" "}
          <span style={{ color: "#4F7A7A" }}> MY BAG </span>- - - - - - - - - -
          - - - - - ADDRESS - - - - - - - - - - - - - PAYMENT
        </strong>
      </div>
      <div className="cart_container">
        <div className="cart_items_container payment_methods_container">
          <div style={{ border: "1px solid #dfe5ed", padding: "12px" }}>
            <p style={{ margin: "0", color: "#4F7A7A" }}>
              <strong>
                Deliver To: {orderDetails.address.firstName},{" "}
                {orderDetails.address.pincode}{" "}
              </strong>
            </p>
            <p style={{ margin: "0", fontSize: "12px" }}>
              {orderDetails.address.homeAddress},{" "}
              {orderDetails.address.district}, {orderDetails.address.state},{" "}
              {orderDetails.address.town}
            </p>
          </div>
          <p>
            <strong>Payment Options</strong>
          </p>
          <div className="diff_payment_methods">
            <div className="payment_methods_div">
              <div className="payment_method">
                <label>UPI</label>
                <input
                  type="radio"
                  value="UPI"
                  onClick={() => togglePaymentOption("UPI")}
                  checked={paymentType === "UPI"}
                />
              </div>
              {paymentType === "UPI" && dropDown ? (
                <div className="upi_details">
                  <label htmlFor="UPI">Enter UPI ID</label>
                  <input type="text" placeholder="enter UPI" />
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="payment_methods_div">
              <div className="payment_method">
                <label>Card</label>
                <input
                  type="radio"
                  value="card"
                  onClick={() => togglePaymentOption("Card")}
                  checked={paymentType === "Card"}
                />
              </div>
              {paymentType === "Card" && dropDown ? (
                <div className="card_details">
                  <input
                    type="text"
                    placeholder="Card Number"
                    // value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                  />
                  {errors.cardNumber && (
                    <span style={{ color: "red" }}>{errors.cardNumber}</span>
                  )}
                  <div>
                    <div>
                      <input
                        type="text"
                        placeholder="Month"
                        // value={cardDetails.month}
                        onChange={handleCardDetailsChange}
                      />
                      {errors.month && (
                        <span style={{ color: "red" }}>{errors.month}</span>
                      )}
                      <input
                        type="text"
                        placeholder="Year"
                        // value={cardDetails.year}
                      />
                      {errors.year && (
                        <span style={{ color: "red" }}>{errors.year}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Cvv"
                      // value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                    />
                    {errors.cvv && (
                      <span style={{ color: "red" }}>{errors.cvv}</span>
                    )}
                  </div>
                  <input type="text" placeholder="Name On Card" />
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="payment_methods_div">
              <div className="payment_method">
                <label>Wallets</label>
                <input
                  type="radio"
                  value="Wallets"
                  onClick={() => togglePaymentOption("Wallets")}
                  checked={paymentType === "Wallets"}
                />
              </div>
              {paymentType === "Wallets" && dropDown ? (
                <div className="">
                  <p>Coming soon..</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="payment_methods_div">
              <div className="payment_method">
                <label>Netbanking</label>
                <input
                  type="radio"
                  value="Netbanking"
                  onClick={() => togglePaymentOption("Netbanking")}
                  checked={paymentType === "Netbanking"}
                />
              </div>
              {paymentType === "Netbanking" && dropDown ? (
                <div className="">
                  <p>Coming Soon...</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="place_order_div">
          <p style={{ color: "#58595B" }}>BILLING DETAILS</p>
          <div className="billing_details">
            <div>
              <p> Cart Total (Excl. of all taxes)</p> {orderDetails.cartTotal}
            </div>
            <div>
              <p>GST</p> {orderDetails.gst}
            </div>
            <div>
              <p>Shipping Charges</p> ₹0
            </div>
            <div>
              <p>Total Amount</p> {orderDetails.cartTotal + orderDetails.gst}
            </div>
          </div>
          <div>
            <button onClick={handleCompleteOrder}>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
