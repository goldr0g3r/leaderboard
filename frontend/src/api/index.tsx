import axios from "axios";

const backendUrl = "http://localhost:8080/api";

export const api = axios.create({
  baseURL: backendUrl,
});
