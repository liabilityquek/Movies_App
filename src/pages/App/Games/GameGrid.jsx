import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import GameCard from "./GameCard";
import Loading from "../../../components/Loading";

export default function GameGrid({ itemsPerPage, games, onGameUpdated, isLoading }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [likesCount, setLikesCount] = useState([]);


  const handleChange = (event, value) => {
    setPage(value);
  };

  const sortHandleChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    setLikesCount(games.map(game => game.likes ? game.likes.length : 0));
  }, [games]);

  const handleLikeChange = (index, increment) => {
    setLikesCount(likesCount.map((count, i) => i === index ? count + increment : count));
    
  };

  const sortOption = () => {
    return games
      .map((game, index) => ({ ...game, likesCount: likesCount[index] }))
      .sort((a, b) => {
        switch (sort) {
          case "title":
            return a.title.localeCompare(b.title, { ignorePunctuation: true });
          case "likes":
            return a.likesCount - b.likesCount;
          default:
            return 0;
        }
      });
  };
  

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
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
                <MenuItem value="likes">Likes</MenuItem>
              </Select>
            </FormControl>
          </Box>
  
          <Grid container spacing={2}>
            {sortOption()
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((game, index) => {
                console.log(
                  `likes in GameGrid for game ${game.title}: ${game.likesCount}, ${JSON.stringify(game, null, 2)}`
                );
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <GameCard
                      games={game}
                      likes={game.likesCount}
                      handleLikeChange={(increment) =>
                        handleLikeChange(games.indexOf(game), increment)
                      }
                      onGameUpdated={onGameUpdated}
                    />
                  </Grid>
                );
              })}
          </Grid>
  
          <Pagination
            count={Math.ceil(games.length / itemsPerPage)}
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
          {games.length === 0 && (
            <Typography
              variant="h6"
              color="white"
              sx={{ mt: 4, textAlign: "center" }}
            >
              Nothing to show..
            </Typography>
          )}
        </>
      )}
    </div>
  );
  
}
