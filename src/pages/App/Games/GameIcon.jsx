import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
// import Loading from './../../../components/Loading';
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
  // const [isLoading, setIsLoading] = useState(true);
  const { refreshToken } = useRefresh();

  useEffect(() => {
    const checkIfGameHasBeenLiked = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/checklikes/${games._id.$oid}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          "check whether user has liked:",
          JSON.stringify(response.data, null, 2)
        );

        setFavourite(response.data.user_liked);
        // setIsLoading(false)
      } catch (error) {
        console.log(error);
        await refreshToken();
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.get(
            `http://localhost:5000/checklikes/${games._id.$oid}/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          console.log(
            "check whether user has liked:",
            JSON.stringify(response.data, null, 2)
          );

          setFavourite(response.data.user_liked);
          // setIsLoading(false)
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (games._id && games._id.$oid) {
      checkIfGameHasBeenLiked();
    }
  }, [games._id.$oid]);

  const handleFavourite = async (newFavoriteState) => {
    if (newFavoriteState) {
      try {
        const response = await axios.post(
          `http://localhost:5000/newlikes/${userId}/${games._id.$oid}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Adding to likes: ", response.data);
        handleLikeChange(1);
        onGameUpdated();
      } catch (error) {
        console.log(error);
        await refreshToken();
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.post(
            `http://localhost:5000/newlikes/${userId}/${games._id.$oid}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          console.log("Adding to likes: ", response.data);
          handleLikeChange(1);
          onGameUpdated();
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        const response = await axios.delete(
          `http://localhost:5000/deletelikes/${userId}/${games._id.$oid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Removing likes: ", response.data);
        handleLikeChange(-1);
        onGameUpdated();
      } catch (error) {
        console.log(error);
        await refreshToken();
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.delete(
            `http://localhost:5000/deletelikes/${userId}/${games._id.$oid}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          console.log("Removing likes: ", response.data);
          handleLikeChange(-1);
          onGameUpdated();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const clickedFavouriteIcon = async () => {
    const newFavoriteState = !favourite;
    setFavourite(newFavoriteState);
    handleFavourite(newFavoriteState);
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
