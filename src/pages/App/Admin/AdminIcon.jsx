import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRefresh } from "../AuthPage/UseRefresh";

export default function AdminIcon({ games, onGameUpdated }) {
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id;
  const { refreshToken }  = useRefresh();

  const deleteGame = async (authToken) => {
    try {
      const response = await axios.delete(
        `https://movies-app-python.onrender.com/deletegame/${userId}/${encodeURIComponent(
          games.title
        )}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(JSON.stringify(response.data, null, 2));
      onGameUpdated();
    } catch (error) {
      console.log(error);
      const newToken = await refreshToken();
      await deleteGame(newToken);
    }
  };

  return (
    <>
<Link
  to={`/editgame/${games._id.$oid}`}
  style={{ textDecoration: "none" }}
>
  <EditOutlinedIcon
    sx={{ color: "white", cursor: "pointer", marginRight: 2 }}
  />
</Link>


      <ClearIcon
        onClick={deleteGame}
        sx={{ color: "white", cursor: "pointer" }}
      />
    </>
  );
}
