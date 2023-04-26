import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { logout } from "../utilities/users-api";
import { useLocation } from "react-router-dom";


const theme = createTheme({
  palette: {
    background: {
      default: "black",
    },
  },
});

export default function Bar({ setUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  let currentRoute = "Account";
  if (location.pathname === "/games"){
    currentRoute = "Games";
  }else if(location.pathname === "/favourites"){
    currentRoute = "Favourites";
  }else if(location.pathname === "/history"){
    currentRoute = "Trending Search"
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "grey" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
            >
                {location.pathname !== '/favourites' && (
              <MenuItem
                component={RouterLink}
                to="/favourites"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Favourites
              </MenuItem>
                )}
                {location.pathname !== '/games' && (
              <MenuItem
                component={RouterLink}
                to="/games"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Games
              </MenuItem>
                )}

                
              <MenuItem
                component={RouterLink}
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Search Movies
              </MenuItem>
                

                {location.pathname !== '/history' && (
              <MenuItem
                component={RouterLink}
                to="/history"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Trending Search
              </MenuItem>
                )}
                {location.pathname !== '/account' && (
              <MenuItem
                component={RouterLink}
                to="/account"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Account
              </MenuItem>
                )}

              <MenuItem
                component={RouterLink}
                to="/login"
                onClick={handleLogout}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Logout
              </MenuItem>
            </Menu>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {currentRoute}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
