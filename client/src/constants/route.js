import {
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
export const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: ManageAccountsIcon,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: GroupsIcon,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: MessageIcon,
  },
];
