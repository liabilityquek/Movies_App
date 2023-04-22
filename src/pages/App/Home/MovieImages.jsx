import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import Item from "./Item";
import { useMediaQuery, useTheme } from "@mui/material";

export default function MovieImages({ images }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 425px)");
  const isLargerScreen = useMediaQuery("(min-width: 1024px)")

  const carouselContainer = isSmallScreen ? 1 : isLargerScreen ? 3 : 2;
  const carousel = [];
  for (let i = 0; i < images.length; i += carouselContainer) {
    carousel.push(images.slice(i, i + carouselContainer));
  }

  return (
    <>
    
    <Box marginTop={4} paddingLeft={8} paddingRight={8}>
        <Carousel>
          {carousel.map((carousel, i) => (
            <Item key={i} images={carousel} />
          ))}
        </Carousel>
        
      </Box>
    </>
  );
}
