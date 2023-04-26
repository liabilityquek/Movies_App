import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useRefresh } from "./../AuthPage/UseRefresh";

export default function GameIcon({
  games,
  handleLikeChange,
  likes,
  onGameUpdated,
}) {
  const [favourite, setFavourite] = useState(false);
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id;
  const { refreshToken } = useRefresh();

  useEffect(() => {
    const checkIfGameHasBeenLiked = async (authToken) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/checklikes/${games._id.$oid}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(
          "check whether user has liked:",
          JSON.stringify(response.data, null, 2)
        );

        setFavourite(response.data.user_liked);
      } catch (error) {
        console.log(error);
        const newToken = await refreshToken();
        await checkIfGameHasBeenLiked(newToken);

      }
    };
    if (games._id && games._id.$oid) {
      checkIfGameHasBeenLiked(token);
    }
  }, [games._id.$oid]);

  const handleFavourite = async (newFavoriteState, authToken) => {
    if (newFavoriteState) {
      try {
        const response = await axios.post(
          `http://localhost:5000/newlikes/${userId}/${games._id.$oid}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Adding to likes: ", response.data);
        handleLikeChange(1);
        onGameUpdated();
      } catch (error) {
        console.log(error);
        const newToken = await refreshToken();
        await handleFavourite(newToken);
 
      }
    } else {
      try {
        const response = await axios.delete(
          `http://localhost:5000/deletelikes/${userId}/${games._id.$oid}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Removing likes: ", response.data);
        handleLikeChange(-1);
        onGameUpdated();
      } catch (error) {
        console.log(error);
        const newToken = await refreshToken();
        await handleFavourite(newFavoriteState, newToken);
       
      }
    }
  };

  const clickedFavouriteIcon = async () => {
    const newFavoriteState = !favourite;
    setFavourite(newFavoriteState);
    handleFavourite(newFavoriteState, token);
  };

  // if(isLoading){
  //   return <Loading />
  // }

  return (
    <>
      {favourite ? (
        <ThumbUpIcon
          onClick={clickedFavouriteIcon}
          sx={{ color: "blue", cursor: "pointer" }}
        />
      ) : (
        <ThumbUpIcon
          onClick={clickedFavouriteIcon}
          sx={{ color: "white", cursor: "pointer" }}
        />
      )}
    </>
  );
}
