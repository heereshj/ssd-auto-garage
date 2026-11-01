import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  getJobCards,
  createJobCard,
  updateJobCardStatus,
  deleteJobCard,
} from "../api/jobCardApi";

import { getCustomers } from "../api/customerApi";
import { getVehicles } from "../api/vehicleApi";

const JobCards = () => {
  const [jobCards, setJobCards] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [form, setForm] = useState({
    customerId: "",
    vehicleId: "",
    serviceDate: "",
    expectedDeliveryDate: "",
    odometerReading: "",
    complaint: "",
    mechanicNotes: "",
    serviceType: "GENERAL_SERVICE",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [jobCardResponse, customerResponse, vehicleResponse] =
        await Promise.all([
          getJobCards(),
          getCustomers(),
          getVehicles(),
        ]);

      const jobCardList = Array.isArray(jobCardResponse)
        ? jobCardResponse
        : Array.isArray(jobCardResponse?.data)
          ? jobCardResponse.data
          : [];

      const customerList = Array.isArray(customerResponse)
        ? customerResponse
        : Array.isArray(customerResponse?.data)
          ? customerResponse.data
          : [];

      const vehicleList = Array.isArray(vehicleResponse)
        ? vehicleResponse
        : Array.isArray(vehicleResponse?.data)
          ? vehicleResponse.data
          : [];

      setJobCards(jobCardList);
      setCustomers(customerList);
      setVehicles(vehicleList);
    } catch (err) {
      console.error("Job card loading error:", err);
      setError(
        err?.response?.data?.message ||
          "Unable to load job cards."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      customerId: "",
      vehicleId: "",
      serviceDate: "",
      expectedDeliveryDate: "",
      odometerReading: "",
      complaint: "",
      mechanicNotes: "",
      serviceType: "GENERAL_SERVICE",
    });
  };

  const handleOpenDialog = () => {
    setError("");
    setSuccess("");
    resetForm();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (!saving) {
      setOpenDialog(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.customerId) {
      setError("Please select a customer.");
      return;
    }

    if (!form.vehicleId) {
      setError("Please select a vehicle.");
      return;
    }

    if (!form.serviceType) {
      setError("Please select a service type.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        customer: {
          id: Number(form.customerId),
        },
        vehicle: {
          id: Number(form.vehicleId),
        },
        serviceDate: form.serviceDate || null,
        expectedDeliveryDate:
          form.expectedDeliveryDate || null,
        odometerReading: form.odometerReading
          ? Number(form.odometerReading)
          : null,
        complaint: form.complaint.trim() || null,
        mechanicNotes: form.mechanicNotes.trim() || null,
        serviceType: form.serviceType,
      };

      await createJobCard(payload);

      setSuccess("Job card created successfully.");

      setOpenDialog(false);

      resetForm();

      await loadData();
    } catch (err) {
      console.error("Create job card error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to create job card."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setError("");
      setSuccess("");

      await updateJobCardStatus(id, status);

      setSuccess("Job card status updated successfully.");

      await loadData();
    } catch (err) {
      console.error("Update status error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to update job card status."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job card?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteJobCard(id);

      setSuccess("Job card deleted successfully.");

      await loadData();
    } catch (err) {
      console.error("Delete job card error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to delete job card."
      );
    }
  };

  const getCustomerName = (jobCard) => {
    return jobCard?.customer?.name || "Unknown Customer";
  };

  const getVehicleNumber = (jobCard) => {
    return (
      jobCard?.vehicle?.vehicleNumber ||
      "Unknown Vehicle"
    );
  };

  const getStatusLabel = (status) => {
    if (!status) {
      return "OPEN";
    }

    return status.replaceAll("_", " ");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="600">
            Job Cards
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage vehicle service jobs and repair work
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleOpenDialog}
          disabled={customers.length === 0 || vehicles.length === 0}
        >
          + New Job Card
        </Button>
      </Box>

      {customers.length === 0 || vehicles.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          Please create at least one customer and one vehicle
          before creating a job card.
        </Alert>
      ) : null}

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

      {loading ? (
        <Typography>Loading job cards...</Typography>
      ) : jobCards.length === 0 ? (
        <Box
          sx={{
            p: 5,
            textAlign: "center",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">
            No Job Cards Found
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Create your first job card to get started.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {jobCards.map((jobCard) => (
            <Box
              key={jobCard.id}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2.5,
                backgroundColor: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                  >
                    {jobCard.jobCardNumber}
                  </Typography>

                  <Typography sx={{ mt: 0.5 }}>
                    Customer: {getCustomerName(jobCard)}
                  </Typography>

                  <Typography color="text.secondary">
                    Vehicle: {getVehicleNumber(jobCard)}
                  </Typography>

                  <Typography color="text.secondary">
                    Service:{" "}
                    {jobCard.serviceType?.replaceAll(
                      "_",
                      " "
                    )}
                  </Typography>

                  {jobCard.complaint && (
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Complaint: {jobCard.complaint}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ minWidth: 170 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>

                    <Select
                      value={jobCard.status || "OPEN"}
                      label="Status"
                      onChange={(event) =>
                        handleStatusChange(
                          jobCard.id,
                          event.target.value
                        )
                      }
                    >
                      <MenuItem value="OPEN">
                        OPEN
                      </MenuItem>

                      <MenuItem value="IN_PROGRESS">
                        IN PROGRESS
                      </MenuItem>

                      <MenuItem value="COMPLETED">
                        COMPLETED
                      </MenuItem>

                      <MenuItem value="DELIVERED">
                        DELIVERED
                      </MenuItem>

                      <MenuItem value="CANCELLED">
                        CANCELLED
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px solid #eeeeee",
                }}
              >
                <Typography variant="body2">
                  Status:{" "}
                  <strong>
                    {getStatusLabel(jobCard.status)}
                  </strong>
                </Typography>

                <Button
                  color="error"
                  size="small"
                  onClick={() =>
                    handleDelete(jobCard.id)
                  }
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Create New Job Card
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <FormControl
              fullWidth
              margin="normal"
              required
            >
              <InputLabel>Customer</InputLabel>

              <Select
                name="customerId"
                value={form.customerId}
                label="Customer"
                onChange={handleChange}
              >
                {customers.map((customer) => (
                  <MenuItem
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name} - {customer.phone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              required
            >
              <InputLabel>Vehicle</InputLabel>

              <Select
                name="vehicleId"
                value={form.vehicleId}
                label="Vehicle"
                onChange={handleChange}
              >
                {vehicles.map((vehicle) => (
                  <MenuItem
                    key={vehicle.id}
                    value={vehicle.id}
                  >
                    {vehicle.vehicleNumber} -{" "}
                    {vehicle.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              required
            >
              <InputLabel>Service Type</InputLabel>

              <Select
                name="serviceType"
                value={form.serviceType}
                label="Service Type"
                onChange={handleChange}
              >
                <MenuItem value="GENERAL_SERVICE">
                  General Service
                </MenuItem>

                <MenuItem value="OIL_CHANGE">
                  Oil Change
                </MenuItem>

                <MenuItem value="REPAIR">
                  Repair
                </MenuItem>

                <MenuItem value="WASHING">
                  Washing
                </MenuItem>

                <MenuItem value="INSPECTION">
                  Inspection
                </MenuItem>

                <MenuItem value="OTHER">
                  Other
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Service Date"
              type="date"
              name="serviceDate"
              value={form.serviceDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Expected Delivery Date"
              type="date"
              name="expectedDeliveryDate"
              value={form.expectedDeliveryDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Odometer Reading"
              type="number"
              name="odometerReading"
              value={form.odometerReading}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Complaint / Problem"
              name="complaint"
              value={form.complaint}
              onChange={handleChange}
              multiline
              rows={3}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Mechanic Notes"
              name="mechanicNotes"
              value={form.mechanicNotes}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleCloseDialog}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={saving}
            >
              {saving ? "Creating..." : "Create Job Card"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default JobCards;