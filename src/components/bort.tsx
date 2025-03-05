const Bort = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div
      style={{
        borderRadius: '10px',
        width: "100%",
        padding: "17px 24px",
        backgroundColor: "#F2F5FA",
      }}
    >
      <h2 style={{ fontSize: "25px", marginBottom: "12px" }}>
        {title === "Home" ? "Dashboard" : title}
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "157%", fontWeight: "600" }}>
        {subTitle ? subTitle : title}
      </p>
    </div>
  );
};

export default Bort;
