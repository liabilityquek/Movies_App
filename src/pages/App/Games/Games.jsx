import React, { useState, useEffect, useCallback } from "react";
import GameBar from "./GameBar";
import GameGrid from "./GameGrid";
import axios from "axios";
import Loading from "../../../components/Loading";
import Typography from "@mui/material/Typography";

const Games = ({ userName }) => {
  const [games, setGames] = useState([]);
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/showgames/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGames(response.data.games);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true)
    }
  }, [token, userId]);

  const handleGameUpdated = () => {
    fetchGames();
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  if (isLoading) {
    return <Loading/>;
  }
  
  return (
    <>
      <GameBar />
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
      <GameGrid itemsPerPage={9} games={games} onGameUpdated={handleGameUpdated}/>
    </>
  );
};

export default Games;
