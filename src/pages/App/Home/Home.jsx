import React, { useState, useEffect } from "react";
import HomeBar from "./HomeBar";
import axios from "axios";
import MovieImages from "./MovieImages";
import Loading from "../../../components/Loading";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Home({ userName, subscriptionActive }) {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(`token: ${token}`);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const appendSearchValue = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/history",
        { searchValue: searchValue },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: "8c6afdd4f8e60448372b995095920f03",
              query: searchValue,
            },
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        // console.log(JSON.stringify(response.data, null, 2));
        setIsLoading(false);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (searchValue) {
      fetchMovies();
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      appendSearchValue();
    }
  }, [searchValue]);

  useEffect(() => {
    if (!subscriptionActive) {
      navigate("/account");
    }
  }, [subscriptionActive, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    <HomeBar handleSearch={handleSearch} />
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
