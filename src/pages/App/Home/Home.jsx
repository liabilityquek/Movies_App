import React, { useState, useEffect } from "react";
import HomeBar from "./HomeBar";
import axios from "axios";
import MovieImages from "./MovieImages";
import Loading from "../../../components/Loading";
import Typography from "@mui/material/Typography";
import { useRefresh } from "./../AuthPage/UseRefresh";

export default function Home({ userName, setUser }) {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const { refreshToken } = useRefresh();

  console.log(`token: ${token}`);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const appendSearchValue = async (authToken) => {
    try {
      const response = await axios.post(
        "https://movies-app-python.onrender.com/history",
        { searchValue: searchValue },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
      await refreshToken();
      const newToken = await refreshToken();
      await appendSearchValue(newToken);
    }
  };

  useEffect(() => {
    const fetchMovies = async (authToken) => {
      try {
        // setIsLoading(true);
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: "8c6afdd4f8e60448372b995095920f03",
              query: searchValue,
            },
            headers: {
              Authorization: "Bearer " + authToken,
            },
          }
        );

        // console.log(JSON.stringify(response.data, null, 2));
        setIsLoading(false);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
        const newToken = await refreshToken();
        await fetchMovies(newToken);
      }
    };

    if (searchValue) {
      fetchMovies(token);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      appendSearchValue(token);
    }
  }, [searchValue]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <HomeBar handleSearch={handleSearch} setUser={setUser}/>
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

      <MovieImages images={movies} />
    </>
  );
}
