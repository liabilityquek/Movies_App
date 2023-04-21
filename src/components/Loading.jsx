import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }
  
  
  
  
  
  
  