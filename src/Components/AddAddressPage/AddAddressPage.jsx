import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AddAddresspage.css";
import { useProductId } from "../Context/Context";
import { token } from "../util/Util";
import { projectId } from "../util/Util";
import { useNavigate } from "react-router-dom";
import AddAddress from "../../Assets/AddAddress.png";

function AddAddressPage() {
  const { priceInfo } = useProductId();
  const { cartTotal, gst } = priceInfo;
  const { cartProductIDs } = useProductId();
  const navigate = useNavigate();
  // const [divList, setDivList] = useState([])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [town, setTown] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [quantities, setQuantities] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [divList, setDivList] = useState([]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    console.log(firstName);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    console.log(lastName);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    console.log(phoneNumber);
  };

  const handletown = (e) => {
    setTown(e.target.value);
    console.log(town);
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
    console.log(pincode);
  };

  const handleDistric = (e) => {
    setDistrict(e.target.value);
    console.log(district);
  };
  const handleStateName = (e) => {
    setState(e.target.value);
    console.log(state);
  };
  const handleHomeAddress = (e) => {
    setHomeAddress(e.target.value);
    console.log(homeAddress);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const addNewDiv = () => {
    setDivList();
  };

  useEffect(() => {
    console.log(`cartTotal: ${cartTotal}`);
    console.log(`gst:${gst}`);
    console.log(cartProductIDs);
  }, [cartTotal, gst]);

  const checkout = async () => {
    try {
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/order`;

      for (const productId of cartProductIDs) {
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: `${projectId}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
            quantity: quantities[productId] || 1,
            addressType: "HOME",
            address: {
              street: homeAddress,
              city: district,
              state: state,
              country: "INDIA",
              zipCode: pincode,
            },
          }),
        };

        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          navigate("/payment", {
            state: {
              orderDetails: {
                cartTotal,
                gst,
                address: {
                  firstName,
                  lastName,
                  phoneNumber,
                  pincode,
                  town,
                  district,
                  state,
                  homeAddress,
                },
              },
            },
          }); /////////////////////////////////////////
        }
      }
      setOpenModal(!openModal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialQuantities = {};
    cartProductIDs.forEach((productId) => {
      initialQuantities[productId] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartProductIDs]);

  return (
    <div>
      <div className={`cart_header ${openModal ? "blur_background" : ""}`}>
        <strong>
          {" "}
          <span style={{ color: "#4F7A7A" }}> MY BAG </span>- - - - - - - - - -
          - - - - - ADDRESS - - - - - - - - - - - - - PAYMENT
        </strong>
      </div>
      <div className="cart_container">
        <div className="cart_items_container address_div">
          <div className="add_address_top">
            <p style={{ color: "#58595b" }}>
              <strong>Delivery To</strong>
            </p>

            {/* <button onClick={handleOpenModal}>+</button> */}
            <div className="line"></div>
            <div className="add_address_img">
              <img onClick={handleOpenModal} src={AddAddress} alt=".." />
            </div>
          </div>
        </div>
        <div className="place_order_div">
          <p style={{ color: "#58595B" }}>BILLING DETAILS</p>
          <div className="billing_details">
            <div>
              <p> Cart Total (Excl. of all taxes)</p> {cartTotal}
            </div>
            <div>
              <p>GST</p> {gst}
            </div>
            <div>
              <p>Shipping Charges</p> ₹0
            </div>
            <div>
              <p>Total Amount</p> {cartTotal + gst}
            </div>
          </div>
          <div>
            <button onClick={handleOpenModal}>PLACE ORDER</button>
          </div>
        </div>
      </div>

      <div className="add_address">
        {openModal && (
          <div className="overall_address_container">
            <div className="address_container">
              <div className="form_box" id="address_form">
                <div className="modal_header">
                  <h2>Add New Address</h2>
                  <p className="close_btn" onClick={handleOpenModal}>
                    <strong>X</strong>
                  </p>
                </div>
                <div className="enter_your_name_div">
                  <div class="form-in enter_name">
                    <input
                      autocomplete="off"
                      type="text"
                      placeholder="First Name*"
                      value={firstName}
                      onChange={handleFirstName}
                    />
                  </div>
                  <div class="form-in enter_name">
                    <input
                      autocomplete="off"
                      type="text"
                      placeholder="Last Name*"
                      value={lastName}
                      onChange={handleLastName}
                    />
                  </div>
                </div>
                <div class="form-in enter_address">
                  <input
                    autocomplete="off"
                    type="text"
                    placeholder="Address (House No, Building, Street, Area)*"
                    value={homeAddress}
                    onChange={handleHomeAddress}
                  />
                </div>
                <div className="enter_district">
                  <div class="form-in enter_area">
                    <input
                      autocomplete="off"
                      type="text"
                      placeholder="Pin Code*"
                      value={pincode}
                      onChange={handlePincode}
                    />
                  </div>
                  <div class="form-in enter_area">
                    <input
                      autocomplete="off"
                      type="text"
                      placeholder="City/District"
                      value={district}
                      onChange={handleDistric}
                    />
                  </div>
                </div>
                <div className="enter_country">
                  <div class="form-in enter_country_child">
                    <input
                      autocomplete="off"
                      type="text"
                      placeholder="Country"
                      value={town}
                      onChange={handletown}
                    />
                  </div>
                  <div class="form-in enter_country_child">
                    <input
                      autocomplete="off"
                      type="text"
                      placeholder="State*"
                      value={state}
                      onChange={handleStateName}
                    />
                  </div>
                </div>
                <div class="form-in enter_phnNo">
                  <input
                    autocomplete="off"
                    type="text"
                    placeholder="Phone No.*"
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                  />
                </div>
                <div className="modal_action_btns">
                  <button className="cancel_btn" onClick={handleOpenModal}>
                    CANCEL
                  </button>
                  <button className="save_btn" onClick={checkout}>
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddAddressPage;
