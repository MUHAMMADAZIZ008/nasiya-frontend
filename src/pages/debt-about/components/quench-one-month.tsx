import { Collapse, Card, Typography, Button } from "antd";
import { IDebt } from "../../../interface";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const QuenchOneMonth = ({ data }: { data: IDebt }) => {
  const dateNow = Date();
  return (
    <div style={{ width: "100%" }}>
      <Collapse
        accordion
        style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }}
      >
        <Panel header="Repayment for 1 month" key="1">
          <Card style={{ background: "#E8F0FE", padding: 16, borderRadius: 8 }}>
            <Title level={4} style={{ color: "#1A73E8", marginBottom: 0 }}>
              {+data.debt_sum / data.debt_period} UZS
            </Title>
            <Text type="secondary">Repayment for {dateNow.split(" ")[1]}</Text>
          </Card>

          <Button
            type="primary"
            block
            style={{
              marginTop: 16,
              backgroundColor: "#1A73E8",
              borderRadius: 8,
              height: 40,
              fontSize: 16,
            }}
          >
            Repay for 1 month
          </Button>
        </Panel>
      </Collapse>
    </div>
  );
};

export default QuenchOneMonth;
