import axios from "axios";

const BASE_URL = "http://26.204.148.246:9090/api";

const tokenn = window.localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${tokenn}`,
    "Access-Control-Expose-Headers": "Access-Control-*",
    "Access-Control-Allow-Headers":
    "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
};

/**
 * Function to generate a POST request
 * @param {string} route  Endpoint's route. Example: "maquinas"
 * @param {Object} postData Object with the post data
 * @returns {Promise}
 */

export const privatePostRequest = async (route, postData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/${route}`, postData, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to generate a DELETE request
 * @param {string} url  Endpoint's url. Example: "maquinas"
 * @param {Object} deleteData Object with the post data
 * @returns {Promise}
 */

export const privateDeleteRequest = async (route, deleteData) => {
  try {
    const { res } = await axios.post(
      `${BASE_URL}/${route}`,
      deleteData,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Function to generate a DELETE request by id
 * @param {string} url - url del abm + el id correspondiente
 * Example: articulos/delete?id=${id}
 */

export const privateDeleteRequestByQuery = async ({ url }) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, {}, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to generate a GET request
 * @param {string} sector  Endpoint's sector. Example: "maquinas". Si el valor de "sector" es auth va a realizar una peticion distinta relacionada a la utentificacion
 * @param {number} id  El id seria un dato en especifico que se quiera devolver. Puede ir null
 * @returns {Promise}
 */

export const getDataMethodPrivate = async (route) => {
  try {
    const result = await axios.get(`${BASE_URL}/${route}`, config);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// function tokenFromLocalStorage() {
//   const token = window.localStorage.getItem("token");
//   if (!token || token === "undefined") {
//     console.log("No token in local storage");
//     return null;
//   }
//   return `Bearer ${token}`;
// }
