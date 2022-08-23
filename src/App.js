import mockData from "./utils/mockdata";
import { useState } from "react";
import ContextAPI from "./utils/contextAPI";
import uuid from "react-uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import Tablero from "./components/Tablero/Tablero";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import "./App.css";
import TipoDeArticulosGet from "./components/ABM/TipoDeArticulos/TipoDeArticulosGet";
import TipoDeArticulos from "./components/ABM/TipoDeArticulos/TipoDeArticulos";
import TiposDeMedidasList from "./components/ABM/TipoDeMedidas/TiposDeMedidasList";
import TiposDeMedidasForm from "./components/ABM/TipoDeMedidas/TiposDeMedidasForm";
import MaquinasList from "./components/ABM/Maquinas/MaquinasList";
import MaquinasForm from "./components/ABM/Maquinas/MaquinasForm";
import UsuariosList from "./components/ABM/Usuarios/UsuariosList";
import UsuariosForm from "./components/ABM/Usuarios/UsuariosForm";
import RolesList from "./components/ABM/Roles/RolesList";
import RolesForm from "./components/ABM/Roles/RolesForm";
import DepositosList from "./components/ABM/Depositos/DepositosList";
import DepositosForm from "./components/ABM/Depositos/DepositosForm";
import PrivateRoutes from "./Routes/private.routes";
import DashboardConfiguracion from "./components/Dashboard/DashboardConfiguracion";
import DashboardSeguridad from "./components/Dashboard/DashboardSeguridad";
import DashboardProcesos from "./components/Dashboard/DashboardProcesos";
import ArticulosList from "./components/ABM/Articulos/ArticulosList";
import ArticulosForm from "./components/ABM/Articulos/ArticulosForm";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  const [data, setData] = useState(mockData);

  const updateListTitle = (newTitle, listId) => {
    const list = data.lists[listId];
    list.title = newTitle;
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };
  const updateTitleCard = (newTitle, listId, cardId) => {
    const list = data.lists["list-1"];
    const card = list.cards["card-1"];

    card.title = newTitle;
    console.log(card.title);

    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };
  const addCard = (title, listId) => {
    const newCardId = uuid();

    const newCard = {
      id: newCardId,
      title: title,
    };
    // añadimos el newCard al array
    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };
  const addList = (title) => {
    // generar un id para la lista
    const newListId = uuid();
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: {
          id: newListId,
          title: title,
          cards: [],
        },
      },
    });
  };
  // En package.json DEV -> "homepage": "http://localhost:3000/PallasFront/",
  // En package.json PROD -> "homepage": "http://26.204.148.246/PallasFront/",
  // const rutaPallas = "/PallasFront";
  // basename="/PallasFront"
  // http://26.204.148.246/PallasFront/
  // cuando cambio de pantalla me va a http://26.204.148.246/login sin el PallasFront

  // Ir a Red -> \\26.204.148.246\PallasFront
  return (
    <ContextAPI.Provider
      value={{ updateListTitle, addCard, addList, updateTitleCard }}
    >
      <Router>
        <div>
          <Switch>
            <PrivateRoutes exact path="/PallasFront" component={Dashboard} />
            <PrivateRoutes
              exact
              path="/PallasFront/Configuracion"
              component={DashboardConfiguracion}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/Seguridad"
              component={DashboardSeguridad}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/Procesos"
              component={DashboardProcesos}
            />

            <PrivateRoutes
              exact
              path="/PallasFront/tablero"
              component={Tablero}
            />
            <Route exact path="/PallasFront/login" component={Login} />
            <PrivateRoutes
              exact
              path="/PallasFront/register"
              component={Register}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/tipo-de-articulos"
              component={TipoDeArticulosGet}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/tipo-de-articulos-form"
              component={TipoDeArticulos}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/tipos-de-medidas"
              component={TiposDeMedidasList}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/tipos-de-medidas-form"
              component={TiposDeMedidasForm}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/maquinas"
              component={MaquinasList}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/maquinas-form"
              component={MaquinasForm}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/usuarios"
              component={UsuariosList}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/usuarios-form"
              component={UsuariosForm}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/roles"
              component={RolesList}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/roles-form"
              component={RolesForm}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/depositos"
              component={DepositosList}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/depositos-form"
              component={DepositosForm}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/articulos"
              component={ArticulosList}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/articulos-form"
              component={ArticulosForm}
            />
            <PrivateRoutes
              exact
              path="/PallasFront/page-not-found"
              component={PageNotFound}
            />
          </Switch>
        </div>
      </Router>
    </ContextAPI.Provider>
  );
}

export default App;
