import React, { useState, useEffect, useCallback } from "react";
import AdminBar from "./AdminBar";
import AdminGrid from "./AdminGrid";
import axios from "axios";
import Loading from "../../../components/Loading";
import Typography from "@mui/material/Typography";
import { useRefresh } from "../AuthPage/UseRefresh";

const Admin = ({ userName, setUser }) => {
  const [games, setGames] = useState([]);
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id
  const [isLoading, setIsLoading] = useState(true);
  const { refreshToken }  = useRefresh();

  const fetchGames = useCallback(async (authToken) => {
    try {
      const response = await axios.get(`https://movies-app-python.onrender.com/showgames/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setGames(response.data.games);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      const newToken = await refreshToken();
      await fetchGames(newToken);
    }
  }, [token, userId]);

  const handleGameUpdated = () => {
    fetchGames(token);
  };

  useEffect(() => {
    fetchGames(token);
  }, [fetchGames]);

  if (isLoading) {
    return <Loading/>;
  }
  
  return (
    <>
    <AdminBar setUser={setUser}/>
    <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{ color: "white" }}
      >
        Welcome back, {userName}
      </Typography>
    <AdminGrid itemsPerPage={9} games={games} onGameUpdated={handleGameUpdated} />
  </>
  );
};

export default Admin;
