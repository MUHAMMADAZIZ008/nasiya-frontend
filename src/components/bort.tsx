import { Button } from "antd";
import CalendarIcon from "../assets/components/calendar-icon";
import { useNavigate } from "react-router-dom";

const Bort = ({ title, subTitle }: { title: string; subTitle: string }) => {
  const navigate = useNavigate();
  
  const openPage = () => {
    navigate("/calendar-page");
  };
  return (
    <div
      style={{
        borderRadius: "10px",
        width: "100%",
        padding: "17px 24px",
        backgroundColor: "#F2F5FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ fontSize: "25px", marginBottom: "12px" }}>
          {title === "Home" ? "Dashboard" : title}
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "157%", fontWeight: "600" }}>
          {subTitle ? subTitle : title}
        </p>
      </div>
      {title === "Home" ? (
        <Button
          className=""
          onClick={openPage}
          style={{ width: "40px", height: "40px", borderRadius: "12px" }}
          icon={<CalendarIcon />}
        ></Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Bort;
