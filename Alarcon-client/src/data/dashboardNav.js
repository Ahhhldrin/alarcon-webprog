import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";

export const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
    roles: ["admin", "editor"],
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
    roles: ["admin", "editor"],
  },
  {
    label: "Articles",
    title: "Articles",
    to: "/dashboard/articles",
    icon: ArticleIcon,
    roles: ["admin", "editor"],
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
    roles: ["admin"],
  },
];
