// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./AddAddresspage.css";
// import { useProductId } from "../Context/Context";
// import { token } from "../util/Util";
// import { projectId } from "../util/Util";

// function AddAddressPage() {
//   const { priceInfo } = useProductId();
//   const { cartTotal, gst } = priceInfo;
//   const { cartProductIDs } = useProductId();
//   // const [divList, setDivList] = useState([])

//   useEffect(() => {
//     console.log(`cartTotal: ${cartTotal}`);
//     console.log(`gst:${gst}`);
//     console.log(cartProductIDs);
//   }, [cartTotal, gst]);

//   const fetchAddressDetails = async () => {
//     try {
//       const url = `https://academics.newtonschool.co/api/v1/ecommerce/order`;
//       const options = {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           projectID: `${projectId}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           productId: `652675cddaf00355a7838107`,
//           quantity: 5,
//           addressType: "HOME",
//           address: {
//             street: "123 Main St",
//             city: "Anytown",
//             state: "CA",
//             country: "USA",
//             zipCode: "12345",
//           },
//         }),
//       };
//       const response = await fetch(url, options);
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchAddressDetails();
//   }, []);
//   // const addNewDiv = () => {
//   //   setDivList([...divList,]);
//   // };
//   return (
//     <div>
//       <div className="cart_header">
//         <strong>
//           {" "}
//           <span style={{ color: "#4F7A7A" }}> MY BAG </span>- - - - - - - - - -
//           - - - - - ADDRESS - - - - - - - - - - - - - PAYMENT
//         </strong>
//       </div>
//       <div className="cart_container">
//         <div className="cart_items_container address_div">
//           <div className="add_address_top">
//             <p>
//               <strong>Delivery To</strong>
//             </p>
//             {/* <button>+</button> */}
//             <div className="line"></div>
//           </div>
//           <div className="add_address"></div>
//         </div>
//         <div className="place_order_div">
//           <p style={{ color: "#58595B" }}>BILLING DETAILS</p>
//           <div className="billing_details">
//             <div>
//               <p> Cart Total (Excl. of all taxes)</p> {cartTotal}
//             </div>
//             <div>
//               <p>GST</p> {gst}
//             </div>
//             <div>
//               <p>Shipping Charges</p> ₹0
//             </div>
//             <div>
//               <p>Total Amount</p> {cartTotal + gst}
//             </div>
//           </div>
//           <Link to="/delivery-address">
//             <button>PLACE ORDER</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddAddressPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AddAddresspage.css";
import { useProductId } from "../Context/Context";
import { token } from "../util/Util";
import { projectId } from "../util/Util";
import { useNavigate } from "react-router-dom";

function AddAddressPage() {
  const { priceInfo } = useProductId();
  const { cartTotal, gst } = priceInfo;
  const { cartProductIDs } = useProductId();
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
        }
      }
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
      <div className="cart_header">
        <strong>
          {" "}
          <span style={{ color: "#4F7A7A" }}> MY BAG </span>- - - - - - - - - -
          - - - - - ADDRESS - - - - - - - - - - - - - PAYMENT
        </strong>
      </div>
      <div className="cart_container">
        <div className="cart_items_container address_div">
          <div className="add_address_top">
            <p>
              <strong>Delivery To</strong>
            </p>

            <div className="form-box" id="address_form">
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={firstName}
                  onChange={handleFirstName}
                />
                <label class="floating-label">
                  First Name
                  <sub>*</sub>
                </label>
              </div>
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={lastName}
                  onChange={handleLastName}
                />
                <label class="floating-label">
                  Last Name
                  <sub>*</sub>
                </label>
              </div>
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                />
                <label class="floating-label">
                  Phone No.
                  <sub>*</sub>
                </label>
              </div>
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={pincode}
                  onChange={handlePincode}
                />
                <label class="floating-label">
                  PIN code
                  <sub>*</sub>
                </label>
              </div>
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={town}
                  onChange={handletown}
                />
                <label class="floating-label">
                  Town/Village
                  <sub>*</sub>
                </label>
              </div>
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={district}
                  onChange={handleDistric}
                />
                <label class="floating-label">
                  City/Disrtrict
                  <sub>*</sub>
                </label>
              </div>
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={state}
                  onChange={handleStateName}
                />
                <label class="floating-label">
                  State
                  <sub>*</sub>
                </label>
              </div>
              <div class="form-in">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                  value={homeAddress}
                  onChange={handleHomeAddress}
                />
                <label class="floating-label">
                  Address (House No, Building, Street, Area)
                  <sub>*</sub>
                </label>
              </div>
            </div>

            <div className="line"></div>
          </div>
          <div className="add_address"></div>
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
          <Link to="/delivery-address">
            <button onClick={checkout}>PLACE ORDER</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddAddressPage;
