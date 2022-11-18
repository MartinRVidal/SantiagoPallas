import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
    clientesInfo: [],
    loading: false,
};

const CLIENTES = "CLIENTES";
const LOADING = "LOADING";

export default function ClientesReducer(
    state = defaultValue,
    { type, payload }
) {
    switch (type) {
        case CLIENTES:
            return {
                ...state,
                clientesInfo: payload.clientesInfo,
                error: false,
                loading: false,
            };
        case LOADING:
            return { ...state, loading: true };
        default:
            return defaultValue;
    }
}

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