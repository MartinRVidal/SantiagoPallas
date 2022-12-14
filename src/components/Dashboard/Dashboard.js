import React from "react";
import { DataDashboard } from "./DataDashboard";
import { useHistory } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import Header from "../LayoutPublic/Header/Header";
import "./dashboard.css";
import ButtonsNavigation from "../ButtonsNavigation/ButtonsNavigation";
import GridLoader from "react-spinners/GridLoader";
import { useState , useEffect } from "react";

const Dashboard = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },700)
  },[]);


  return (
    loading?
    <GridLoader
      color="black"
      size={50}
      className="loader"
      />
    :
      <Header> 
        <div className="dashboard_allContainer">
          <h1 className="dashboard-tituloPrincipal">
            <AiFillDashboard />
            Dashboard <small className="span-tituloprincipal" >Seleccione una accion</small>
          </h1>
          <ButtonsNavigation label1="Dashboard" />
          <div className="dashboard_container">
            <h5>Menú de navegación</h5>
            <div className="dashboard_grid">
              {DataDashboard.map((e, i) => {
                return (
                  <div
                    className="dashboard_container-card"
                    key={i}
                    onClick={() => history.push(e.link)}
                  >
                    <span className="dashboard_icon">{e.icon}</span>
                    <h3 className="dashboard_title">{e.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Header>
    )
};

export default Dashboard;
