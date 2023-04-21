import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../../components/Loading";

export default function NewUser() {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      background: {
        default: "black",
      },
    },
  });

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
    confirm: "",
  });

  const disable = state.password !== state.confirm;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/create",
        state
      );
      const data = response.data;
      if (!response.statusText === "OK") {
        throw new Error(data.error || "Network error");
      }
      navigate("/login");
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

  if (isLoading) {
    return <Loading/>;
  }
  
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
                  label="Name"
                  type="name"
                  name="name"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.name}
                />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.email}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.password}
                />
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  name="confirm"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                />
                <Box mt={2}>
                  <Select
                    value={state.role}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    name="role"
                  >
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </Box>
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
                    Sign Up
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
