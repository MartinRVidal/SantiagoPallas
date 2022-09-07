import React from "react";
import { FiUserCheck } from "react-icons/fi";
import { AiFillDashboard } from "react-icons/ai";
import { DiTrello } from "react-icons/di";
import { VscServerProcess } from "react-icons/vsc";
import { MdAddTask, MdSecurity } from "react-icons/md";

export const DataSidebar = [
  {
    icon: <AiFillDashboard />,
    title: "Dashboard",
    link: "/PallasFront",
  },
  {
    icon: <DiTrello />,
    title: "Tablero",
    link: "/PallasFront/tablero",
  },
  {
    icon: <FiUserCheck />,
    title: "Login",
    link: "/PallasFront/login",
  },
];

export const DataConfiguracion = [
  {
    icon: <MdAddTask />,
    title: "Tipos de Articulos",
    link: "/PallasFront/tipo-de-articulos",
  },
  {
    icon: <MdAddTask />,
    title: "Tipos de Medidas",
    link: "/PallasFront/tipos-de-medidas",
  },
  {
    icon: <MdAddTask />,
    title: "Maquinas",
    link: "/PallasFront/maquinas",
  },
  {
    icon: <MdAddTask />,
    title: "Insumos/Productos",
    link: "/PallasFront/articulos",
  },
  {
    icon: <MdAddTask />,
    title: "Recursos Productivos",
    link: "/",
  },
  {
    icon: <MdAddTask />,
    title: "Clientes y Proveedores",
    link: "/",
  },
  {
    icon: <MdAddTask />,
    title: "Depositos",
    link: "/PallasFront/depositos",
  },
  {
    icon: <MdAddTask />,
    title: "Etapas Productivas",
    link: "/",
  },
];

export const DataSeguridad = [
  {
    icon: <MdSecurity />,
    title: "Roles",
    link: "/PallasFront/roles",
  },
  {
    icon: <MdSecurity />,
    title: "Usuarios",
    link: "/PallasFront/usuarios",
  },
];

export const DataProcesos = [
  {
    icon: <VscServerProcess />,
    title: "Consulta de órdenes",
    link: "/",
  },
];