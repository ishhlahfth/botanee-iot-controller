import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}`,
  headers: {
    // 'Content-type': 'application/x-www-form-urlencoded'
    // 'Access-Control-Allow-Origin': '*',
  },
});

export default API;
