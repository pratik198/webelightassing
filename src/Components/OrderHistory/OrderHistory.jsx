// import React, { useState, useEffect } from "react";
// import "./OrderHistory.css";
// import { useNavigate } from "react-router-dom";
// import { projectId } from "../util/Util";

// const OrderHistory = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const name = localStorage.getItem("name");
//   const email = localStorage.getItem("email");

//   const fetchOrderHistory = async () => {
//     const token = localStorage.getItem("JWT_token");
//     const projectID = projectId;

//     try {
//       const response = await fetch(
//         `https://academics.newtonschool.co/api/v1/ecommerce/order`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//             projectID: projectID,
//           },
//         }
//       );

//       const data = await response.json();
//       console.log(response);
//       console.log(data);
//       console.log(data?.data);
//       setOrders(data?.data.order._id);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching order history:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderHistory();
//   }, []);

//   return (
//     <div>
//       <div className="order_history_main_div">
//         <div className="left_side_orderhistory">
//           <div className="userName">
//             <h4>{name}</h4>
//             <p>{email}</p>
//           </div>
//           <div className="orders">
//             <p style={{ color: "#4F7A7A" }}>
//               <strong>Orders</strong>
//             </p>
//           </div>
//           <div className="orderhistory_profile">
//             <div>Gift Vouchers</div>
//             <div>TSS Points (Active TSS Points: 0.00)</div>
//             <div>TSS Money (TSS Money Balance: ₹ 0.00)</div>
//             <div>Saved Cards</div>
//             <div>FAQs</div>
//             <div>Profile</div>
//           </div>
//           <button className="logout_btn">LOGOUT</button>
//         </div>

//         <div className="right_side_orderhistory">
//           <h3 style={{ marginTop: "0" }}>
//             <strong>MY ORDERS</strong>
//           </h3>
//           <div className="order_details_div">
//             <div className="order_details_top">
//               <p>Order ID: 4362465725</p>
//               <p>date</p>
//             </div>
//             <div className="order_details">
//               <div className="image_div">
//                 <img src="" alt="" />
//               </div>
//               <div className="details">
//                 <p>prouctName</p>
//                 <p>
//                   <strong>Order Placed</strong>
//                 </p>
//                 <p>Deliver to: address</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;

import React, { useState, useEffect } from "react";
import "./OrderHistory.css";
import { useNavigate } from "react-router-dom";
import { projectId } from "../util/Util";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const fetchOrderHistory = async () => {
    const token = localStorage.getItem("JWT_token");
    const projectID = projectId;

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/order`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            projectID: projectID,
          },
        }
      );

      const data = await response.json();
      setOrders(data.data); // Assuming data is an array of orders
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order history:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("JWT_token");
    console.log("logged out succesful");
    navigate("/");
    // setShowLogoutPopup(true);
    // toast.success("Logged out successfully!");
    // toast.success("Logged out successfully!", {
    //   // toastId: "logoutToast",
    //   className: "red-toast",
    // });
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <div className="order_history_main_div">
        <div className="left_side_orderhistory">
          <div className="userName">
            <h4>{name}</h4>
            <p>{email}</p>
          </div>
          <div className="orders">
            <p style={{ color: "#4F7A7A" }}>
              <strong>Orders</strong>
            </p>
          </div>
          <div className="orderhistory_profile">
            <div>Gift Vouchers</div>
            <div>TSS Points (Active TSS Points: 0.00)</div>
            <div>TSS Money (TSS Money Balance: ₹ 0.00)</div>
            <div>Saved Cards</div>
            <div>FAQs</div>
            <div style={{ borderBottom: "1px solid #7f7f7f" }}>Profile</div>
          </div>
          <button onClick={handleLogout} className="logout_btn">
            LOGOUT
          </button>
        </div>

        <div className="right_side_orderhistory">
          <h3 style={{ marginTop: "0" }}>
            <strong>MY ORDERS</strong>
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            orders.map((order) => (
              <div key={order.order._id} className="order_details_div">
                <div className="order_details_top">
                  <p>Order ID: {order.order._id}</p>
                  <p>{order.createdAt}</p>
                </div>
                <div className="order_details">
                  <div className="image_div">
                    <img
                      src={order.order.items[0].product.displayImage}
                      alt={order.order.items[0].product.name}
                    />
                  </div>
                  <div className="details">
                    <p style={{ color: "#58595b", fontSize: "14px" }}>
                      {order.order.items[0].product.name}
                    </p>
                    <p
                      style={{
                        color: "#58595b",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <strong>Order Placed</strong>
                    </p>
                    <p style={{ fontSize: "13px", fontWeight: "400" }}>
                      Deliver to: {order.order.shipmentDetails.address.street},{" "}
                      {order.order.shipmentDetails.address.city},{" "}
                      {order.order.shipmentDetails.address.state},{" "}
                      {order.order.shipmentDetails.address.country},{" "}
                      {order.order.shipmentDetails.address.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
