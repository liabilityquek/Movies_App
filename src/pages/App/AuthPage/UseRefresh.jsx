
import { useState, useEffect } from "react";
import axios from "axios";

export function useRefresh() {
  const [user, setUser] = useState(null);

  const refreshToken = async () => {
    console.log(`calling refreshToken`)
    try {
      const response = await axios.post(
      `https://movies-app-python.onrender.com/refresh`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
        }
      );

      localStorage.setItem("token", response.data.token);

      return response.data.token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try{
          const decodedToken = JSON.parse(window.atob(token.split(".")[1]));
  
          if (decodedToken.exp * 1000 < Date.now()) {
            await refreshToken();
          }

        }catch(error){
          console.error('error refreshing token: ', error)
        }
      }
    };

    checkTokenExpiration();
  }, []);

  return { user, setUser, refreshToken };
}
