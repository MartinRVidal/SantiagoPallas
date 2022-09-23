import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, Link } from "react-router-dom";
import showAlert from "../../shared/showAlert";
import { Dropdown , DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { DataUser, DataUserConfig } from "../LayoutPublic/Header/DataSidebar";
import { HiOutlineLogin } from "react-icons/hi";
import "./User.css";

const User = () => {
    const [dropdown, setDropdown] = useState(false);
    const history = useHistory();

    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown);
    }

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
        <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown}>
            <DropdownToggle>
            {DataUser.map((e, i) => {
                            return (
                                <li key={i} className="sidebar_data-user">
                                        <span>{e.icon}</span>
                                        <span>{e.title}</span>
                                </li>
                            );
                        })
                }
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem>
                {DataUserConfig.map((e, i) => {
                    return (
                        <div key={i} className="sidebar_cerrar_seccion">
                            <Link to={e.link}>
                                <span className="icon">{e.icon}</span>
                                <span className="title">{e.title}</span>
                            </Link>
                        </div>
                    );
                })
                }
                </DropdownItem>
                <DropdownItem>
                    <div className="sidebar_cerrar_seccion">
                        <button className="sidebar_session-close" onClick={handleSessionClose}>
                            <HiOutlineLogin className="icon"/>Cerrar session
                        </button>
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
)
}

export default User
