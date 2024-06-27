import React, { useState } from "react";
import "./SignUp.css";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [fname, setFName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); //aato-navigate to a page after a specific task.

  const handleFirstName = (e) => {
    setFName(e.target.value);
  };
  const handleLaststName = (e) => {
    setLastName(e.target.value);
  };
  const handleMail = (e) => {
    setMailId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  async function signUp() {
    if (password !== confirmPassword) {
      console.log("psswrd do not match");
      // return;
    }

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/user/signup`,
        {
          method: "POST",
          headers: {
            projectID: "kfdh4hevj36w",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${fname}${lastName}`,
            email: mailId,
            password: password,
            appType: "ecommerce",
          }),
        }
      );
      if (response.ok) {
        // console.log(response);

        const data = await response.json();
        console.log(data);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="signUp_main_div">
      <div className="signUp_main_inner_div">
        <h5>Login with The Souled Store</h5>
        <div className="sign_up_btn">
          <Link to={"/login"} className="register">
            <button
              style={{ backgroundColor: "transparent", color: "#58595B" }}
            >
              LOGIN
            </button>
          </Link>
          <button>REGISTER</button>
        </div>
        <div className="signUp_details_div">
          <div className="signUp_with_div">
            <div className="signUp_with_fb">
              {/* <a href="https://www.facebook.com/share_channel/"> */}
              <FaSquareFacebook style={{ color: "#3C5A9A" }} />
              Facebook
              {/* </a> */}
            </div>
            <div className="signUp_with_google">
              {/* <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fwww.thesouledstore.com%3Fid%3Dauth299294&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&client_id=693885005941-dq6354b32snuce8vqd61ta08jsg73jlk.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fwww.thesouledstore.com&fetch_basic_profile=true&gsiwebsdk=2&service=lso&o2v=1&theme=mn&ddm=0&flowName=GeneralOAuthFlow"> */}
              <FcGoogle />
              Google
              {/* </a> */}
            </div>
          </div>
          <strong>-OR-</strong>
          <div className="input_signUp_details_div">
            <div className="firstLast_name">
              <input
                type="text"
                placeholder="First Name *"
                onChange={handleFirstName}
                value={fname}
              />
              <input
                type="text"
                placeholder="Last Name"
                onChange={handleLaststName}
                value={lastName}
              />
            </div>
            <input
              type="text"
              placeholder="E-mail ID"
              onChange={handleMail}
              value={mailId}
            />
            <input
              type="text"
              placeholder="Choose New Password"
              onChange={handlePassword}
              value={password}
            />
            <input
              type="text"
              placeholder="Confirm New Password"
              onChange={handleConfirmPassword}
              value={confirmPassword}
            />

            <button className="submit_register_btn" onClick={signUp}>
              REGISTER
            </button>
          </div>
          <p>
            Already a Customer?{" "}
            <Link to={"/login"} style={{ color: "red" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
