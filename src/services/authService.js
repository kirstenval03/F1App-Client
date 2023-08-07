import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

const getToken = () => {
  return localStorage.getItem("authToken");
};

export const get = (route, isStaff = false) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  if (isStaff) {
  }

  return axios.get(SERVER_URL + route, {
    headers: headers,
  });
};

export const post = (route, body, isStaff = false) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  if (isStaff) {
  }

  return axios.post(SERVER_URL + route, body, {
    headers: headers,
  });
};
