import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Paper, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditGame() {
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id;
  const navigate = useNavigate();
  const gameId = useParams().id;
  const theme = createTheme({
    palette: {
      background: {
        default: "black",
      },
    },
  });

  const [state, setState] = useState({
    updated_title: "",
    updated_creator: "",
    updated_desc: "",
    update_image: "",
    update_site: "",
  });

  const disable =
    !state.updated_title ||
    !state.updated_creator ||
    !state.updated_desc ||
    !state.update_site;

  const handleNavigate = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/showsinglegame/${userId}/${gameId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const game = response.data;
        setState({
          updated_title: game.title,
          updated_creator: game.creator,
          updated_desc: game.description,
          update_image: game.image_url,
          update_site: game.site,
        });
      } catch (error) {
        console.log(`Error fetching game details: ${error}`);
      }
    };
    fetchGameDetails();
  }, [gameId, userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/updategame/${userId}/${gameId}`,
        state,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Editing game: ", response.data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
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
                  type="updated_title"
                  name="updated_title"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.updated_title}
                />
                <TextField
                  required
                  fullWidth
                  label="Creator"
                  type="updated_creator"
                  name="updated_creator"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.updated_creator}
                />
                <TextField
                  required
                  fullWidth
                  label="Description"
                  type="updated_desc"
                  name="updated_desc"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.updated_desc}
                />
                <TextField
                  required
                  fullWidth
                  label="Site"
                  type="update_site"
                  name="update_site"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.update_site}
                />
                <TextField
                  fullWidth
                  label="Image URL"
                  type="update_image"
                  name="update_image"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.update_image}
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
                    Update Game Details
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
