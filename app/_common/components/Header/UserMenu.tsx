import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/Person';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { USER_INFO } from '../../graphql/queries';
import { UserInfo } from '../../types/snob';
import { AppRoutes } from '@/app/_common/config/appRoutes';
import { getSnobInitials } from '@/app/_common/utils/snobUtils';
import * as S from './UserMenu.styles';

const UserMenu = () => {
  const { logout } = useAuth0();
  const { data } = useQuery<UserInfo>(USER_INFO);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32, fontSize: '12px' }}>
          {getSnobInitials(data?.userInfo)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
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

export default UserMenu;
