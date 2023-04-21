import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import HistoryCard from "./HistoryCard";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import moment from "moment/moment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Loading from "../../../components/Loading";

export default function HistoryGrid({ movieData, itemsPerPage, isLoading }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const sortHandleChange = (e) => {
    setSort(e.target.value);
  };

  const sortOption = () => {
    return movieData.slice().sort((a, b) => {
      switch (sort) {
        case "title":
          return a.title.localeCompare(b.title, { ignorePunctuation: true });
        case "year":
          return (
            moment(a.release_date).valueOf() - moment(b.release_date).valueOf()
          );
        case "rating":
          return a.vote_average - b.vote_average;
        default:
          return null;
      }
    });
  };

  return (
    <div>
      {isLoading ? (
      <Loading />
    ): movieData && movieData.length > 0 ? (
        <>
          <Box
            marginRight={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                id="sort-label"
                sx={{ "&.MuiInputLabel-root": { color: "white" } }}
              >
                Sort by
              </InputLabel>
              <Select
                labelId="sort-label"
                value={sort}
                onChange={sortHandleChange}
                label="Sort by"
                sx={{ bgcolor: "grey", borderRadius: 1 }}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="year">Release Date</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            {sortOption()
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((movie, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <HistoryCard movieData={movie} />
                </Grid>
              ))}
          </Grid>
          <Pagination
            count={Math.ceil(movieData.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                color: "white",
              },
            }}
          />
        </>
      ) : (
        <Typography
          variant="h6"
          color="white"
          sx={{ mt: 4, textAlign: "center" }}
        >
          Nothing to show..
        </Typography>
      )}
    </div>
  );
}
