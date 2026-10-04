import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          SSD Auto Parts & Garage
        </div>

        <div className="nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/customers">
            Customers
          </Link>

          <Link to="/vehicles">
            Vehicles
          </Link>

          <span>
            {user?.username}
          </span>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </nav>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;