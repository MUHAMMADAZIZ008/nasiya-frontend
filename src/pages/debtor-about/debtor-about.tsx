import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  StarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import useGetDebtor from "./service/query/use-get-debtor";
import { Button, Image, message, Spin, Table, TableProps } from "antd";
import "./css/debtor-about.css";
import { DebtTableType } from "../../interface";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";

const DebtorAbout = () => {
  const dispatch = useDispatch();
  const likeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [likeButtonToggle, setLikeButtonToggle] = useState<boolean>(false);
  const [messageApi, setOutput] = message?.useMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const debtorId = id ?? "";
  const { data, isError, error, isLoading } = useGetDebtor(debtorId);
  // const [debtor, setDebtor] = useState<Omit<IDebtor, 'images'>>();

  const goBack = () => {
    navigate(-1);
  };
  // debt table
  const newDebts: DebtTableType[] =
    data?.debts?.map((item, index) => {
      return {
        key: item?.id,
        created_at: String(item?.created_at),
        debt_name: item.debt_name,
        debt_status: item?.debt_status,
        debt_sum: item?.debt_sum,
        id: String(index + 1),
        next_payment_date: String(item?.next_payment_date),
      };
    }) ?? [];

  useEffect(() => {
    dispatch(changeValue({ title: "Customers", subTitle: "Debtor" }));

    if (isError) {
      messageApi.error(error.message);
    }
  }, []);

  const columns: TableProps<DebtTableType>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product name",
      dataIndex: "debt_name",
      key: "debt_name",
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
      render: (text: string) => {
        return text === "active" ? (
          <p style={{ color: "green", fontSize: "18px", fontWeight: "700" }}>
            {text}
          </p>
        ) : (
          <p style={{ color: "red", fontSize: "18px", fontWeight: "700" }}>
            {text}
          </p>
        );
      },
    },
  ];

  //debt create
  const onDebtCreate = () => {
    navigate(`/debt-create/${data?.id}`);
  };
  const clickLike = () => {
    if (likeButtonToggle && likeButtonRef.current) {
      likeButtonRef.current?.style &&
        (likeButtonRef.current.style.color = "yellow");
    } else if (likeButtonToggle === false) {
      likeButtonRef.current?.style &&
        (likeButtonRef.current.style.color = "block");
    }
    setLikeButtonToggle(!likeButtonToggle);
  };
  return (
    <section className="debtor__section">
      {setOutput}
      <Spin spinning={isLoading}>
        <div className="debtor__wrapper">
          <div className="debtor__box">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{ marginBottom: "10px" }}
                type="primary"
                onClick={goBack}
              >
                <ArrowLeftOutlined />
              </Button>
              <Button
                style={{ fontSize: "20px" }}
                ref={likeButtonRef}
                type="text"
                onClick={clickLike}
              >
                <StarOutlined />
              </Button>
            </div>

            <div className="debtor__content-box">
              <div className="debtor__item-box">
                <p className="debtor__item-title">Full name:</p>
                <h3 className="debtor__item-text">
                  {data?.full_name || "N/A"}
                </h3>
              </div>
              <div className="debtor__item-box">
                <p className="debtor__item-title">Total debts:</p>
                <h3 className="debtor__item-text">
                  {data?.debts.reduce((acc, debt) => acc + +debt.debt_sum, 0) +
                    " " || 0 + " "}
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
              <div className="debtor__item-box">
                <p className="debtor__item-title">Address:</p>
                <h3 className="debtor__item-text">{data?.address || "N/A"}</h3>
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
              dataSource={newDebts}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </div>
      </Spin>
    </section>
  );
};

export default DebtorAbout;
