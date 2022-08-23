import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

export default function PrivateRoutes(props) {
  const dataUser = JSON.parse(localStorage.getItem("response"));

  console.log(dataUser);

  const location = useLocation();

  return dataUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/PallasFront/login",
        state: { from: location },
      }}
    />
  );
}
