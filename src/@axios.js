import axios from "axios";

const getTcknBase64 = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return btoa(user.tckn);
  }
  return null;
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(function (config) {
  const tckn = getTcknBase64();
  if (tckn) {
    config.headers["Authorization"] = `Bearer ${tckn}`;
  }
  return config;
});

export default instance;
