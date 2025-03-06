import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { items } from "./layout-item";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { createElement, useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { getCookie, removeCookie } from "../config/cookie";
import { UserInfoEnum } from "../enum";
import Bort from "../components/bort";

const MainLayout = () => {
  const [bortTitle, setBortTitle] = useState("Home");
  const [bortSubTitle, setBortSubTitle] = useState("Home");
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
    navigate("/login");
    return <div></div>;
  }

  const logoutBtn = () => {
    removeCookie(UserInfoEnum.ACCESS_TOKEN);
    removeCookie(UserInfoEnum.REFRESH_TOKEN);
    removeCookie(UserInfoEnum.USER);
    setToken(null);
  };

  const bortChange = (title: string, subTitle?: string) => {
    console.log({ title, subTitle });

    setBortTitle(title);
    if (subTitle) {
      setBortSubTitle(subTitle);
    }
  };
  const menu = items.map((item, index: number) => {
    return {
      key: index,
      icon: createElement(item.icon),
      label: <Link to={item?.path || "#"}>{item?.title}</Link>,
      onClick: () => bortChange(item.title),

      children: item.children?.length
        ? item.children.map((innerItem) => ({
            onClick: () => bortChange(item.title, innerItem.title),

            key: innerItem.path,
            label: <Link to={innerItem.path}>{innerItem.title}</Link>,
          }))
        : undefined,
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={menu}
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
              height: "100%",
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
          <Bort title={bortTitle} subTitle={bortSubTitle} />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
