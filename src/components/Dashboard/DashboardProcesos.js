import React from "react";
import Header from "../LayoutPublic/Header/Header";
import { MdPendingActions } from "react-icons/md";
import { DataProcesos } from "../LayoutPublic/Header/DataSidebar";
import { useHistory } from "react-router-dom";
import ButtonsNavigation from "../ButtonsNavigation/ButtonsNavigation";
import { AiFillDashboard } from "react-icons/ai";

const DashboardProcesos = () => {
  const history = useHistory();
  return (
    <div>
      <Header>
        <h1 className="dashboard-tituloPrincipal">
          <MdPendingActions />
          Procesos
        </h1>
        <ButtonsNavigation
          label1="Dashboard"
          label2="Procesos"
          icon1={<AiFillDashboard />}
          icon2={<MdPendingActions />}
          link1="/PallasFront"
        />
        <div className="dashboard_container">
          <h5>Menú de navegación</h5>
          <div className="dashboard_grid">
            {DataProcesos.map((e, i) => {
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

export default DashboardProcesos;
