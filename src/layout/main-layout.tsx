import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { items } from "./layout-item";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { getCookie, removeCookie } from "../config/cookie";
import { UserInfoEnum } from "../enum";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [token, setToken] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie(UserInfoEnum.ACCESS_TOKEN);
    if (!accessToken) {
      navigate("/login");
    } else {
      setToken(accessToken);
    }
  }, []);

  if (!token) {
    return <div></div>;
  }

  const logoutBtn = () => {
    removeCookie(UserInfoEnum.ACCESS_TOKEN)
    removeCookie(UserInfoEnum.REFRESH_TOKEN)
    removeCookie(UserInfoEnum.USER)
    setToken(null)
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 50px 0 0",
            background: colorBgContainer,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              height: '100%',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={logoutBtn}
              style={{
                fontSize: "20px",
                fontWeight: "700",
                border: "none",
                display: "block",
              }}
            >
              <LogoutOutlined />
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
