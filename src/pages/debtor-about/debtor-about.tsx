import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined, UserAddOutlined } from "@ant-design/icons";

import useGetDebtor from "./service/query/use-get-debtor";
import { Button, Flex, Image, message, Spin, Table, TableProps } from "antd";
import "./css/debtor-about.css";
import { DebtTableType } from "../../interface";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";

const DebtorAbout = () => {
  const dispatch = useDispatch();

  const [messageApi, setOutput] = message.useMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const debtorId = id ?? "";
  const { data, isError, error, isLoading } = useGetDebtor(debtorId);
  // const [debtor, setDebtor] = useState<Omit<IDebtor, 'images'>>();

  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  if (isLoading) {
    return (
      <Flex gap="middle" style={{ margin: "50px 200px" }}>
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </Flex>
    );
  }

  const goBack = () => {
    navigate(-1);
  };
  // debt table

  const [debts, setDebts] = React.useState<DebtTableType[]>([]);

  useEffect(() => {
    dispatch(changeValue({ title: "Customers", subTitle: "Debtor" }));

    if (isError) {
      messageApi.error(error.message);
    }
    const newDebts: DebtTableType[] =
      data?.debts?.map((item, index) => ({
        key: item.id,
        created_at: String(item.created_at),
        debt_status: item.debt_status,
        debt_sum: item.debt_sum,
        id: String(index + 1),
        images: item.images?.[0]?.image || "",
        next_payment_date: String(item.next_payment_date),
      })) ?? [];

    setDebts(newDebts);
  }, [data]);

  const columns: TableProps<DebtTableType>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Next payment date",
      dataIndex: "next_payment_date",
      key: "next_payment_date",
    },
    {
      title: "Debt sum",
      dataIndex: "debt_sum",
      key: "debt_sum",
    },
    {
      title: "Status",
      dataIndex: "debt_status",
      key: "debt_status",
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (text: string) => {
        return <Image width={100} height={50} src={text} />;
      },
    },
  ];

  //debt create
  const onDebtCreate = () => {};
  return (
    <section className="debtor__section">
      {setOutput}
      <div className="debtor__wrapper">
        <div className="debtor__box">
          <Button
            style={{ marginBottom: "10px" }}
            type="primary"
            onClick={goBack}
          >
            <ArrowLeftOutlined />
          </Button>
          <div className="debtor__content-box">
            <div className="debtor__item-box">
              <p className="debtor__item-title">Full name:</p>
              <h3 className="debtor__item-text">{data?.full_name || "N/A"}</h3>
            </div>
            <div className="debtor__item-box">
              <p className="debtor__item-title">Total debts:</p>
              <h3 className="debtor__item-text">
                {data?.debts?.reduce((acc, debt) => acc + debt.debt_sum, 0) ||
                  0}{" "}
                so'm
              </h3>
            </div>
            <div className="debtor__item-box">
              <p className="debtor__item-title">Phone numbers:</p>
              <h3 className="debtor__item-text">
                {data?.phone_numbers
                  ?.map((item) => item.phone_number)
                  .join(", ") || "N/A"}
              </h3>
            </div>
            <div className="debtor__item-box">
              <p className="debtor__item-title">Description:</p>
              <h3 className="debtor__item-text">
                {data?.description || "N/A"}
              </h3>
            </div>
            <div className="debtor__item-img-box">
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                {data?.images
                  ? data.images.map((item) => (
                      <Image width={200} src={item.image} />
                    ))
                  : ""}
              </Image.PreviewGroup>
            </div>
          </div>
        </div>
        <div className="debtor__debt-box">
          <div className="debtor__debt-control">
            <p className="debtor__control_text">All debts</p>
            <Button
              style={{ fontSize: "18px" }}
              type="primary"
              icon={<UserAddOutlined />}
              onClick={onDebtCreate}
            >
              Create
            </Button>
          </div>
          <Table<DebtTableType>
            columns={columns}
            dataSource={debts}
            pagination={{ pageSize: 7 }}
          />
        </div>
      </div>
    </section>
  );
};

export default DebtorAbout;
