import React from "react";
import "../assets/styles/auth.scss";
import Logo from "../assets/images/auth-logo.svg";

const AuthLayout = ({children}) => {
  return (
    <div className="auth-layout">
      <div className="main-logo">
        <img src={Logo} alt=""/>
      </div>
      <div className="auth-form">
        {children}
      </div>      
    </div>
  )
}

export default AuthLayout;
