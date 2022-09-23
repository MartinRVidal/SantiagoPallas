import * as React from "react";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import "./addabm.css";

export default function Addabmuser({ to }) {
    return (
        <Link className="Addabm_link" to={to} role="button">
            <IoIosAdd /> <span className="spanlink">Añadir Usuario</span>
        </Link>
    );
}