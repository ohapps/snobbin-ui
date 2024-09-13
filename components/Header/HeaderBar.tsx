'use client';

import { AppBar } from '@mui/material';
import Logo from './Logo';
import MainNavigation from './MainNavigation';
import UserMenu from './UserMenu';
import * as S from './HeaderBar.styles';
import NavigationMenu from './NavigationMenu';

const HeaderBar = () => {
  return (
    <AppBar position="static">
      <S.Toolbar>
        <S.HeaderItemsWrapper>
          <NavigationMenu />
          <Logo />
          <MainNavigation />
        </S.HeaderItemsWrapper>
        <S.HeaderItemsWrapper>
          <UserMenu />
        </S.HeaderItemsWrapper>
      </S.Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
