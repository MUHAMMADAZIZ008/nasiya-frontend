import {
  HomeOutlined,
  ProfileOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

export const items = [
  {
    path: "/",
    icon: HomeOutlined,
    title: "Home",
  },
  {
    path: "/customer",
    icon: UsergroupAddOutlined,
    title: "Customer",
  },
  {
    path: "/report",
    icon: ProfileOutlined,
    title: "Report",
  },
  {
    icon: SettingOutlined,
    title: "Settings",
    children: [
      {
        path: "/profile",
        title: "Profile",
      },
      {
        path: "/protect",
        title: "Protect",
      },
      {
        path: "/help",
        title: "Help",
      },
      {
        path: "/offer-complaint",
        title: "Offer and complaint",
      },
    ],
  },
];
