import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Vehicles from "../pages/Vehicles";

import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="customers"
            element={<Customers />}
          />

          <Route
            path="vehicles"
            element={<Vehicles />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;