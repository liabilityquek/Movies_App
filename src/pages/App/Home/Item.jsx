import React from "react";
import { Paper, Box } from "@mui/material";
import FavouriteIcon from "./FavouriteIcon";

export default function Item({ images, token }) {
  
    return (
      <Paper sx={{ backgroundColor: "black" }}>
        <Box display="flex" justifyContent="space-around">
          {images.map((image, i) => (
            <Box key={i}>
              <img
                src={`https://image.tmdb.org/t/p/w500${image.poster_path}`}
                alt={image.title}
                style={{ width: "200px", height: "auto" }}
              />
              <p style={{ color: "white" }}>{image.title}</p>
              <p style={{ color: "white" }}>
                Release Year: {image.release_date.slice(0, 4)}
              </p>
              <p style={{ color: "white" }}>
                Synopsis:{" "}
                {image.overview.length > 60
                  ? image.overview.substring(0, 70) + "..."
                  : image.overview}
              </p>
              <p style={{ color: "white" }}>Rating: {image.vote_average}</p>
              <FavouriteIcon image={image} token={token}/>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  }