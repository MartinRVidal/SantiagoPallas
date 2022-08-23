import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import TiposDeMedidasReducer from "./actionsABM/reducerTiposDeMedidas";
import MaquinasReducer from "./actionsABM/reducerMaquinas";
import UsuariosReducer from "./actionsABM/reducerUsuarios";
import RolesReducer from "./actionsABM/reducerRoles";
import DepositosReducer from "./actionsABM/reducerDepositos";
import ArticulosReducer from "./actionsABM/reducerArticulos";
import LoginReducer from "./login";
import RegisterReducer from "./register";

const rootReducer = combineReducers({
  user: LoginReducer,
  register: RegisterReducer,
  tiposDeMedidas: TiposDeMedidasReducer,
  maquinas: MaquinasReducer,
  users: UsuariosReducer,
  roles: RolesReducer,
  depositos: DepositosReducer,
  articulos: ArticulosReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function genereteStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
