import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
    ordenesInfo: [],
    loading: false,
};

const ORDENES = "ORDENES";
const LOADING = "LOADING";

export default function OrdenesReducer(
    state = defaultValue,
    { type, payload }
) {
    switch (type) {
        case ORDENES:
            return {
                ...state,
                ordenesInfo: payload.ordenesInfo,
                error: false,
            };
        case LOADING:
            return { ...state, loading: true };
        default:
            return defaultValue;
    }
}

export const ordenesAction = () => async (dispatch) => {
    try {
        const response = await getDataMethodPrivate("OrdenesTrabajo/get");
        const data = response?.data;
        console.log(data);
        dispatch({
            type: ORDENES,
            payload: { ordenesInfo: data },
        });
    } catch (error) {
        console.log(error);
    } finally {
        dispatch({
            type: LOADING,
        });
    }
};