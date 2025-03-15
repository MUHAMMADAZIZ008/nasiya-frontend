import { Button, Collapse, Form, FormProps, Input, message } from "antd";
import { IDebt, PaymentDataT } from "../../../interface";
import useAnyPayment from "../service/mutation/use-any-payment";
import { PaymentType } from "../../../enum";
const { Panel } = Collapse;

type FieldType = {
  sum?: string;
};

const QuenchAnyMonth = ({ data }: { data: IDebt }) => {
  const [messageApi, setOutput] = message?.useMessage();

  const { mutate } = useAnyPayment();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values.sum) {
      const newData: Omit<PaymentDataT, "monthCount"> = {
        debtId: data.id,
        sum: +values.sum,
        type: PaymentType.ANY_PAYMENT,
      };
      mutate(newData, {
        onSuccess: () => {
          messageApi.success("successfully payed!");
        },
        onError: (error) => {
          console.log(error);

          messageApi.error(error.message);
        },
      });
    }
  };

  const [form] = Form.useForm();

  // const onValuesChange = (changedValues: Partial<FieldType>) => {
  //   const value = changedValues.sum;

  //   if (value && !/^\d*$/.test(value)) {
  //     form.setFields([
  //       {
  //         name: "sum",
  //         errors: ["Please enter only numbers!"],
  //       },
  //     ]);
  //   } else {
  //     form.setFields([
  //       {
  //         name: "sum",
  //         errors: [],
  //       },
  //     ]);
  //   }
  // };

  return (
    <div style={{ width: "100%" }}>
      {setOutput}
      <Collapse
        accordion
        style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }}
      >
        <Panel header="Repay in any amount" key="3">
          <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Enter amount"
              name="sum"
              rules={[
                { required: true, message: "Please enter amount!" },
                { pattern: /^\d+$/, message: "Please enter numbers only!" },
                {
                  validator: (_, value) =>
                    value && Number(value) > +data.debt_sum
                      ? Promise.reject(
                          new Error(`Maximum amount is ${data.debt_sum}`)
                        )
                      : Promise.resolve(),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default QuenchAnyMonth;
