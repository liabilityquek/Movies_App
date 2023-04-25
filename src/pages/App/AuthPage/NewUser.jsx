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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://movies-app-python.onrender.com/create`,
        state
      );
      const data = response.data;
      if (!response.statusText === "OK") {
        throw new Error(data.error || "Network error");
      }
      navigate("/login");
    } catch (error) {
      setError(error.response.data.error)
      setIsLoading(false);
      console.log(`error: ${JSON.stringify(error.response.data.error)}`);
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

  const navigateToLogin = () => {
    navigate('/login')
  }
  
  const isFormDisabled = () => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return (
      state.password !== state.confirm ||
      state.name === "" ||
      !emailRegex.test(state.email)||
      state.password.length < 3 && state.confirm.length < 3 
    )
  }

  const AlertMessage = () => {
    if (!error) return null;
        return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error" onClose={() => {setError("")}}>
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      </Stack>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {error && <AlertMessage />}
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
                    disabled={isFormDisabled}
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
                <Box mt={2}>
                  <Button
                    
                    variant="contained"
                    onClick={navigateToLogin}
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
                    Back to Login
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
