import * as React from "react";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import "./addabm.css";

export default function addabmorden({ to }) {
    return (
        <Link to={to} role="button" type="submit">
            <IoIosAdd />
        </Link>
    );
}