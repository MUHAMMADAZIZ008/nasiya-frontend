
const QuenchCheckBox = ({
  month,
  date,
  sum,
}: {
  month: number;
  date: string;
  sum: number;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p>{month}-month</p>
        <h3>{date}</h3>
      </div>
    </div>
  );
};

export default QuenchCheckBox;
