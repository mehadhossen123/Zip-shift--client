import axios from 'axios';
import React from 'react';


const instance = axios.create({
  baseURL: "https://zap-app-server.vercel.app",
  // baseURL: "http://localhost:4000",
});

const useAxios = () => {
    return  instance;
};

export default useAxios;