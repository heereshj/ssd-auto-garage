```jsx
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

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers();

      console.log("Customer API:", response);

      setCustomers(response.data || []);
    } catch (error) {
      console.error("Load customers error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Frontend validation
    if (!form.name.trim()) {
      setError("Customer name is required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError(
        "Phone number must be a valid 10 digit Indian mobile number"
      );
      return;
    }

    try {
      setSaving(true);

      const customerData = {
        name: form.name.trim(),
        phone: form.phone,
        email: form.email.trim() || null,
        address: form.address.trim() || null,
      };

      console.log("Creating customer:", customerData);

      const response = await createCustomer(customerData);

      console.log("Created customer:", response);

      setSuccess(
        response.message || "Customer created successfully"
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
      });

      setShowForm(false);

      await loadCustomers();
    } catch (error) {
      console.error("Create customer error:", error);

      const validationErrors = error.response?.data?.data;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0];
        setError(firstError || "Validation failed");
      } else {
        setError(
          error.response?.data?.message ||
            "Unable to create customer"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading customers...</h2>;
  }

  return (
    <div>

      {/* Header */}
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
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Cancel" : "+ Add Customer"}
        </button>
      </div>

      {/* Messages */}
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

      {/* Add Customer Form */}
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
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              maxLength="10"
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
              rows="3"
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

        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
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

                  <td>
                    {customer.email || "-"}
                  </td>

                  <td>
                    {customer.address || "-"}
                  </td>

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
```
