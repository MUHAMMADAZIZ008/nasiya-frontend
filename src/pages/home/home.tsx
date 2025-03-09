import { useState } from "react";
import "./css/home.css";
import { useGetStatistic } from "./service/query/use-get-statistic";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Flex, message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";

const Home = () => {
  const dispatch = useDispatch();

  dispatch(changeValue({ title: "Home", subTitle: "Home" }));

  const [totalVisible, setTotalVisible] = useState(false);
  const { data, isLoading, error, isError } = useGetStatistic();

  const [messageApi, setOutput] = message.useMessage();

  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  if (isError) {
    messageApi.error(error.message);
  }

  if (isLoading) {
    return (
      <Flex gap="middle" style={{ margin: "50px 200px" }}>
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </Flex>
    );
  }

  return (
    <section className="home__section">
      {setOutput}
      {/* <Button
        className="home__calendar-btn"
        style={{ width: "40px", height: "40px", borderRadius: "12px" }}
        icon={<CalendarIcon />}
      ></Button> */}
      <div className="home__wrapper">
        <div className="home__left-box">
          <div className="home__left-grid">
            <div className="total__blanc-box">
              <h2 className="total__blanc">
                {totalVisible ? (
                  data?.data.totalDebt + " UZS"
                ) : (
                  <p style={{ letterSpacing: "5px" }}>*****</p>
                )}
              </h2>
              <p className="total__text">General Money:</p>
              <button
                onClick={() => setTotalVisible(!totalVisible)}
                className="visible__btn"
              >
                {totalVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
            <div className="home__left-payment-box">
              <h3 className="home__left-payment-title">Late payment</h3>
              <p className="home__left-payment-text" style={{ color: "red" }}>
                {data?.data.lateDebtsCount}
              </p>
            </div>
            <div className="home__left-payment-box">
              <h3 className="home__left-payment-title">Costumers count</h3>
              <p className="home__left-payment-text">
                {data?.data.debtorCount}
              </p>
            </div>
          </div>
        </div>
        <div className="home__right-box">
          <h2 className="home__right-title">Wallet</h2>
          <div className="home__right-wrapper">
            <p className="home__right-box-title">Funds in your account</p>
            <h3 className="home__right-box-text">300000 UZS</h3>
          </div>
          <Button className="home__right-plus-btn" type="primary">
            <PlusOutlined />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
