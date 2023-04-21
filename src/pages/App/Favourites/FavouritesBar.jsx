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
import { logout } from "../../../utilities/users-service";

const theme = createTheme({
  palette: {
    background: {
      default: "black",
    },
  },
});

export default function FavouritesBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

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
              <MenuItem
                component={RouterLink}
                to="/history"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Trending Search
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Search Movies
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/games"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Games
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/account"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Account
              </MenuItem>
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
              Favourites
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
