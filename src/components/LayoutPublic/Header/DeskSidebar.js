import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
DataSidebar,
DataConfiguracion,
DataSeguridad,
DataProcesos,
DataUser,
} from "./DataSidebar";
import "./Sidebar.css";
import { FaTasks } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdPendingActions } from "react-icons/md";
import { GiSecurityGate } from "react-icons/gi";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import showAlert from "../../../shared/showAlert";
import PallasFavicon from "../../../image/ico-favicon.png";



const DeskSidebar = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    
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
                {DataUser.map((e, i) => {
                            return (
                                <li key={i} className="sidebar_data-user">
                                    <Link to={e.link}>
                                        <span>{e.icon}</span>
                                        <span>{e.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                </div>
            </div>
            <div>
                <nav className="sidebar_nav-menu active">
                    <ul className="sidebar_nav-menu--items">
                        <li className="sidebar_sidebar--title"><img className="imagen-sidebar" src={PallasFavicon} alt=""/>Santiago Pallas</li>
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
                                onClick={handleClick}
                                className="sidebar_collapses"
                            >
                                <ListItemIcon className="sidebar_container-icon">
                                    <GiSecurityGate style={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Seguridad" />
                                {open ? (
                                    <MdExpandLess style={{ marginRight: "10px" }} />
                                ) : (
                                    <MdExpandMore style={{ marginRight: "10px" }} />
                                )}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
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
                                onClick={handleClick}
                                className="sidebar_collapses"
                            >
                                <ListItemIcon className="sidebar_container-icon">
                                    <MdPendingActions style={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Procesos" />
                                {open ? (
                                    <MdExpandLess style={{ marginRight: "10px" }} />
                                ) : (
                                    <MdExpandMore style={{ marginRight: "10px" }} />
                                )}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
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
                        <div className="sidebar_cerrar_seccion">
                            <button
                                className="sidebar_session-close"
                                onClick={handleSessionClose}>
                                Cerrar Session
                            </button>
                        </div>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default DeskSidebar
