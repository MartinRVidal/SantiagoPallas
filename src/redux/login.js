import {
  privatePostRequest,
  // getDataMethodPrivate,
} from "../services/privateApiServices";
import showAlert from "../shared/showAlert";

const defaultValue = {
  infoUser: {},
  token: null,
  loading: false,
  error: false,
  userId: [],
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const LOADING = "LOADING";
const ERROR = "ERROR";
// const SHOW_BY_ID = "SHOW_BY_ID";

export default function LoginReducer(state = defaultValue, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { ...state, infoUser: payload, error: false };

    case LOGOUT:
      return defaultValue;
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: true };
    // case SHOW_BY_ID:
    //   return { ...state, userId: payload, error: false };
    default:
      return state;
  }
}

export const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await privatePostRequest("auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("response", JSON.stringify(response));
      if (response.login) {
        window.location.reload() &&
          showAlert({ type: "success", title: "Login exitoso" });
      }
      console.log("infUser:", response);
      dispatch({
        type: LOGIN,
        payload: response,
        // token: localStorage.setItem("token", response.token),
      });
    } catch (error) {
      showAlert({
        type: "error",
        title: "Ha habido un error",
        message: "Email o contraseña incorrecta",
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

// export const loginByIdAction = (id) => async (dispatch) => {
//   try {
//     const response = await getDataMethodPrivate(`users/getbyid?id=${id}`);
//     console.log("userId:", response);
//     dispatch({
//       type: SHOW_BY_ID,
//       payload: response,
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: ERROR,
//     });
//   }
// };
