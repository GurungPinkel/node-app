import axios from "axios";
const HOST_URL = "https://pinkel.dev";

const AuthenticationApi = axios.create({
  baseURL: HOST_URL,
  method: "post",
});

export default AuthenticationApi;
