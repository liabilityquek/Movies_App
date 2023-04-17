import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

  
  const theme  = createTheme({
    palette: {
      background: {
        default: 'black',
      }
    }
  })

export default function FavouritesBar() {

   const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
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
      <MenuItem ><Link to="/history" style={{ textDecoration: 'none', color: 'inherit' }}>History</Link></MenuItem>
      <MenuItem><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
    >
        Favourites
    </Typography>
    </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}