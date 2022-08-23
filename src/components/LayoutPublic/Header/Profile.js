import { makeStyles } from "@material-ui/core";
import React from "react";
import backgraund_image from "../../../image/Nico.jpg";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyItems: "flex-end",
    //     alignItems: "center",
    gap: "15px",
    padding: theme.spacing(1),
    width: "100%",
  },
  containerImgPerfil: {
    display: "flex",
    alignItems: "center",
  },
  img: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.2)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  name: {
    fontSize: "1.2rem",
    color: "rgb(235, 235, 235)",
  },
  rol: {
    fontSize: "1rem",
    color: "rgb(165, 165, 165)",
  },
}));

export default function Profile() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.containerImgPerfil}>
        <img src={backgraund_image} alt="noImage" className={classes.img} />
      </div>
      <div className={classes.text}>
        <div className={classes.name}>Nicolas Grillo</div>
        <div className={classes.rol}>Administrador</div>
      </div>
    </div>
  );
}
