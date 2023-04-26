import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
  Link,
  Select,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

export default function SignIn({ setUser, role }) {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      background: {
        default: "black",
      },
    },
  });
  const [state, setState] = useState({
    email: "",
    password: "",
    role: "Customer",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://movies-app-python.onrender.com/login",
        state
      );
      const data = response.data;

      if (!response.statusText === "OK") {
        throw new Error(data.error || "Network error");
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      const decodedUser = JSON.parse(
        window.atob(response.data.token.split(".")[1])
      );
      console.log(`data: ${JSON.stringify(decodedUser, null, 2)}`);
      console.log(
        `name: ${data.customer.name}, id: ${data.customer._id.$oid}, role: ${data.customer.role}`
      );
      setUser(decodedUser.sub);

      decodedUser.sub.role === "Customer" ? navigate("/") : navigate("/admin");
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
    return <Loading />;
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
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  name="password"
                  value={state.password}
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
                    Login
                  </Button>
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Link href="/signup" variant="body2">
                    New User
                  </Link>
                  <Link href="/forget" variant="body2">
                    Forgot Password?
                  </Link>
                </Box>
              </form>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
