import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./ButtonsNavigation.css";

export default function ButtonsNavigation({
  label1,
  label2,
  label3,
  label4,
  icon1,
  icon2,
  icon3,
  icon4,
  link1,
  link2,
  link3,
  link4,
}) {
  return (
    <div>
      <Box className="ButtonsNavigation_container">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          to={link1}
        >
          {icon1}
          {label1}
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          to={link2}
        >
          {icon2}
          {label2}
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          to={link3}
        >
          {icon3}
          {label3}
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          to={link4}
        >
          {icon4}
          {label4}
        </Link>
      </Box>
    </div>
  );
}
