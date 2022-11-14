import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
});

export default API;
