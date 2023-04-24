import React, { useState, useEffect, useCallback } from "react";
import GameGrid from "./GameGrid";
import axios from "axios";
import Loading from "../../../components/Loading";
import Typography from "@mui/material/Typography";
import { useRefresh } from './../AuthPage/UseRefresh';
import Bar from "../../../components/Bar";


const Games = ({ userName }) => {
  const [games, setGames] = useState([]);
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id
  const [isLoading, setIsLoading] = useState(true);
  const { refreshToken }  = useRefresh();
  

  const fetchGames = useCallback(async () => {

    try {
      const response = await axios.get(`https://movies-app-python.onrender.com/showgames/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setGames(response.data.games);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // await refreshToken()
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.get(`https://movies-app-python.onrender.com/showgames/${userId}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
  
          setGames(response.data.games);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(true);
        }
    }
  }, [token, userId, refreshToken]);
  
  const handleGameUpdated = () => {
    fetchGames();
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return <Loading/>;
  }
  
  return (
    <>
      <Bar />
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{ color: "white", marginTop: 4 }}
      >
        Welcome back, {userName}
      </Typography>
      <GameGrid itemsPerPage={9} games={games} onGameUpdated={handleGameUpdated} />
    </>
  );
};

export default Games;
