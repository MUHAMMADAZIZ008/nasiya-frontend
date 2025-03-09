import { Button, DatePicker, DatePickerProps } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./css/calendar.css";
import useGetOneDay from "./service/query/use-get-one-day";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";

const CalendarPage = () => {
  const dispatch = useDispatch();

  dispatch(changeValue({ title: "Home", subTitle: "Calendar" }));
  const [date, setDate] = useState(new Date());
  const { data, error, isLoading, isError } = useGetOneDay(date);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString === "string" && dateString) {
      setDate(new Date(dateString));
    }
  };

  return (
    <section className="calendar__page">
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Button type="primary" onClick={goBack}>
          <ArrowLeftOutlined />
        </Button>
        <h2>Calendar</h2>
      </div>
      <div className="calendar__box">
        <div className="calendar__box-info">
          <DatePicker className="calendar__date" onChange={onChange} />
          <div className="calendar__check-box">
            <h3 className="calendar__check-box-title">
              {String(date).split(" ")[0]} {String(date).split(" ")[1]}{" "}
              {String(date).split(" ")[3]}
            </h3>
            <div className="calendar__price-box">
              <p className="calendar__price-date">Monthly total:</p>
              <p className="calendar__price-total">5000000 UZS</p>
            </div>
            <div className="calendar__price-box">
              <p className="calendar__price-date">Daily total:</p>
              <p className="calendar__price-total">5000000 UZS</p>
            </div>
          </div>
        </div>
        <div className="calendar__debtor-box">
          <h3 className="calendar__debtor-title">
            Payment is expected on {String(date).split(" ")[0]}{" "}
            {String(date).split(" ")[1]} {String(date).split(" ")[2]}
          </h3>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default CalendarPage;
