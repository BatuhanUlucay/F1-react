import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import DriversDropdown from '../../features/drivers-teams/components/DriversDropdown';
import TeamsDropdown from '../../features/drivers-teams/components/TeamsDropdown';

const pages = ['Schedule', 'Standings', 'Drivers', 'Teams'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdown, setDropdown] = useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMouseOver = (page) => {
    setDropdown(page);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <AppBar className="h-16 justify-center" position="static">
        <Box className="flex items-center h-full">
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: '5%',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            F1
          </Typography>
          <Box sx={{ ml: 8, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={page.toLowerCase()}
                    sx={{ color: 'inherit', textDecoration: 'none', textTransform: 'none' }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box className="w-1/2 mx-auto h-full">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              F1
            </Typography>
            <Box
              sx={{
                width: '20',

                flexGrow: 1,
                justifyContent: 'center',
                display: { xs: 'none', md: 'flex' },
              }}
              className="h-full"
            >
              {pages.map((page) => (
                <Button
                  variant="h5"
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ mx: 4, color: 'white', display: 'flex', alignItems: 'center' }}
                  onMouseOver={() => {
                    if (page === 'Drivers' || page === 'Teams') handleMouseOver(page);
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <Typography
                    component={Link}
                    to={page.toLowerCase()}
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      textTransform: 'none',
                      fontSize: '1rem',
                      display: 'flex',
                      my: 'auto',
                    }}
                  >
                    {page}
                    {(page === 'Drivers' || page === 'Teams') && (
                      <KeyboardArrowDownIcon className="my-auto" />
                    )}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </AppBar>
      {showDropdown && (
        <Box
          onMouseOver={() => handleMouseOver(dropdown)}
          onMouseLeave={handleMouseLeave}
          className="bg-black h-96"
        >
          {dropdown === 'Drivers' ? <DriversDropdown /> : <TeamsDropdown />}
        </Box>
      )}
    </>
  );
}

export default Navbar;
