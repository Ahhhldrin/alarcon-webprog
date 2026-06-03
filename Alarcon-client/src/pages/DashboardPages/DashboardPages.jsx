import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const stats = [
  {
    title: "Total Users",
    value: "2,842",
    change: "+12.4%",
    icon: PeopleRoundedIcon,
    iconSx: { fontSize: 20 },
    accent: "#0f766e",
  },
  {
    title: "Monthly Revenue",
    value: "$38,490",
    change: "+8.1%",
    icon: AttachMoneyRoundedIcon,
    iconSx: { fontSize: 20 },
    accent: "#0891b2",
  },
  {
    title: "Conversion Rate",
    value: "5.84%",
    change: "+1.6%",
    icon: TrendingUpRoundedIcon,
    iconSx: { fontSize: 20 },
    accent: "#16a34a",
  },
  {
    title: "Avg. Session",
    value: "6m 31s",
    change: "+0.9%",
    icon: TimerRoundedIcon,
    iconSx: { fontSize: 20 },
    accent: "#d97706",
  },
];

const activityFeed = [
  { name: "Ahldrin Alarcon", action: "created a new report", time: "2m ago" },
  { name: "Mark Chen", action: "updated user permissions", time: "13m ago" },
  { name: "Nina Santos", action: "exported monthly analytics", time: "48m ago" },
  { name: "Arjun Patel", action: "resolved 4 support tickets", time: "1h ago" },
];

const channelShare = [
  { id: 0, value: 42, label: "Organic" },
  { id: 1, value: 28, label: "Paid Ads" },
  { id: 2, value: 18, label: "Referrals" },
  { id: 3, value: 12, label: "Email" },
];

const DashboardPage = () => {
  return (
    <Container maxWidth="xl" disableGutters={false} sx={{ px: { xs: 0.5, sm: 1 } }}>
      <Stack spacing={3}>
        <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          color: "white",
          background:
            "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(14,116,144,1) 100%)",
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.85, letterSpacing: 1 }}>
          OVERVIEW
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
          Performance Summary
        </Typography>
        <Typography sx={{ mt: 1, opacity: 0.92, maxWidth: 700 }}>
          Track user growth, revenue, and engagement in one place. This summary highlights
          your most important business health indicators today.
        </Typography>
      </Paper>

      <Grid container spacing={2.5}>
        {stats.map((item) => {
          const StatIcon = item.icon;
          return (
          <Grid key={item.title} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                pr: 7.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: item.accent,
                  width: 34,
                  height: 34,
                  position: "absolute",
                  top: 20,
                  right: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StatIcon sx={item.iconSx} />
              </Avatar>

              <Stack spacing={1.5} alignItems="flex-start">
                <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
                <Chip
                  label={item.change}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
              </Stack>
            </Paper>
          </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Revenue vs Expenses
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Monthly financial trend for the current fiscal year.
            </Typography>
            <BarChart
              height={290}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  scaleType: "band",
                },
              ]}
              series={[
                { label: "Revenue", data: [6.1, 7.3, 7.8, 8.6, 9.1, 10.4], color: "#0e7490" },
                { label: "Expenses", data: [4.4, 5.2, 5.7, 5.9, 6.2, 6.8], color: "#f43f5e" },
              ]}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Traffic Sources
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Distribution of user acquisition channels.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart
                height={260}
                series={[
                  {
                    data: channelShare,
                    innerRadius: 55,
                    outerRadius: 90,
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Goal Completion
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Completion rates for major KPIs this month.
            </Typography>
            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
              <Box textAlign="center">
                <Gauge width={140} height={140} value={76} text={({ value }) => `${value}%`} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Sales Target
                </Typography>
              </Box>
              <Box textAlign="center">
                <Gauge width={140} height={140} value={61} text={({ value }) => `${value}%`} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Retention Goal
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Team Activity
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Recent actions from the operations and analytics teams.
            </Typography>
            <Stack spacing={2}>
              {activityFeed.map((item) => (
                <Box key={`${item.name}-${item.time}`}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.action}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {item.time}
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={100} sx={{ mt: 1.2 }} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Location Map
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Quick view of the primary location for this dashboard.
        </Typography>
        <Box sx={{ height: { xs: 320, md: 420 }, width: "100%" }}>
          <MapContainer
            center={[14.604253, 120.994314]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[14.604253, 120.994314]}>
              <Popup>
                National University-Manila <br />
                <span>551F Jhoscon St, Sampaloc, Manila, 1008 Metro Manila</span>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Paper>
      </Stack>
    </Container>
  );
};

export default DashboardPage;
