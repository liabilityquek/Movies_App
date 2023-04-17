import React, { useState, useEffect } from "react";
import HomeBar from "./HomeBar";
import axios from "axios";
import MovieImages from "./MovieImages";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");

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
            "Authorization": "Bearer " + token,
          },
        },
      );
      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: "8c6afdd4f8e60448372b995095920f03",
              query: searchValue,
            },
            headers: {
              "Authorization": "Bearer " + token,
            },
          }
        );

        // console.log(JSON.stringify(response.data, null, 2));
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
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

  return (
    <>
      <HomeBar handleSearch={handleSearch} />

      <MovieImages images={movies} />
    </>
  );
}
