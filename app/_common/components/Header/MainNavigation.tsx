import { AppRoutes } from '@/app/_common/config/appRoutes';
import * as S from './MainNavigation.styles';

const MainNavigation = () => {
  return (
    <S.Container>
      <S.NavLink href={AppRoutes.ACTIVITY}>Activity</S.NavLink>
      <S.NavLink href={AppRoutes.GROUPS}>Groups</S.NavLink>
    </S.Container>
  );
};

export default MainNavigation;
