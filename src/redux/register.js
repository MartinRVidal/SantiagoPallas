import { privatePostRequest } from "../services/privateApiServices";
import showAlert from "../shared/showAlert";

const defaultValue = {
  registerInfo: {},
  loading: false,
  error: false,
};

const REGISTER = "LOGIN";
const LOADING = "LOADING";
const ERROR = "ERROR";

export default function RegisterReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case REGISTER:
      return { ...state, infoRegister: payload, error: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
}

export const registerAction =
  ({ UserName, email, password }) =>
  async (dispatch) => {
    try {
      const response = await privatePostRequest("auth/register", {
        UserName,
        email,
        password,
      });

      if (response.status === 200) {
        showAlert({ type: "success", title: "Registro exitoso" });
      }

      dispatch({
        type: REGISTER,
        payload: response,
      });
    } catch (error) {
      showAlert({
        type: "error",
        title: "El usuario ya existe",
        message: "Intentalo nuevamente",
      });
      dispatch({
        type: ERROR,
      });
    } finally {
      dispatch({
        type: LOADING,
      });
    }
  };
