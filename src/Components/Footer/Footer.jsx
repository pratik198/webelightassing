import React from "react";
import "./Footer.css";
import FooterImage_1 from "../../Assets/FooterImage_1.png";
import FooterImage_2 from "../../Assets/FooterImage_2.png";
import FooterImage_3 from "../../Assets/FooterImage_3.png";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
const Footer = () => {
  return (
    <div>
      <div className="Footer_img_1">
        <img src={FooterImage_1} alt="" />
      </div>
      <div className="Footer_img_2">
        <img src={FooterImage_2} alt="" />
      </div>
      <div className="Footer_img_3">
        <img src={FooterImage_3} alt="" />
      </div>
      <IoIosHeartEmpty />
      <IoMdHeart />
    </div>
  );
};

export default Footer;
