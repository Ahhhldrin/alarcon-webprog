import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import html2canvas from "html2canvas";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  { field: "age", headerName: "Age", type: "number", width: 110, editable: true },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 180,
    valueGetter: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const ReportsPage = () => {
  const printRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = async () => {
    const printContent = printRef.current;
    if (!printContent || isExporting) return;

    try {
      setIsExporting(true);
      await new Promise((resolve) => setTimeout(resolve, 350));

      const canvas = await html2canvas(printContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: printContent.scrollWidth,
      });

      const pageRatio = 1.4142; // A4 portrait ratio (h/w)
      const pageHeightPx = Math.floor(canvas.width * pageRatio);
      const images = [];

      for (let y = 0; y < canvas.height; y += pageHeightPx) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - y);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(canvas, 0, y, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
        images.push(pageCanvas.toDataURL("image/png"));
      }

      const printWindow = window.open("", "_blank", "width=1280,height=900");
      if (!printWindow) return;

      const exportedAt = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date());

      const pagesHtml = images
        .map(
          (img, idx) => `
            <section class="page ${idx < images.length - 1 ? "with-break" : ""}">
              <img src="${img}" alt="Report page ${idx + 1}" />
            </section>
          `
        )
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reports Summary</title>
            <style>
              @page { size: A4 portrait; margin: 0; }
              html, body {
                margin: 0;
                padding: 0;
                background: #ffffff;
                font-family: "Inter", "Segoe UI", Arial, Helvetica, sans-serif;
              }
              .meta {
                padding: 10mm 10mm 0;
                font-size: 11px;
                color: #475569;
              }
              .meta strong {
                color: #0f172a;
              }
              .page {
                width: 210mm;
                min-height: 297mm;
                padding: 10mm;
                box-sizing: border-box;
              }
              .with-break {
                page-break-after: always;
              }
              .page img {
                width: 100%;
                height: auto;
                display: block;
              }
            </style>
          </head>
          <body>
            <div class="meta"><strong>Exported:</strong> ${exportedAt}</div>
            ${pagesHtml}
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 400);
      };
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1 } }}>
      <Stack spacing={3}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 3,
            background: "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(14,116,144,1) 100%)",
            color: "white",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-start" }}
            spacing={2}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Reports & Analytics
              </Typography>
              <Typography sx={{ mt: 1.2, opacity: 0.9, maxWidth: 760 }}>
                Export analytics overview with generated reports, category breakdown, and current
                completion performance.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
                <Chip label="Last 30 days" color="primary" />
                <Chip label="Monthly metrics" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
              </Stack>
            </Box>

            <Button
              variant="contained"
              onClick={handleExportPdf}
              disabled={isExporting}
              size="large"
              sx={{
                minWidth: { xs: "100%", sm: 180 },
                alignSelf: { xs: "stretch", md: "flex-start" },
                mt: { md: 0 },
                px: 3,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {isExporting ? "Exporting PDF..." : "Print / Save PDF"}
            </Button>
          </Stack>
        </Paper>

        <Box ref={printRef}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Report Output
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    This chart compares how many reports were generated and how many were completed
                    across the last few months.
                  </Typography>
                  <BarChart
                    series={[
                      { data: [30, 24, 28, 27], label: "Generated", color: "#0ea5e9" },
                      { data: [28, 19, 17, 23], label: "Completed", color: "#14b8a6" },
                    ]}
                    xAxis={[{ data: ["January", "February", "March", "April"], scaleType: "band" }]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Report by Share
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    This chart shows the distribution of report requests by category for the current
                    reporting period.
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 34, label: "Sales" },
                            { id: 1, value: 16, label: "Users" },
                            { id: 2, value: 13, label: "Inventory" },
                            { id: 3, value: 6, label: "Finance" },
                          ],
                        },
                      ]}
                      width={320}
                      height={220}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Completion Rate
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    The gauge highlights the current percentage of reports completed on time based on
                    the latest reporting cycle.
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Gauge
                      value={78}
                      startAngle={-120}
                      endAngle={120}
                      innerRadius="70%"
                      text={({ value }) => `${value}%`}
                      width={340}
                      height={180}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                <CardContent>
                  <Box sx={{ height: 420 }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 5, page: 0 },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default ReportsPage;
