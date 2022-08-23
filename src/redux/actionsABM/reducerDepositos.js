import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  depositosInfo: [],
  loading: false,
};

const DEPOSITOS = "DEPOSITOS";
const LOADING = "LOADING";

export default function DepositosReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case DEPOSITOS:
      return {
        ...state,
        depositosInfo: payload.depositosInfo,
        error: false,
        loading: false,
      };
    case LOADING:
      return { ...state, loading: true };
    default:
      return defaultValue;
  }
}

export const depositosAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("depositos/get");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: DEPOSITOS,
      payload: { depositosInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};
