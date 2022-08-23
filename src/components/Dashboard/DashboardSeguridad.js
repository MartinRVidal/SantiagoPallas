import React from "react";
import Header from "../LayoutPublic/Header/Header";
import { GiSecurityGate } from "react-icons/gi";
import { DataSeguridad } from "../LayoutPublic/Header/DataSidebar";
import { useHistory } from "react-router-dom";
import ButtonsNavigation from "../ButtonsNavigation/ButtonsNavigation";
import { AiFillDashboard } from "react-icons/ai";

const DashboardSeguridad = () => {
  const history = useHistory();
  return (
    <div>
      <Header>
        <h1 className="dashboard-tituloPrincipal">
          <GiSecurityGate />
          Seguridad
        </h1>
        <ButtonsNavigation
          label1="Dashboard"
          label2="Seguridad"
          icon1={<AiFillDashboard />}
          icon2={<GiSecurityGate />}
          link1="/PallasFront"
        />
        <div className="dashboard_container">
          <h5>Menú de navegación</h5>
          <div className="dashboard_grid">
            {DataSeguridad.map((e, i) => {
              return (
                <div
                  className="dashboard_container-card"
                  key={i}
                  onClick={() => history.push(e.link)}
                >
                  <h3 className="dashboard_title">{e.title}</h3>
                  <span className="dashboard_icon">{e.icon}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default DashboardSeguridad;
