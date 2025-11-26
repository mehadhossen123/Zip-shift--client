import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';



const instance = axios.create({
  baseURL: "http://localhost:4000",
});

const useAxiosSecure = () => {
  const navigate=useNavigate()
  const { user, userLogout } = useAuth();
  useEffect(()=>{
    //interceptor request 

    const requestInterceptor=instance.interceptors.request.use(config=>{
      config.headers.Authorization=`Bearer ${user?.accessToken}`
      return config;
    })
    //  interceptor response
    const responseInterceptor=instance.interceptors.response.use((response)=>{

      return response;
    },(error)=>{
      console.log(error)

      const errorStatus = error.status;
      if(errorStatus===401|| errorStatus===403){
         userLogout().then(()=>{
          navigate("/login")

         })

      }
      return Promise.reject(error)
    })

return ()=>{
  instance.interceptors.request.eject(requestInterceptor)
  instance.interceptors.response.eject(responseInterceptor)

}

  },[user,userLogout,navigate])
    return instance
};

export default useAxiosSecure;