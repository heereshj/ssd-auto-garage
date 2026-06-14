import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

const cards = [
  {
    title: "Today's Revenue",
    value: "₹24,500"
  },
  {
    title: "Vehicles Serviced",
    value: "18"
  },
  {
    title: "Pending Jobs",
    value: "7"
  },
  {
    title: "Pickup Requests",
    value: "3"
  }
];

export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          height: 280,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          mb: 4
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc"
          alt="Garage"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            color: "white",
            p: 4
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            SSD Auto Parts & Garage
          </Typography>

          <Typography variant="h6" mt={2}>
            Genuine Parts • Oil Change • Pickup & Drop
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {cards.map((item) => (
          <Grid item xs={12} md={3} key={item.title}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4
              }}
            >
              <CardContent>
                <Typography color="text.secondary">
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}