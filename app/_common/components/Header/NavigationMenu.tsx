import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppRoutes } from '@/app/_common/config/appRoutes';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/People';
import ActivityIcon from '@mui/icons-material/Assessment';
import * as S from './NavigationMenu.styles';

const NavigationMenu = () => {
  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.Container>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <ActivityIcon fontSize="small" />
          </ListItemIcon>
          <S.NavLink href={AppRoutes.ACTIVITY}>Activity</S.NavLink>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <GroupsIcon fontSize="small" />
          </ListItemIcon>
          <S.NavLink href={AppRoutes.GROUPS}>Groups</S.NavLink>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ProfileIcon fontSize="small" />
          </ListItemIcon>
          <S.NavLink href={AppRoutes.PROFILE}>Profile</S.NavLink>
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </S.Container>
  );
};

export default NavigationMenu;
