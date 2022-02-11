import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://covid19southkorea.herokuapp.com/api/",
});
