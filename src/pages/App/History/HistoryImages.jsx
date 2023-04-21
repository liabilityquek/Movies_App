import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";
import HistoryItem from "./HistoryItem";

export default function HistoryImages({ movieData }) {

  const carouselContainer = 2;
  const carousel = [];
  for (let i = 0; i < movieData.length; i += carouselContainer) {
    carousel.push(movieData.slice(i, i + carouselContainer));
  }

  return (
    <>
      <Box marginTop={4}>
        <Carousel>
          {carousel.map((carousel, i) => (
            <HistoryItem key={i} movieData={carousel} />
          ))}
        </Carousel>
        
      </Box>
    </>
  );
}
