import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const trigger = useScrollTrigger(); // Scroll olaylarına tepki vermek için kullanılır

  return (
    <AppBar position="sticky" elevation={trigger ? 4 : 0}>
      <Toolbar>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NewsApp
        </Typography>
        <div>
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            onClick={handleMenuClick}
          >
            {localStorage.getItem("firstName")}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
