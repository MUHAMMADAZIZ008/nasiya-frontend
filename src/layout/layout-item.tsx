import { HomeOutlined, ProfileOutlined, SettingOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ReportIcon from "../components/report-icon";

export const items = [
  {
    key: "1",
    icon: <HomeOutlined style={{fontSize: '20px'}}/>,
    label: "Home",
  },
  {
    key: "2",
    icon: <UsergroupAddOutlined style={{fontSize: '20px'}} />,
    label: "Customer",
  },
  {
    key: "3",
    icon: <ProfileOutlined style={{fontSize: '20px'}} />,
    label: "Report",
  },
  {
    key: "4",
    icon: <SettingOutlined  style={{fontSize: '20px'}} />,
    label: "Settings",
  },
];
