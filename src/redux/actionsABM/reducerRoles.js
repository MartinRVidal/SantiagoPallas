import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  rolesInfo: [],
  loading: false,
};

const ROLES = "ROLES";
const LOADING = "LOADING";

export default function RolesReducer(state = defaultValue, { type, payload }) {
  switch (type) {
    case ROLES:
      return {
        ...state,
        rolesInfo: payload.rolesInfo,
        error: false,
      };
    case LOADING:
      return { ...state, loading: true };
    default:
      return defaultValue;
  }
}

export const rolesAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("roles/get");
    console.log(response);
    const data = response?.data;
    dispatch({
      type: ROLES,
      payload: { rolesInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};
