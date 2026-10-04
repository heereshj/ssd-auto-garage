import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Welcome {user?.username || "User"}
      </p>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Customers</h3>
          <p>Manage customers</p>
        </div>

        <div className="dashboard-card">
          <h3>Vehicles</h3>
          <p>Manage vehicles</p>
        </div>

        <div className="dashboard-card">
          <h3>Appointments</h3>
          <p>Today's appointments</p>
        </div>

        <div className="dashboard-card">
          <h3>Services</h3>
          <p>Garage services</p>
        </div>

        <div className="dashboard-card">
          <h3>Invoices</h3>
          <p>Billing & invoices</p>
        </div>

        <div className="dashboard-card">
          <h3>Inventory</h3>
          <p>Parts inventory</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;