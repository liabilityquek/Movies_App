import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRefresh } from "../AuthPage/UseRefresh";

export default function CreateGame() {
  const token = localStorage.getItem("token");
  const { refreshToken } = useRefresh();
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id;
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      background: {
        default: "black",
      },
    },
  });

  const [state, setState] = useState({
    title: "",
    creator: "",
    description: "",
    image_url: "",
    site: "",
  });

  const disable =
    !state.title || !state.creator || !state.description || !state.site;

  const handleNavigate = () => {
    navigate("/admin");
  };

  const handleSubmit = async (event, authToken) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://movies-app-python.onrender.com/creategame/${userId}`,
        state,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = response.data;
      if (!response.statusText === "OK") {
        throw new Error(data.error || "Network error");
      }
      navigate("/admin");
    } catch (error) {
      console.log(error);
      const newToken = await refreshToken();
      await handleSubmit(event, newToken);
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box mt={5}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom></Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  type="title"
                  name="title"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.title}
                />
                <TextField
                  required
                  fullWidth
                  label="Creator"
                  type="creator"
                  name="creator"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.creator}
                />
                <TextField
                  required
                  fullWidth
                  label="Description"
                  type="description"
                  name="description"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.description}
                />
                <TextField
                  required
                  fullWidth
                  label="Site"
                  type="url"
                  name="site"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.site}
                />
                <TextField
                  fullWidth
                  label="Image URL"
                  type="url"
                  name="image_url"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.image_url}
                />
                <Box mt={2}>
                  <Button
                    type="submit"
                    disabled={disable}
                    variant="contained"
                    sx={{
                      backgroundColor: "darkred",
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "darkred",
                        opacity: 0.9,
                      },
                    }}
                    fullWidth
                  >
                    Create Game
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "darkred",
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "darkred",
                        opacity: 0.9,
                      },
                    }}
                    fullWidth
                    onClick={handleNavigate}
                  >
                    Back to Admin Page
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
