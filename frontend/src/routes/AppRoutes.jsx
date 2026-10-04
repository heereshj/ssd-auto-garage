import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Vehicles from "../pages/Vehicles";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Dashboard />} />

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