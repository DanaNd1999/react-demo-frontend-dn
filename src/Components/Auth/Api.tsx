import axios from "axios";
import React, { useState } from "react";

const Api = () => {
  const [token, setToken] = useState("");

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    return tokenString;
  };

  const saveToken = (token: string) => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const httpAuth = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getToken(),
      withCredentials: true,
    },
  });

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: { "Content-type": "application/json" },
  });

  return { http, httpAuth, getToken, saveToken };
};

export default Api;
