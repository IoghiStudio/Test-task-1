import React from "react";
import "./Logos.scss";
import logo1 from "../../assets/images/logo-1.jpg";
import logo2 from "../../assets/images/logo-2.jpg";

const Logos: React.FC = () => {
  return (
    <div className="logos">
      <div className="logo">
        <img src={logo1} alt="Logo 1" className="logo-image" />
      </div>

      <span className="logos-separator">X</span>

      <div className="logo">
        <img src={logo2} alt="Logo 2" className="logo-image" />
      </div>
    </div>
  );
};

export default Logos;
