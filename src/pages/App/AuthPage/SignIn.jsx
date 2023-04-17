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

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      background: {
        default: "black",
      },
    },
  });
  const [loginTry, setLoginTry] = useState({
    email: "",
    password: "",
    role: "Customer",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginTry
      );
      const data = response.data;
      if (!response.statusText === "OK") {
        throw new Error(data.error || "Network error");
      }
      
      
      localStorage.setItem("token", (response.data.token));
      console.log(`data: ${JSON.stringify(response.data.token, null, 2)}`);
      console.log(`name: ${data.customer.name}, id: ${data.customer._id.$oid}`);
      setUser(response.data.token );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setLoginTry({
      ...loginTry,
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
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  name="email"
                  value={loginTry.email}
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
                  value={loginTry.password}
                  onChange={handleChange}
                />
                <Box mt={2}>
                  <Select
                    value={loginTry.role}
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
