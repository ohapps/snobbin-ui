import GroupDrawer from './GroupDrawer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <GroupDrawer />
    </>
  );
};

export default Layout;
