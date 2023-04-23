import React, { useState, useEffect } from "react";
import HistoryBar from "./HistoryBar";
import axios from "axios";
import HistoryGrid from "./HistoryGrid";
import Loading from "../../../components/Loading";
import Typography from "@mui/material/Typography";
import { useRefresh } from "../AuthPage/UseRefresh";

export default function History({ userName }) {
  const [showHistory, setShowHistory] = useState([]);
  const token = localStorage.getItem("token");
  console.log(`token in History: ${token}`);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshToken } = useRefresh();

  useEffect(() => {
    const showAllHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/showhistory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let movieResults = [];

        const removeDuplicateHistoryWords = response.data.search_history.filter(
          (element, index) => {
            return response.data.search_history.indexOf(element) === index;
          }
        );
        for (const element of removeDuplicateHistoryWords) {
          const movieData = await getMoviesBasedOnHistory(element);
          movieResults.push(...movieData.results);
        }
        setShowHistory(movieResults);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
        const newToken = await refreshToken();
        console.log("New token:", newToken);
        try {
          const response = await axios.get(
            "http://localhost:5000/showhistory",
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );

          let movieResults = [];

          const removeDuplicateHistoryWords =
            response.data.search_history.filter((element, index) => {
              return response.data.search_history.indexOf(element) === index;
            });
          for (const element of removeDuplicateHistoryWords) {
            const movieData = await getMoviesBasedOnHistory(element);
            movieResults.push(...movieData.results);
          }
          setShowHistory(movieResults);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(true);
        }
      }
    };

    showAllHistory();
  }, []);

  const getMoviesBasedOnHistory = async (element) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: "8c6afdd4f8e60448372b995095920f03",
            query: element,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error(error);
      const newToken = await refreshToken();
      console.log("New token:", newToken);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: "8c6afdd4f8e60448372b995095920f03",
              query: element,
            },
            headers: {
              Authorization: "Bearer " + newToken,
            },
          }
        );

        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <HistoryBar />
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

      <HistoryGrid
        movieData={showHistory}
        itemsPerPage={9}
        isLoading={isLoading}
      />
    </>
  );
}
