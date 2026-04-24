import { Avatar, Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const users = [
  {
    id: 101,
    name: "Ahldrin Alarcon",
    email: "alarcon.aa@example.com",
    role: "Admin",
    team: "Operations",
    status: "Active",
    lastActive: "2 min ago",
  },
  {
    id: 102,
    name: "Mark Chen",
    email: "mark.chen@example.com",
    role: "Manager",
    team: "Analytics",
    status: "Active",
    lastActive: "15 min ago",
  },
  {
    id: 103,
    name: "Nina Santos",
    email: "nina.santos@example.com",
    role: "Editor",
    team: "Content",
    status: "Pending",
    lastActive: "1 hour ago",
  },
  {
    id: 104,
    name: "Arjun Patel",
    email: "arjun.patel@example.com",
    role: "Viewer",
    team: "Support",
    status: "Inactive",
    lastActive: "3 days ago",
  },
  {
    id: 105,
    name: "Lara Gomez",
    email: "lara.gomez@example.com",
    role: "Editor",
    team: "Marketing",
    status: "Active",
    lastActive: "5 min ago",
  },
  {
    id: 106,
    name: "Ethan Cruz",
    email: "ethan.cruz@example.com",
    role: "Viewer",
    team: "Sales",
    status: "Pending",
    lastActive: "47 min ago",
  },
];

const statusColorMap = {
  Active: "success",
  Pending: "warning",
  Inactive: "default",
};

const columns = [
  {
    field: "name",
    headerName: "User",
    minWidth: 240,
    flex: 1.2,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ height: "100%" }}>
        <Avatar sx={{ width: 32, height: 32 }}>{params.value.charAt(0)}</Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.email}
          </Typography>
        </Box>
      </Stack>
    ),
  },
  { field: "role", headerName: "Role", minWidth: 120, flex: 0.7 },
  { field: "team", headerName: "Team", minWidth: 140, flex: 0.8 },
  {
    field: "status",
    headerName: "Status",
    minWidth: 120,
    flex: 0.8,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={statusColorMap[params.value] ?? "default"}
        variant="outlined"
      />
    ),
  },
  { field: "lastActive", headerName: "Last Active", minWidth: 150, flex: 0.9 },
];

const UsersPage = () => {
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const pendingUsers = users.filter((user) => user.status === "Pending").length;

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Users
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Manage user accounts, monitor status, and review role distribution in one view.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 2 }}>
          <Chip label={`Total: ${users.length}`} color="primary" />
          <Chip label={`Active: ${activeUsers}`} color="success" variant="outlined" />
          <Chip label={`Pending: ${pendingUsers}`} color="warning" variant="outlined" />
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: 540, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            disableRowSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "rgba(20, 184, 166, 0.12)",
                fontWeight: 700,
              },
              "& .MuiDataGrid-cell": {
                borderColor: "rgba(148, 163, 184, 0.2)",
              },
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
};

export default UsersPage;
