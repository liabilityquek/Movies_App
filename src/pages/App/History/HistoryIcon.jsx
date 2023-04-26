import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useRefresh } from "../AuthPage/UseRefresh";

export default function HistoryIcon({ movieData }) {
  const [favourite, setFavourite] = useState(false);
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id;
  const { refreshToken } = useRefresh();
  useEffect(() => {
    const checkIfMovieIsInsideFavourite = async (authToken) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/showsinglefavourite/${userId}/${encodeURIComponent(
            movieData.title
          )}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setFavourite(response.data.hasOwnProperty("favourites"));
      } catch (error) {
        console.log(error);
        const newToken = await refreshToken();
        await checkIfMovieIsInsideFavourite(newToken);
      }
    };
    checkIfMovieIsInsideFavourite(token);
  }, [movieData.title, token, refreshToken]);

  const handleFavourite = async (newFavoriteState, authToken) => {
    if (newFavoriteState) {
      // Send POST request when adding to favorites
      try {
        const response = await axios.post(
          `http://localhost:5000/favourite/${userId}`,
          {
            title: movieData.title,
            year: movieData.release_date,
            rating: movieData.vote_average,
            description: movieData.overview,
            image_url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Adding to favorites: ", response.data);
      } catch (error) {
        console.log(error);
        const newToken = await refreshToken();
        await handleFavourite(newToken);
      }
    } else {
      // DELETE request when removing from favorites
      try {
        const response = await axios.delete(
          `http://localhost:5000/deletefavourite/${userId}/${encodeURIComponent(
            movieData.title
          )}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Removing from favorites: ", response.data);
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

  return (
    <>
      {favourite ? (
        <FavoriteIcon
          onClick={clickedFavouriteIcon}
          sx={{ borderColor: "white", color: "red", cursor: "pointer" }}
        />
      ) : (
        <FavoriteIcon
          onClick={clickedFavouriteIcon}
          sx={{ borderColor: "white", color: "white", cursor: "pointer" }}
        />
      )}
    </>
  );
}
