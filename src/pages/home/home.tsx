import { use, useState } from "react";
import "./css/home.css";
import { useGetStatistic } from "./service/query/use-get-statistic";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Home = () => {
  const [totalVisible, setTotalVisible] = useState(false);
  const { data, isLoading, error } = useGetStatistic();
  console.log(data);

  return (
    <section className="home__section">
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
                  data?.data.totalDebt + " $"
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
              <p className="home__left-payment-text" style={{color: 'red'}}>
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
        <div className="home__right-box"></div>
      </div>
    </section>
  );
};

export default Home;
