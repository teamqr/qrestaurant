import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://localhost:8080",
});

export default axios;
