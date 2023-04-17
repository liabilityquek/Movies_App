import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import Item from "./Item";

export default function MovieImages({ images }) {

  const carouselContainer = 2;
  const carousel = [];
  for (let i = 0; i < images.length; i += carouselContainer) {
    carousel.push(images.slice(i, i + carouselContainer));
  }

  return (
    <>
      <Box marginTop={4}>
        <Carousel>
          {carousel.map((carousel, i) => (
            <Item key={i} images={carousel} />
          ))}
        </Carousel>
        
      </Box>
    </>
  );
}
