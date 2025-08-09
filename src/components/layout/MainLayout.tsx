import { Outlet } from "react-router-dom";
import Navigation from './Navigation';
//import Footer from './Footer';

// Layout para páginas autenticadas (con Navigation responsiva)
const AppLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      {/*<Footer />*/}
    </>
  );
};

export default AppLayout;
