import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  articulosInfo: [],
  clientesInfo: [],
  tipoDeArticulosInfo: [],
  usuariosInfo: [],
  loading: false,
};
const TIPO_DE_ARTICULOS = "TIPO_DE_ARTICULOS";
const ARTICULOS = "ARTICULOS";
const LOADING = "LOADING";
const CLIENTES = "CLIENTES";
const USUARIOS = "USUARIOS";

export default function ArticulosReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case ARTICULOS:
      return {
        ...state,
        articulosInfo: payload.articulosInfo,
        error: false,
        loading: false,
      };
    case TIPO_DE_ARTICULOS:
      return {
        ...state,
        tipoDeArticulosInfo: payload.tipoDeArticulosInfo,
        error: false,
      };
      case CLIENTES:
        return {
        ...state,
        clientesInfo: payload.clientesInfo,
        error: false,
        loading: false,
      };
    case USUARIOS:
      return {
        ...state,
        usuariosInfo: payload.usuariosInfo,
        error: false,
      };
    case LOADING:
      return { ...state, loading: true };
    default:
      return defaultValue;
  }
}

export const articulosAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("articulos");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: ARTICULOS,
      payload: { articulosInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};

export const tipoDeArticulosAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("tiposarticulo/get");
    console.log(response);
    const data = response?.data;
    dispatch({
      type: TIPO_DE_ARTICULOS,
      payload: { tipoDeArticulosInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};

export const clientesAction = () => async (dispatch) => {
  try {
      const response = await getDataMethodPrivate("Personas/Get");
      const data = response?.data;
      console.log(data);
      dispatch({
          type: CLIENTES,
          payload: { clientesInfo: data },
      });
  } catch (error) {
      console.log(error);
  } finally {
      dispatch({
          type: LOADING,
      });
  }
};

export const usuariosAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("users/get");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: USUARIOS,
      payload: { usuariosInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};
