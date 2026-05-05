import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../components/data/users.json?raw";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "-");

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? "").trim(),
        lastName: String(user.lastName ?? "").trim(),
        age: String(user.age ?? "").trim(),
        gender: genders.includes(String(user.gender ?? "").trim().toLowerCase())
          ? String(user.gender ?? "").trim().toLowerCase()
          : "",
        contactNumber: String(user.contactNumber ?? "").trim(),
        email: String(user.email ?? "").trim().toLowerCase(),
        role: roles.includes(String(user.role ?? "").trim().toLowerCase())
          ? String(user.role ?? "").trim().toLowerCase()
          : "editor",
        username: String(user.username ?? "").trim().toLowerCase(),
        password: String(user.password ?? ""),
        address: String(user.address ?? "").trim(),
        isActive: typeof user.isActive === "boolean" ? user.isActive : true,
      })),
      error: "",
    };
  } catch {
    return {
      users: [],
      error: "Unable to read users from src/components/data/users.json.",
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState(seed.users);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [seedError] = useState(seed.error);
  const [error, setError] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  const filteredUsers = useMemo(() => {
    const value = query.trim().toLowerCase();
    return users.filter((user) => {
      const searchMatch = !value
        ? true
        : [user.firstName, user.lastName, user.email, user.username]
            .join(" ")
            .toLowerCase()
            .includes(value);

      const roleMatch = roleFilter === "all" ? true : user.role === roleFilter;
      const genderMatch = genderFilter === "all" ? true : user.gender === genderFilter;
      const statusMatch =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? user.isActive
          : !user.isActive;

      return searchMatch && roleMatch && genderMatch && statusMatch;
    });
  }, [users, query, roleFilter, genderFilter, statusFilter]);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const inactiveUsers = totalUsers - activeUsers;

  const handleFieldChange = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleOpenAddDialog = () => {
    setEditRowId(null);
    setForm(blankForm);
    setError("");
    setShowPassword(false);
    setOpen(true);
  };

  const handleOpenEditDialog = (row) => {
    setEditRowId(row.id);
    setForm({
      firstName: row.firstName ?? "",
      lastName: row.lastName ?? "",
      age: String(row.age ?? ""),
      gender: row.gender ?? "",
      contactNumber: row.contactNumber ?? "",
      email: row.email ?? "",
      role: row.role ?? "editor",
      username: row.username ?? "",
      password: row.password ?? "",
      address: row.address ?? "",
      isActive: Boolean(row.isActive),
    });
    setError("");
    setShowPassword(false);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditRowId(null);
    setForm(blankForm);
    setError("");
    setShowPassword(false);
  };

  const handleSubmit = () => {
    const required = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "contactNumber",
      "email",
      "role",
      "username",
      "password",
      "address",
    ];
    const missing = required.some((field) => !String(form[field]).trim());
    if (missing) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^\d+$/.test(String(form.age).trim())) {
      setError("Age must be a number only.");
      return;
    }

    const ageNum = Number(form.age);
    if (ageNum < 18 || ageNum > 120) {
      setError("Age must be from 18 to 120.");
      return;
    }

    if (!/^\d{11}$/.test(form.contactNumber.trim())) {
      setError("Contact number must be exactly 11 digits.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please provide a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (/\s/.test(form.username.trim())) {
      setError("Username must not contain spaces.");
      return;
    }

    if (
      users.some(
        (u) => u.id !== editRowId && u.email.toLowerCase() === form.email.trim().toLowerCase()
      )
    ) {
      setError("A user with this email already exists.");
      return;
    }

    if (
      users.some(
        (u) =>
          u.id !== editRowId && u.username.toLowerCase() === form.username.trim().toLowerCase()
      )
    ) {
      setError("Username is already taken.");
      return;
    }

    const userPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: ageNum,
      gender: form.gender,
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    if (editRowId) {
      setUsers((prev) =>
        prev.map((user) => (user.id === editRowId ? { ...user, ...userPayload } : user))
      );
    } else {
      const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers((prev) => [{ id: nextId, ...userPayload }, ...prev]);
    }

    handleCloseDialog();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "email", headerName: "Email", minWidth: 220, flex: 1.1 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      flex: 0.7,
      valueGetter: (value) => labelize(value),
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      flex: 0.6,
      valueGetter: (value) => labelize(value),
    },
    { field: "contactNumber", headerName: "Contact", minWidth: 150, flex: 0.8 },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 120,
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "default"}
          variant={params.value ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button size="small" onClick={() => handleOpenEditDialog(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

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
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-start" }}
            spacing={2}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="overline" sx={{ opacity: 0.85, letterSpacing: 1 }}>
                DIRECTORY
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                Users & Roles
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.92, maxWidth: 720 }}>
                Manage accounts, roles, and activation status. Search and filter the roster to find the right user quickly.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
                <Chip label={`Total: ${totalUsers}`} color="primary" />
                <Chip label={`Active: ${activeUsers}`} variant="outlined" sx={{ color: "white", borderColor: "rgba(255,255,255,0.65)" }} />
                <Chip label={`Inactive: ${inactiveUsers}`} variant="outlined" sx={{ color: "white", borderColor: "rgba(255,255,255,0.65)" }} />
              </Stack>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={handleOpenAddDialog}
              sx={{
                minWidth: { xs: "100%", sm: 180 },
                alignSelf: { xs: "stretch", md: "flex-start" },
                ml: { md: "auto" },
                px: 3,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Add User
            </Button>
          </Stack>
        </Paper>

        {seedError ? (
          <Alert severity="warning">
            {seedError}
          </Alert>
        ) : null}

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
          <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                <TextField
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  size="small"
                  fullWidth
                  label="Search users"
                  placeholder="Find by firstName, lastName, email, or username..."
                />
                <TextField
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                  size="small"
                  label="Role"
                  select
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="all">All</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  value={genderFilter}
                  onChange={(event) => setGenderFilter(event.target.value)}
                  size="small"
                  label="Gender"
                  select
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="all">All</MenuItem>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  size="small"
                  label="Status"
                  select
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Stack>
              <Box sx={{ height: 560, width: "100%" }}>
                <DataGrid
                  rows={filteredUsers}
                  columns={columns}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                      outline: "none !important",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "rgba(20, 184, 166, 0.12)",
                    },
                  }}
                />
              </Box>
              {!filteredUsers.length ? (
                <Alert severity="info">No data found. Use Add User to create your first record.</Alert>
              ) : null}
            </Stack>
          </CardContent>
        </Card>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: 3 },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>{editRowId ? "Update User" : "Add User"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="First name" value={form.firstName} onChange={handleFieldChange("firstName")} fullWidth />
              <TextField label="Last name" value={form.lastName} onChange={handleFieldChange("lastName")} fullWidth />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Age"
                type="number"
                value={form.age}
                onChange={handleFieldChange("age")}
                fullWidth
              />
              <TextField
                label="Gender"
                value={form.gender}
                onChange={handleFieldChange("gender")}
                select
                fullWidth
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Contact Number"
                value={form.contactNumber}
                onChange={handleFieldChange("contactNumber")}
                fullWidth
              />
              <TextField label="Email" value={form.email} onChange={handleFieldChange("email")} type="email" fullWidth />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="Role" value={form.role} onChange={handleFieldChange("role")} select fullWidth>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="Username" value={form.username} onChange={handleFieldChange("username")} fullWidth />
            </Stack>

            <TextField
              label="Password"
              value={form.password}
              onChange={handleFieldChange("password")}
              type={showPassword ? "text" : "password"}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Address"
              value={form.address}
              onChange={handleFieldChange("address")}
              multiline
              minRows={2}
              fullWidth
            />

            <FormControlLabel
              control={<Switch checked={form.isActive} onChange={handleFieldChange("isActive")} />}
              label={`User is ${form.isActive ? "Active" : "Inactive"}`}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: 2 }}>
            {editRowId ? "Update User" : "Save User"}
          </Button>
        </DialogActions>
      </Dialog>
      </Stack>
    </Container>
  );
};

export default UsersPage;
