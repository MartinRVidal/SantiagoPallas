import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  usuariosInfo: [],
  loading: false,
};

const USUARIOS = "USUARIOS";
const LOADING = "LOADING";

export default function UsuariosReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
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
