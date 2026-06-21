import axios from "axios";
import server from "../environment.js";

const API = axios.create({
  baseURL: `${server}/api`,
  withCredentials: true,
});

export default API;
