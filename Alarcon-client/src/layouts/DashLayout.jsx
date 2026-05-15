import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Tooltip from "@mui/material/Tooltip";
import { clearAuthSession, getStoredUser } from "../utils/auth";
import { dashboardNavItems } from "../data/dashboardNav";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#f8fafc", 0.16),
  "&:hover": {
    backgroundColor: alpha("#f8fafc", 0.28),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 0, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find((t) => t.to === pathname)?.title ?? "Welcome";

const DashLayout = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const navigate = useNavigate();
    const currentUser = getStoredUser();
    const allowedNavItems = dashboardNavItems.filter(({ roles }) =>
      roles.includes(String(currentUser?.role ?? "").toLowerCase())
    );
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    const handleLogout = () => {
      clearAuthSession();
      navigate("/auth/signin");
    };
  
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
  
          {/* App Bar */}
          <AppBar
            position="fixed"
            open={open}
            sx={{
              background: "linear-gradient(90deg, #0f172a 0%, #1f2937 100%)",
              boxShadow: "0 6px 24px rgba(2, 132, 199, 0.18)",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                // onClick={!open}
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                edge="start"
                // sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                sx={{ marginRight: 2 }}
              >
                {open ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
  
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                {pageTitle}
              </Typography>
  
              {/* Search */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
  
              <Tooltip title={currentUser?.email || "My profile"}>
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#0f766e", mr: 1.5 }}>
                  {String(currentUser?.firstName?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
                </Avatar>
              </Tooltip>
              <Button color="inherit" variant="outlined" onClick={handleLogout} sx={{ borderRadius: 2 }}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
  
          {/* Drawer */}
          <Drawer
            variant="permanent"
            open={open}
            sx={{
              "& .MuiDrawer-paper": {
                borderRight: "1px solid rgba(148, 163, 184, 0.22)",
                backgroundColor: "#111827",
                color: "#e5e7eb",
              },
            }}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
  
            <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.24)" }} />

            <Box sx={{ px: open ? 2 : 1, py: 1.5 }}>
              <Typography
                variant="overline"
                sx={{
                  opacity: open ? 1 : 0,
                  color: "#cbd5e1",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s",
                }}
              >
                Navigation
              </Typography>
            </Box>
  
            {/* Drawer List */}
            <List>
              {allowedNavItems.map(({ label, to, icon }) => {
                const NavIcon = icon;
                return (
                <ListItem key={to} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    component={Link}
                    to={to}
                    selected={location.pathname === to}
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      justifyContent: open ? "initial" : "center",
                      borderRadius: 2,
                      mx: 1,
                      my: 0.4,
                      color: "#f8fafc",
                      "&.Mui-selected": {
                        color: "#ffffff",
                        bgcolor: "rgba(20, 184, 166, 0.35)",
                        "& .MuiListItemIcon-root": { color: "#ffffff" },
                        "&:hover": { bgcolor: "rgba(20, 184, 166, 0.45)" },
                      },
                      "&:hover": { bgcolor: "rgba(148, 163, 184, 0.24)" },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#e2e8f0",
                      }}
                    >
                      <NavIcon />
                    </ListItemIcon>
  
                    <ListItemText
                      primary={label}
                      sx={{
                        opacity: open ? 1 : 0,
                        "& .MuiTypography-root": { fontWeight: 500 },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                );
              })}
            </List>
          </Drawer>
  
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: { xs: 2, md: 3 },
              minHeight: "100vh",
              backgroundColor: "#f8fafc",
            }}
          >
            <DrawerHeader />
            {/* Content */}
            <Outlet />
          </Box>
        </Box>
      </>
    );
  };
  
  export default DashLayout;
