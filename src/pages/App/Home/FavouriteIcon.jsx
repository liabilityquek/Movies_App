import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useRefresh } from "../AuthPage/UseRefresh";

export default function FavouriteIcon({ image }) {
  const [favourite, setFavourite] = useState(false);
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id;
  const { refreshToken } = useRefresh();
  useEffect(() => {
    const checkIfMovieIsInsideFavourite = async () => {
      try {
        const response = await axios.get(
          `${process.env.SERVER}/showsinglefavourite/${userId}/${encodeURIComponent(
            image.title
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavourite(response.data.hasOwnProperty("favourites"));
      } catch (error) {
        console.log(error);
        await refreshToken();
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.get(
            `${process.env.SERVER}/showsinglefavourite/${userId}/${encodeURIComponent(
              image.title
            )}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          setFavourite(response.data.hasOwnProperty("favourites"));
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkIfMovieIsInsideFavourite();
  }, [image.title]);

  const handleFavourite = async (newFavoriteState) => {
    if (newFavoriteState) {
      // Send POST request when adding to favorites
      try {
        const response = await axios.post(
          `${process.env.SERVER}/favourite/${userId}`,
          {
            title: image.title,
            year: image.release_date,
            rating: image.vote_average,
            description: image.overview,
            image_url: `https://image.tmdb.org/t/p/w500${image.poster_path}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Adding to favorites: ", response.data);
      } catch (error) {
        console.log(error);
        await refreshToken();
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.post(
            `${process.env.SERVER}/favourite/${userId}`,
            {
              title: image.title,
              year: image.release_date,
              rating: image.vote_average,
              description: image.overview,
              image_url: `https://image.tmdb.org/t/p/w500${image.poster_path}`,
            },
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          console.log("Adding to favorites: ", response.data);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // DELETE request when removing from favorites
      try {
        const response = await axios.delete(
          `${process.env.SERVER}/deletefavourite/${userId}/${encodeURIComponent(
            image.title
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Removing from favorites: ", response.data);
      } catch (error) {
        console.log(error);
        await refreshToken();
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.delete(
            `${process.env.SERVER}/deletefavourite/${userId}/${encodeURIComponent(
              image.title
            )}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          console.log("Removing from favorites: ", response.data);
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
