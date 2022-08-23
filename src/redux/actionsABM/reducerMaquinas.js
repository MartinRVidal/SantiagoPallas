import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  maquinasInfo: [],
  loading: false,
};

const MAQUINAS = "MAQUINAS";
const LOADING = "LOADING";

export default function MaquinasReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case MAQUINAS:
      return {
        ...state,
        maquinasInfo: payload.maquinasInfo,
        error: false,
      };
    case LOADING:
      return { ...state, loading: true };
    default:
      return defaultValue;
  }
}

export const maquinasAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("maquinas/get");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: MAQUINAS,
      payload: { maquinasInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};
