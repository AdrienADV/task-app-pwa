import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/home')) {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [location.pathname]);

  const handleNavigation = (index) => {
    switch (index) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/profil');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleNavigation(newValue);
      }}
      sx={{
        height: '60px',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        boxShadow: '0px 1px 5px rgba(0,0,0,0.2)',
      }}
      disableRipple={true}
    >
      <BottomNavigationAction
        icon={<HomeIcon />}
        sx={{
          '&.Mui-selected': {
            color: '#5039d4',
          },
        }}
        disableRipple={true}
      />
      <BottomNavigationAction
        sx={{
          '&.Mui-selected': {
            color: '#5039d4',
          },
        }}
        disableRipple={true}
        icon={<Person2Icon />}
      />
    </BottomNavigation>
  );
};

export default Navigation;
