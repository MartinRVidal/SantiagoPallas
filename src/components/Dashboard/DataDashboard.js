import { MdPendingActions } from "react-icons/md";
import { GiSecurityGate } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import { DiTrello } from "react-icons/di";

export const DataDashboard = [
  {
    icon: <DiTrello />,
    title: "Tablero",
    link: "/PallasFront/tablero",
  },
  {
    icon: <FaTasks />,
    title: "Configuración",
    link: "/PallasFront/Configuracion",
  },
  {
    icon: <GiSecurityGate />,
    title: "Seguridad",
    link: "/PallasFront/Seguridad",
  },
  {
    icon: <MdPendingActions />,
    title: "Procesos",
    link: "/PallasFront/Procesos",
  },
];
