import { Button, Collapse, Form, FormProps, Input } from "antd";
import { IDebt } from "../../../interface";
const { Panel } = Collapse;

type FieldType = {
  sum?: string;
};

const QuenchAnyMonth = ({ data }: { data: IDebt }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <div style={{ width: "100%" }}>
      <Collapse
        accordion
        style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }}
      >
        <Panel header="Repay in any amount" key="3">
          <Form
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
              rules={[{ required: true, message: "Please enter amount!" }]}
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
