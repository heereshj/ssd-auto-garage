
import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import {
  getVehicles,
  createVehicle,
  deleteVehicle,
} from "../api/vehicleApi";

import { getCustomers } from "../api/customerApi";

const emptyForm = {
  vehicleNumber: "",
  model: "",
  lastServiceDate: "",
  nextServiceDate: "",
  customerId: "",
};

const getList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  // Load vehicles and customers
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [vehicleResponse, customerResponse] =
        await Promise.all([
          getVehicles(),
          getCustomers(),
        ]);

      console.log("Vehicle API:", vehicleResponse);
      console.log("Customer API:", customerResponse);

      setVehicles(getList(vehicleResponse));
      setCustomers(getList(customerResponse));

    } catch (err) {
      console.error("Unable to load vehicle data:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load vehicles. Please check backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // Form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open form
  const handleOpen = () => {
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setOpen(true);
  };

  // Close form
  const handleClose = () => {
    if (saving) return;

    setOpen(false);
    setForm(emptyForm);
  };

  // Save vehicle
  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!form.customerId) {
      setError("Please select a customer.");
      return;
    }

    if (!form.vehicleNumber.trim()) {
      setError("Vehicle number is required.");
      return;
    }

    if (!form.model.trim()) {
      setError("Vehicle model is required.");
      return;
    }

    if (
      form.lastServiceDate &&
      form.nextServiceDate &&
      form.nextServiceDate < form.lastServiceDate
    ) {
      setError(
        "Next service date cannot be earlier than last service date."
      );
      return;
    }

    const vehicleData = {
      vehicleNumber: form.vehicleNumber
        .trim()
        .toUpperCase(),
      model: form.model.trim(),
      lastServiceDate: form.lastServiceDate || null,
      nextServiceDate: form.nextServiceDate || null,
      customer: {
        id: Number(form.customerId),
      },
    };

    try {
      setSaving(true);

      console.log("Creating vehicle:", vehicleData);

      const response = await createVehicle(vehicleData);

      console.log("Created vehicle:", response);

      setOpen(false);
      setForm(emptyForm);
      setSuccess("Vehicle created successfully.");

      await loadData();

    } catch (err) {
      console.error("Vehicle creation failed:", err);
      console.error("HTTP status:", err.response?.status);
      console.error("Backend response:", err.response?.data);

      const responseData = err.response?.data;

      const validationErrors =
        responseData?.data &&
        typeof responseData.data === "object"
          ? responseData.data
          : null;

      setError(
        (validationErrors &&
          Object.values(validationErrors)[0]) ||
        responseData?.message ||
        responseData?.error ||
        err.message ||
        "Unable to save vehicle."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete vehicle
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      setDeletingId(id);

      await deleteVehicle(id);

      setSuccess("Vehicle deleted successfully.");

      await loadData();

    } catch (err) {
      console.error("Vehicle deletion failed:", err);

      setError(
        err.response?.data?.message ||
        "Unable to delete vehicle."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Search vehicles
  const filteredVehicles = vehicles.filter((vehicle) =>
    [
      vehicle.vehicleNumber,
      vehicle.model,
      vehicle.customerName,
      vehicle.customer?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getCustomerName = (vehicle) => {
    return (
      vehicle.customerName ||
      vehicle.customer?.name ||
      "N/A"
    );
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Vehicles
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage customer vehicles and service schedules
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          disabled={customers.length === 0 && !loading}
        >
          Add Vehicle
        </Button>
      </Box>

      {/* Messages */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess("")}
        >
          {success}
        </Alert>
      )}

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search vehicle number, model or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <SearchIcon sx={{ mr: 1 }} />
              ),
            },
          }}
        />
      </Paper>

      {/* Vehicle Table */}
      <Paper>
        <TableContainer>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell><b>Vehicle Number</b></TableCell>
                <TableCell><b>Model</b></TableCell>
                <TableCell><b>Customer</b></TableCell>
                <TableCell><b>Last Service</b></TableCell>
                <TableCell><b>Next Service</b></TableCell>
                <TableCell align="right"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading vehicles...
                  </TableCell>
                </TableRow>
              ) : filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No vehicles found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} hover>

                    <TableCell>
                      <Typography fontWeight={600}>
                        {vehicle.vehicleNumber}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {vehicle.model}
                    </TableCell>

                    <TableCell>
                      {getCustomerName(vehicle)}
                    </TableCell>

                    <TableCell>
                      {vehicle.lastServiceDate || "-"}
                    </TableCell>

                    <TableCell>
                      {vehicle.nextServiceDate || "-"}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        color="error"
                        disabled={deletingId === vehicle.id}
                        onClick={() => handleDelete(vehicle.id)}
                        aria-label="Delete vehicle"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>

      {/* Add Vehicle Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Vehicle</DialogTitle>

        <DialogContent>

          {customers.length === 0 ? (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Please create a customer before adding a vehicle.
            </Alert>
          ) : (
            <>

              <TextField
                select
                fullWidth
                margin="normal"
                label="Select Customer"
                name="customerId"
                value={form.customerId}
                onChange={handleChange}
                required
              >
                {customers.map((customer) => (
                  <MenuItem
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name} - {customer.phone}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                margin="normal"
                label="Vehicle Number"
                name="vehicleNumber"
                placeholder="MH12AB1234"
                value={form.vehicleNumber}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="Vehicle Model"
                name="model"
                placeholder="Tata Punch"
                value={form.model}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Last Service Date"
                name="lastServiceDate"
                value={form.lastServiceDate}
                onChange={handleChange}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Next Service Date"
                name="nextServiceDate"
                value={form.nextServiceDate}
                onChange={handleChange}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />

            </>
          )}

        </DialogContent>

        <DialogActions sx={{ p: 2 }}>

          <Button
            onClick={handleClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || customers.length === 0}
          >
            {saving ? "Saving..." : "Save Vehicle"}
          </Button>

        </DialogActions>
      </Dialog>

    </Box>
  );
}
