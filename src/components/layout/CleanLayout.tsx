import { Outlet } from "react-router-dom";

// Layout completamente limpio sin navegación (para landing page)
const CleanLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CleanLayout;
