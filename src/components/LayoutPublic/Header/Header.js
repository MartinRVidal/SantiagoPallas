import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";

const Header = ({ children }) => {
  return (
    <div className="sidebar_header">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  children: PropTypes.any,
};