
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { useAuth } from "../context/AuthContext";
import { getCustomers } from "../api/customerApi";
import { getVehicles } from "../api/vehicleApi";

const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#cbd5e1"];

const getList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  return [];
};

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (date) => {
  if (!date) return "Not scheduled";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Dashboard = () => {
  const { user } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.allSettled([
          getCustomers(),
          getVehicles(),
        ]);

        if (results[0].status === "fulfilled") {
          setCustomers(getList(results[0].value));
        } else {
          console.error("Customer API error:", results[0].reason);
        }

        if (results[1].status === "fulfilled") {
          setVehicles(getList(results[1].value));
        } else {
          console.error("Vehicle API error:", results[1].reason);
        }

        if (results.every((result) => result.status === "rejected")) {
          setError("Unable to load dashboard data. Please check the backend.");
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const today = getToday();

  const nextSevenDays = new Date();
  nextSevenDays.setDate(nextSevenDays.getDate() + 7);

  const nextSevenDaysString = [
    nextSevenDays.getFullYear(),
    String(nextSevenDays.getMonth() + 1).padStart(2, "0"),
    String(nextSevenDays.getDate()).padStart(2, "0"),
  ].join("-");

  const overdueVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.nextServiceDate &&
      vehicle.nextServiceDate < today
  );

  const dueSoonVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.nextServiceDate &&
      vehicle.nextServiceDate >= today &&
      vehicle.nextServiceDate <= nextSevenDaysString
  );

  const scheduledVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.nextServiceDate &&
      vehicle.nextServiceDate > nextSevenDaysString
  );

  const unscheduledVehicles = vehicles.filter(
    (vehicle) => !vehicle.nextServiceDate
  );

  const serviceChartData = [
    { name: "Overdue", value: overdueVehicles.length },
    { name: "Due soon", value: dueSoonVehicles.length },
    { name: "Scheduled", value: scheduledVehicles.length },
    { name: "Not scheduled", value: unscheduledVehicles.length },
  ].filter((item) => item.value > 0);

  const reminders = vehicles
    .filter((vehicle) => vehicle.nextServiceDate)
    .sort((a, b) =>
      a.nextServiceDate.localeCompare(b.nextServiceDate)
    )
    .slice(0, 5);

  const firstName = user?.username || "User";

  return (
    <div className="dashboard-page">

      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="welcome-text">
            Welcome back, {firstName}. Here's your garage overview.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Today</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>
      </div>

      {error && <div className="dashboard-error">{error}</div>}

      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon blue">♙</span>
            <span className="stat-label">CUSTOMERS</span>
          </div>
          <h2>{loading ? "..." : customers.length}</h2>
          <p>Total registered customers</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon purple">🚗</span>
            <span className="stat-label">VEHICLES</span>
          </div>
          <h2>{loading ? "..." : vehicles.length}</h2>
          <p>Total registered vehicles</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon red">!</span>
            <span className="stat-label">OVERDUE SERVICES</span>
          </div>
          <h2>{loading ? "..." : overdueVehicles.length}</h2>
          <p>Vehicles past service date</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon orange">◷</span>
            <span className="stat-label">DUE THIS WEEK</span>
          </div>
          <h2>{loading ? "..." : dueSoonVehicles.length}</h2>
          <p>Services due in next 7 days</p>
        </div>

      </div>

      <div className="dashboard-charts">

        <section className="panel revenue-panel">
          <div className="panel-heading">
            <div>
              <h3>Revenue Overview</h3>
              <p>Garage earnings and business performance</p>
            </div>
            <span className="panel-tag">Invoice integration pending</span>
          </div>

          <div className="empty-chart">
            <div className="empty-chart-icon">₹</div>
            <h4>Revenue analytics coming soon</h4>
            <p>
              Revenue charts will appear when the invoice and payment
              APIs are connected.
            </p>
          </div>
        </section>

        <section className="panel service-panel">
          <div className="panel-heading">
            <div>
              <h3>Vehicle Service Status</h3>
              <p>Based on registered vehicle service dates</p>
            </div>
          </div>

          {loading ? (
            <div className="chart-message">Loading service data...</div>
          ) : serviceChartData.length > 0 ? (
            <>
              <div className="donut-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceChartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="58%"
                      outerRadius="82%"
                      paddingAngle={3}
                    >
                      {serviceChartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-legend">
                {serviceChartData.map((item, index) => (
                  <div className="legend-item" key={item.name}>
                    <span
                      className="legend-dot"
                      style={{ background: COLORS[index] }}
                    />
                    <span>{item.name}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="chart-message">
              No vehicle service data available yet.
            </div>
          )}
        </section>

      </div>

      <section className="panel reminders-panel">
        <div className="panel-heading">
          <div>
            <h3>Upcoming Service Reminders</h3>
            <p>Vehicle service schedule from your records</p>
          </div>
          <span className="reminder-count">
            {loading ? "..." : `${reminders.length} records`}
          </span>
        </div>

        {loading ? (
          <div className="chart-message">Loading reminders...</div>
        ) : reminders.length > 0 ? (
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Model</th>
                  <th>Customer</th>
                  <th>Next Service</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {reminders.map((vehicle) => {
                  const overdue = vehicle.nextServiceDate < today;

                  return (
                    <tr key={vehicle.id}>
                      <td>
                        <strong>{vehicle.vehicleNumber}</strong>
                      </td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.customerName || "—"}</td>
                      <td>{formatDate(vehicle.nextServiceDate)}</td>
                      <td>
                        <span
                          className={
                            overdue
                              ? "service-status overdue"
                              : vehicle.nextServiceDate <= nextSevenDaysString
                              ? "service-status due"
                              : "service-status scheduled"
                          }
                        >
                          {overdue
                            ? "Overdue"
                            : vehicle.nextServiceDate <= nextSevenDaysString
                            ? "Due soon"
                            : "Scheduled"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="chart-message">
            No upcoming service reminders found.
          </div>
        )}
      </section>

    </div>
  );
};

export default Dashboard;
