import React, { useState } from "react";
import "./Login.css";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleMail = (e) => {
    setMailId(e.target.value);
  };
  const handleEnterPassword = (e) => {
    setPassword(e.target.value);
  };

  async function login() {
    // if (password !== confirmPassword) {
    //   console.log("psswrd do not match");
    //   // return;
    // }

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/user/login`,
        {
          method: "POST",
          headers: {
            projectID: "kfdh4hevj36w",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: mailId,
            password: password,
            appType: "ecommerce",
          }),
        }
      );
      if (response.ok) {
        // console.log(response);

        const data = await response.json();
        navigate("/");
        localStorage.setItem("JWT_token", data.token);
        localStorage.setItem("name", data.data.user.name);
        localStorage.setItem("email", data.data.user.email);
        console.log("Name:", localStorage.getItem("name")); // Log name
        console.log("Email:", localStorage.getItem("email")); // Log email
        // console.log(data.token);
        // console.log(data);
      }
    } catch (err) {
      console.error("");
    }
  }
  return (
    <div className="signUp_main_div">
      <div className="signUp_main_inner_div">
        <h5>Login with The Souled Store</h5>
        <div className="sign_up_btn">
          <button>LOGIN</button>
          <Link to={"/register"} className="register">
            <button
              style={{ backgroundColor: "transparent", color: "#58595B" }}
            >
              REGISTER
            </button>
          </Link>
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
            <input
              type="text"
              placeholder="E-mail ID"
              onChange={handleMail}
              value={mailId}
            />
            <input
              type="text"
              placeholder="Enter Password"
              onChange={handleEnterPassword}
              value={password}
            />
            <button className="submit_login_btn" onClick={login}>
              PROCEED
            </button>
          </div>

          <p>
            New User ?{" "}
            <Link to={"/register"} style={{ color: "red" }}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

///////////////////////////////////////////////////
