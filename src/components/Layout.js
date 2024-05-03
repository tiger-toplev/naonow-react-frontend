import React from "react";
import { useSelector } from 'react-redux';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../assets/styles/layout.scss";

const Layout = ({children}) => {
  const isShowSidebar = useSelector(state => state.settings.isShowSidebar);
  
  return (
    <div className="default-layout">
      <Navbar />
      <div className="content">
        {isShowSidebar && <div className="mobile-fade-background"/>}        
        <Sidebar />
        <div className="children-page">
          {children}
        </div>
      </div>
      <Footer />
    </div>    
  )
}

export default Layout;
