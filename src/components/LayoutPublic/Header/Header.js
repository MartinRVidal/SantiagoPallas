import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import DeskSidebar from "./DeskSidebar";
import { useState } from "react";

const Header = ({ children }) => {
  const [condicion, setCondicion] = useState(window.innerWidth < 768 ? false : true )

  function handleWindowResize() {
    const {innerWidth} = window;
    if (innerWidth < 768) {
      setCondicion(false)
    } else {setCondicion(true)
    }
  }
  
  window.addEventListener('resize', handleWindowResize);

  return (
    <div className="sidebar_header">
      { condicion ? <DeskSidebar /> : <Sidebar /> }
      <div>{children}</div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  children: PropTypes.any,
};