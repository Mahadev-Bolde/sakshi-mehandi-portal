import axios from "axios";
import server from "../envirnment";

const API = axios.create({
  baseURL: `${server}/api`,
  withCredentials: true,
});

export default API;
