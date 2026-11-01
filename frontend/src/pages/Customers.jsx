
import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
} from "../api/customerApi";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  // Load customers
  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers();

      console.log("Customer API response:", response);

      const customerList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setCustomers(customerList);
    } catch (err) {
      console.error("Load customers error:", err);
      console.error("Backend response:", err.response?.data);

      setError(
        err.response?.data?.message ||
        "Unable to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  // Create customer
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Customer name is required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError(
        "Phone number must be a valid 10 digit Indian mobile number"
      );
      return;
    }

    const customerData = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      address: form.address.trim() || null,
    };

    try {
      setSaving(true);

      console.log("Creating customer:", customerData);

      const response = await createCustomer(customerData);

      console.log("Created customer:", response);

      setSuccess(
        response?.message || "Customer created successfully"
      );

      resetForm();
      setShowForm(false);

      await loadCustomers();
    } catch (err) {
      console.error("Create customer error:", err);
      console.error("HTTP status:", err.response?.status);
      console.error("Backend response:", err.response?.data);

      const responseData = err.response?.data;

      const validationErrors =
        responseData?.data &&
        typeof responseData.data === "object"
          ? responseData.data
          : null;

      const firstValidationError = validationErrors
        ? Object.values(validationErrors)[0]
        : null;

      setError(
        firstValidationError ||
        responseData?.message ||
        responseData?.error ||
        err.message ||
        "Unable to create customer"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="page"><h2>Loading customers...</h2></div>;
  }

  return (
    <div className="customers-page">

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1>Customers</h1>
          <p>Manage your garage customers</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Cancel" : "+ Add Customer"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="success" role="status">
          {success}
        </div>
      )}

      {/* Add Customer Form */}
      {showForm && (
        <div className="dashboard-card">
          <h2>Add New Customer</h2>

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
              name="phone"
              placeholder="10 Digit Mobile Number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email (Optional)"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address (Optional)"
              value={form.address}
              onChange={handleChange}
              rows={3}
            />

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Customer"}
            </button>

          </form>
        </div>
      )}

      {/* Customer List */}
      <div className="dashboard-card">
        <h2>Customer List</h2>

        <p>Total Customers: {customers.length}</p>

        {customers.length === 0 ? (
          <p>No customers found. Add your first customer.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email || "-"}</td>
                    <td>{customer.address || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Customers;
