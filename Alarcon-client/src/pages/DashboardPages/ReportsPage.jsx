import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

const conversionSeries = [2.8, 3.4, 3.9, 4.2, 4.9, 5.3, 5.1, 5.8];
const sessionsSeries = [6500, 7200, 7450, 8100, 8650, 9100, 9380, 9800];

const categoryData = [
  { id: 0, value: 34, label: "Enterprise" },
  { id: 1, value: 27, label: "SMB" },
  { id: 2, value: 21, label: "Starter" },
  { id: 3, value: 18, label: "Free Trial" },
];

const ReportsPage = () => {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(51,65,85,1) 100%)",
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Reports & Analytics
        </Typography>
        <Typography sx={{ mt: 1.2, opacity: 0.9, maxWidth: 740 }}>
          Visualize trends, monitor acquisition performance, and evaluate campaign impact
          across your key business metrics.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2.5 }} flexWrap="wrap" useFlexGap>
          <Chip label="Last 30 days" color="primary" />
          <Chip label="All channels" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
          <Chip label="Auto-refresh: On" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
        </Stack>
      </Paper>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Sessions and Conversion Trend
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Compare traffic growth and conversion changes through time.
            </Typography>
            <LineChart
              height={320}
              xAxis={[{ scaleType: "point", data: monthlyLabels }]}
              leftAxis={{ min: 0 }}
              series={[
                { data: sessionsSeries, label: "Sessions", color: "#0ea5e9" },
                { data: conversionSeries, label: "Conversion %", color: "#0f766e" },
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
              Customer Segment Share
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Active accounts grouped by subscription tier.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart
                height={280}
                series={[{ data: categoryData, innerRadius: 62, outerRadius: 100 }]}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{ p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Campaign Performance
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Campaign clicks and qualified leads generated per channel.
        </Typography>
        <BarChart
          height={320}
          xAxis={[
            {
              scaleType: "band",
              data: ["Search", "Social", "Email", "Referral", "Direct"],
            },
          ]}
          series={[
            { label: "Clicks", data: [8200, 7100, 4300, 3000, 5600], color: "#f59e0b" },
            { label: "Qualified Leads", data: [980, 810, 460, 380, 720], color: "#14b8a6" },
          ]}
        />
      </Paper>
    </Stack>
  );
};

export default ReportsPage;
