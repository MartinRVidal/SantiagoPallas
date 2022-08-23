import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  DataSidebar,
  DataConfiguracion,
  DataSeguridad,
  DataProcesos,
} from "./DataSidebar";
import "./Sidebar.css";
import { GiHamburgerMenu, GiSecurityGate } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdPendingActions } from "react-icons/md";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import showAlert from "../../../shared/showAlert";

const Sidebar = () => {
  const sidebarResponsive = matchMedia("(max-width: 768px)");
  // const cambiarMQ = (mediaQ) => {
  //   if (mediaQ.matches === false) {
  //     return true;
  //   }
  // };
  // cambiarMQ(sidebarResponsive)
  const history = useHistory();
  const [sidebar, setSidebar] = useState(
    sidebarResponsive.matches ? false : true
  );
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const showSidebar = () => setSidebar(!sidebar);

  // Funciona, buscar manera de optimizar
  useEffect(() => {
    if (sidebar === true) {
      window.document.querySelector(".sidebar_header").style.paddingLeft =
        "300px";
      window.document.querySelector(".sidebar_header").style.transition =
        "350ms";
    } else {
      window.document.querySelector(".sidebar_header").style.paddingLeft =
        "0px";
    }
  }, [sidebar]);

  const handleSessionClose = () => {
    localStorage.removeItem("token");
    showAlert({
      type: "success",
      title: "Sesión cerrada",
      message: "Sesión cerrada correctamente",
    }) && history.push("/PallasFront/login");
  };

  return (
    <div>
      <div className="sidebar_sidebar">
        <div className="sidebar_menu-bars">
          <GiHamburgerMenu onClick={showSidebar} />
        </div>
        <div className="sidebar-profile">
          <button
            className="sidebar_session-close"
            onClick={handleSessionClose}
          >
            Cerrar Session
          </button>
        </div>
      </div>
      {/* <nav className="sidebar_nav-menu" style={{width: sidebar ? "200px" : "0px"}}></nav> */}
      <nav className={sidebar ? "sidebar_nav-menu active" : "sidebar_nav-menu"}>
        <ul className="sidebar_nav-menu--items">
          <li className="sidebar_sidebar-toggle">
            <div className="sidebar_menu-bars">
              <AiOutlineClose onClick={showSidebar} />
            </div>
          </li>
          <li className="sidebar_sidebar--title">Pallas</li>
          {DataSidebar.map((e, i) => {
            return (
              <li key={i} className="sidebar_data--items">
                <Link to={e.link}>
                  <span>{e.icon}</span>
                  <span>{e.title}</span>
                </Link>
              </li>
            );
          })}
          <List
            sx={{ width: "100%", maxWidth: 360 }}
            component="nav"
            className="sidebar_submenu"
          >
            <ListItemButton onClick={handleClick} className="sidebar_collapses">
              <ListItemIcon className="sidebar_container-icon">
                <FaTasks style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
              {open ? (
                <MdExpandLess style={{ marginRight: "10px" }} />
              ) : (
                <MdExpandMore style={{ marginRight: "10px" }} />
              )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List
                sx={{
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
                className="sidebar_ulConfig"
              >
                {DataConfiguracion.map((e, i) => {
                  return (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={i}
                      className="sidebar_data--items"
                    >
                      <Link to={e.link}>
                        <span>{e.icon}</span>
                        <span>{e.title}</span>
                      </Link>
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>
          <List
            sx={{
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
            className="sidebar_submenu"
          >
            <ListItemButton
              onClick={handleClick2}
              className="sidebar_collapses"
            >
              <ListItemIcon className="sidebar_container-icon">
                <GiSecurityGate style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Seguridad" />
              {open2 ? (
                <MdExpandLess style={{ marginRight: "10px" }} />
              ) : (
                <MdExpandMore style={{ marginRight: "10px" }} />
              )}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {DataSeguridad.map((e, i) => {
                  return (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={i}
                      className="sidebar_data--items"
                    >
                      <Link to={e.link}>
                        <span>{e.icon}</span>
                        <span>{e.title}</span>
                      </Link>
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>

          <div className="sidebar_submenu">
            <ListItemButton
              onClick={handleClick3}
              className="sidebar_collapses"
            >
              <ListItemIcon className="sidebar_container-icon">
                <MdPendingActions style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Procesos" />
              {open3 ? (
                <MdExpandLess style={{ marginRight: "10px" }} />
              ) : (
                <MdExpandMore style={{ marginRight: "10px" }} />
              )}
            </ListItemButton>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <div>
                {DataProcesos.map((e, i) => {
                  return (
                    <div sx={{ pl: 4 }} key={i} className="sidebar_data--items">
                      <Link to={e.link}>
                        <span>{e.icon}</span>
                        <span>{e.title}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Collapse>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
