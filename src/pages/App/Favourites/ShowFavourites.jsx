import React, { useState, useEffect } from "react";
import axios from "axios";
import FavouritesCard from "./FavouritesCard";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import moment from "moment/moment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const ShowFavourites = () => {
  const [favourite, setFavourite] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id
  const sortHandleChange = (e) => {
    setSort(e.target.value);
  };

  const handleChange = (value) => {
    setPage(value);
  };

  useEffect(() => {
    getAllFavourites();
  }, []);

  const getAllFavourites = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/showfavourite/${userId}`,
       {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          })
      setFavourite(response.data.favourites);
     
        // console.log(`ShowFhowFavourites: ${JSON.stringify(response.data.favourites[0].name.$oid)}`);
      
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavourites = async (title) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deletefavourite/${userId}/${encodeURIComponent(
          title
        )}`,
         {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
      );
      console.log("Removing from favorites: ", response.data);
      setFavourite((prevFavourites) =>
        prevFavourites.filter((fav) => fav.title !== title)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sortOption = () => {
    return favourite.slice().sort((a, b) => {
      switch (sort) {
        case "title":
          return a.title.localeCompare(b.title, { ignorePunctuation: true });
        case "year":
          return moment(a.year).valueOf() - moment(b.year).valueOf();
        case "rating":
          return a.rating - b.rating;
        default:
          return null;
      }
    });
  };
  return (
    <div>
      <Box marginRight={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120  }}>
        <InputLabel id="sort-label" sx={{ "&.MuiInputLabel-root": { color: "white" } }}>Sort by</InputLabel>
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
          .slice((page - 1) * 9, page * 9)
          .map((f, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FavouritesCard f={f} onDelete={removeFavourites} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={Math.ceil(favourite.length / 9)}
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
    </div>
  );
};

export default ShowFavourites;
