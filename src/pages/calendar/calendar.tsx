import { Button, DatePicker, DatePickerProps } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./css/calendar.css";
import useGetOneDay from "./service/query/use-get-one-day";
import { useState } from "react";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const { data, error, isLoading, isError } = useGetOneDay(date);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString === "string") {
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
      <div>
        <div>
          <DatePicker onChange={onChange} />
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default CalendarPage;
