import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import DriversDropdown from '../../features/drivers/components/DriversDropdown';
import TeamsDropdown from '../../features/teams/components/TeamsDropdown';
import GitHubIcon from '@mui/icons-material/GitHub';

const pages = ['Races', 'Standings', 'Drivers', 'Teams'];

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
      <AppBar className="h-16 justify-center" position="fixed">
        <Box className="flex items-center h-full">
          <div className="hidden md:block w-32 ml-20">
            <Link to={'/'} className="text-inherit no-underline">
              <Typography
                variant="h5"
                noWrap
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
            </Link>
          </div>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
          <Box className="w-full mx-auto h-full flex items-center">
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: 'inherit',
                textDecoration: 'none',
                mx: "auto"
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
          <div className="hidden md:block mr-12">
            <a href="https://github.com/BatuhanUlucay/F1-react" className="text-inherit" target="_blank" rel="noreferrer">
              <GitHubIcon className="text-4xl" />
            </a>
          </div>
        </Box>
      </AppBar>
      {showDropdown && (
        <Box
          onMouseOver={() => handleMouseOver(dropdown)}
          onMouseLeave={handleMouseLeave}
          className="bg-black invisible lg:visible absolute left-0 top-16 w-full opacity-90 z-40"
        >
          {dropdown === 'Drivers' ? <DriversDropdown /> : <TeamsDropdown />}
        </Box>
      )}
    </>
  );
}

export default Navbar;
