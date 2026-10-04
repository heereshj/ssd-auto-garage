import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
} from "../api/customerApi";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const response = await getCustomers();

      console.log("Customer API:", response);

      setCustomers(response.data || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await createCustomer(form);

      console.log("Created customer:", response);

      setSuccess("Customer created successfully");

      setForm({
        name: "",
        mobile: "",
        email: "",
      });

      setShowForm(false);

      await loadCustomers();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to create customer"
      );
    }
  };

  if (loading) {
    return <h2>Loading customers...</h2>;
  }

  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Customers</h1>

        <button
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Customer"}
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {success && (
        <div className="success">
          {success}
        </div>
      )}

      {showForm && (
        <div className="dashboard-card">

          <h2>Add Customer</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <button type="submit">
              Save Customer
            </button>

          </form>
        </div>
      )}

      <div className="dashboard-card">

        <h2>Customer List</h2>

        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>

                  <td>{customer.id}</td>

                  <td>{customer.name}</td>

                  <td>{customer.mobile}</td>

                  <td>{customer.email || "-"}</td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default Customers;