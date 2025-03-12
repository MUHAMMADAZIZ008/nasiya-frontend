import {
  Button,
  Calendar,
  DatePicker,
  DatePickerProps,
  message,
  Spin,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./css/calendar.css";
import useGetOneDay from "./service/query/use-get-one-day";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";
import dayjs, { Dayjs } from "dayjs";

const CalendarPage = () => {
  const dispatch = useDispatch();

  dispatch(changeValue({ title: "Home", subTitle: "Calendar" }));

  const newDate = new Date(); // Hozirgi sana
  const formattedDate: string = dayjs(newDate).format("YYYY-MM-DD");

  const [date, setDate] = useState<string>(formattedDate);
  const { data, error, isLoading, isError } = useGetOneDay(date);
  console.log(data);
  
  const navigate = useNavigate();
  const [messageApi, setOutput] = message.useMessage();

  const goBack = () => {
    navigate(-1);
  };

  if (isError) {
    messageApi.error(error.message);
  }

  if (isLoading) {
    return <Spin size="large" />;
  }

  const dateChange = (date: Dayjs) => {
    const jsDate = date.toDate();
    const formattedDate = dayjs(jsDate).format("YYYY-MM-DD");
    setDate(formattedDate);
  };

  return (
    <section className="calendar__page">
      {setOutput}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Button type="primary" onClick={goBack}>
          <ArrowLeftOutlined />
        </Button>
        <h2>Calendar</h2>
      </div>
      <div className="calendar__box">
        <div className="calendar__box-info">
          <Calendar
            onChange={dateChange}
            className="calendar__date"
            style={{ width: "400px" }}
            fullscreen={false}
          />
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
        <div></div>
      </div>
    </section>
  );
};

export default CalendarPage;
