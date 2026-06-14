import {
  Paper,
  Typography,
  Button,
  TextField
} from "@mui/material";

export default function Customers() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">
        Customers
      </Typography>

      <TextField
        fullWidth
        label="Search Customer"
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
      >
        Add Customer
      </Button>
    </Paper>
  );
}