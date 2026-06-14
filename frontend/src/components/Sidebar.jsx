import {
  Dashboard,
  People,
  DirectionsCar,
  Build
} from "@mui/icons-material";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";

import { Link } from "react-router-dom";

const drawerWidth = 250;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#111827",
          color: "#FFFFFF",
          borderRight: "none"
        }
      }}
    >
    <Toolbar>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#FBBF24"
        }}
      >
        SSD GARAGE
      </Typography>
    </Toolbar>

      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <Dashboard sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/customers">
          <ListItemIcon>
            <People sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>

        <ListItemButton component={Link} to="/vehicles">
          <ListItemIcon>
            <DirectionsCar sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Vehicles" />
        </ListItemButton>

        <ListItemButton component={Link} to="/services">
          <ListItemIcon>
            <Build sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}