import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "white",
        color: "#111827",
        borderBottom: "1px solid #E5E7EB"
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, fontWeight: 700 }}
        >
          SSD Auto Parts & Garage
        </Typography>

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <Box ml={2}>
          <Avatar>H</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}