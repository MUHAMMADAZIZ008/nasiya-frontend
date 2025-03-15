import { Button, Checkbox, CheckboxProps, Collapse, message } from "antd";
import { useState } from "react";
import { IDebt, PaymentDataT } from "../../../interface";
import dayjs from "dayjs";
import useMonthPayment from "../service/mutation/use-month-payment";
import { PaymentType } from "../../../enum";
const { Panel } = Collapse;

const QuenchMultiMonth = ({ data }: { data: IDebt }) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const [messageApi, setOutput] = message?.useMessage();

  const plainOptions: string[] = [];

  const currentMonth = data.debt_period;
  for (let i = 0; i < currentMonth; i++) {
    plainOptions.push((+data.debt_sum / currentMonth).toFixed(2) + " UZS");
  }

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (item: string, checked: boolean) => {
    setCheckedList((prev) =>
      checked ? [...prev, item] : prev.filter((el) => el !== item)
    );
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? [...plainOptions] : []);
  };

  const startMonthNumber = +data.total_month - data.debt_period;

  interface monthDataT {
    month: string;
    date: string;
  }
  const monthData: monthDataT[] = [];

  if (+data.total_month === data.debt_period) {
    for (let index = 0; index < data.debt_period; index++) {
      const currentDate = dayjs().add(index, "month");
      const formattedDate = currentDate.format("YYYY-MM-DD");
      monthData.push({
        month: `${index + 1}-month`,
        date: formattedDate,
      });
    }
  } else if (+data.total_month > data.debt_period) {
    for (
      let index = startMonthNumber + 1;
      index <= +data.total_month;
      index++
    ) {
      const currentDate = dayjs().add(index - 1, "month");
      const formattedDate = currentDate.format("YYYY-MM-DD");
      monthData.push({
        month: `${index}-month`,
        date: formattedDate,
      });
    }
  }

  const { mutate } = useMonthPayment();

  const onQuench = () => {
    const paymentData: PaymentDataT = {
      debtId: data.id,
      sum: (+data.debt_sum / data.debt_period) * checkedList.length,
      type: PaymentType.MULTI_MONTH,
      monthCount: 1,
    };
    mutate(paymentData, {
      onSuccess: () => {
        messageApi.success("successfully payed!");
      },
      onError: (error) => {
        messageApi.error(error.message)
      },
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {setOutput}
      <Collapse
        accordion
        style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }}
      >
        <Panel header="Choose a payment term" key="2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <p>
              {checkedList.length * (+data.debt_sum / data.debt_period)} UZS
            </p>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check all
            </Checkbox>
          </div>
          <div style={{ marginBottom: "15px" }}>
            {plainOptions.map((item, index) => {
              const uniqueValue = `${monthData[index]?.month} - ${item}`;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <p style={{ fontSize: "14px" }}>
                      {monthData[index]?.month}
                    </p>
                    <p style={{ fontSize: "18px", fontWeight: 600 }}>
                      {monthData[index]?.date}
                    </p>
                  </div>
                  <Checkbox
                    checked={checkedList.includes(uniqueValue)}
                    onChange={(e) => onChange(uniqueValue, e.target.checked)}
                  >
                    {item}
                  </Checkbox>
                </div>
              );
            })}
          </div>
          <Button
            disabled={checkedList.length ? false : true}
            type="primary"
            block
            onClick={onQuench}
          >
            Quench
          </Button>
        </Panel>
      </Collapse>
    </div>
  );
};

export default QuenchMultiMonth;
