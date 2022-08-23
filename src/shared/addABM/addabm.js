import * as React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import "./addabm.css";

export default function Addabm({ to }) {
  return (
    <Link className="Addabm_link" to={to} role="button">
      <IoIosAddCircle />
    </Link>
  );
}
