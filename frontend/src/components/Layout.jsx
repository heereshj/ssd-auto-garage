
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">SSD</div>
          <div>
            <h2>SSD Garage</h2>
            <span>Management System</span>
          </div>
        </div>

        <p className="sidebar-section">MAIN MENU</p>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={getLinkClass}>
            <span className="nav-icon">▦</span>
            Dashboard
          </NavLink>

          <NavLink to="/customers" className={getLinkClass}>
            <span className="nav-icon">♙</span>
            Customers
          </NavLink>

          <NavLink to="/vehicles" className={getLinkClass}>
            <span className="nav-icon">🚗</span>
            Vehicles
          </NavLink>

          <NavLink to="/job-cards" className={getLinkClass}>
            <span className="nav-icon">🛠️</span>
            Job Cards
          </NavLink>
        </nav>

        <p className="sidebar-section">MANAGEMENT</p>

        <div className="sidebar-nav">
          <div className="sidebar-link disabled-link">
            <span className="nav-icon">🔧</span>
            Services
            <span className="coming-soon">Soon</span>
          </div>

          <div className="sidebar-link disabled-link">
            <span className="nav-icon">📅</span>
            Appointments
            <span className="coming-soon">Soon</span>
          </div>

          <div className="sidebar-link disabled-link">
            <span className="nav-icon">🧾</span>
            Invoices
            <span className="coming-soon">Soon</span>
          </div>

          <div className="sidebar-link disabled-link">
            <span className="nav-icon">📦</span>
            Inventory
            <span className="coming-soon">Soon</span>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="user-profile">
            <div className="user-avatar">
              {(user?.username || "U").charAt(0).toUpperCase()}
            </div>

            <div className="user-details">
              <strong>{user?.username || "User"}</strong>
              <span>Garage Admin</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            ↪ Logout
          </button>
        </div>
      </aside>

      <div className="main">
        <header className="navbar">
          <div>
            <strong>SSD Auto Parts & Garage</strong>
            <div className="breadcrumb">
              Business Overview / Dashboard
            </div>
          </div>

          <div className="navbar-right">
            <span className="online-status">
              <span className="status-dot" />
              System Online
            </span>

            <span className="navbar-user">
              {user?.username || "User"}
            </span>
          </div>
        </header>

        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
