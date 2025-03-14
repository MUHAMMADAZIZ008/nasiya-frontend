import { Checkbox, CheckboxProps, Collapse } from "antd";
import { useState } from "react";
import { IDebt } from "../../../interface";
const { Panel } = Collapse;

const CheckboxGroup = Checkbox.Group;

const QuenchMultiMonth = ({ data }: { data: IDebt }) => {
  const [chooseMonth, setChooseMonth] = useState();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const plainOptions = ["Apple", "Pear", "Orange"];

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <div style={{ width: "100%" }}>
      <Collapse
        accordion
        style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }}
      >
        <Panel header="Choose a payment term" key="2">
          <div>
            <p>0.00 UZS</p>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check all
            </Checkbox>
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default QuenchMultiMonth;
