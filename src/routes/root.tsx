import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/') {
    navigate('/timer');
  }
  return (
      <Layout>
        <Outlet />
      </Layout>
  );
}