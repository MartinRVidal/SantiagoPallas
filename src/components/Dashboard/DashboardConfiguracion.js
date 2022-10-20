import React from "react";
import Header from "../LayoutPublic/Header/Header";
import { FaTasks } from "react-icons/fa";
import { DataConfiguracion } from "../LayoutPublic/Header/DataSidebar";
import { useHistory } from "react-router-dom";
import ButtonsNavigation from "../ButtonsNavigation/ButtonsNavigation";
import { AiFillDashboard } from "react-icons/ai";

const DashboardConfiguracion = () => {
  const history = useHistory();
  return (
    <div>
      <Header>
        <h1 className="dashboard-tituloPrincipal">
          <FaTasks />
          Configuración
        </h1>
        <ButtonsNavigation
          label1="Dashboard"
          label2="Configuración"
          icon1={<AiFillDashboard />}
          icon2={<FaTasks />}
          link1="/PallasFront"
        />
        <div className="dashboard_container">
          <h5>Menú de navegación</h5>
          <div className="dashboard_grid">
            {DataConfiguracion.map((e, i) => {
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
      </Header>
    </div>
  );
};

export default DashboardConfiguracion;
