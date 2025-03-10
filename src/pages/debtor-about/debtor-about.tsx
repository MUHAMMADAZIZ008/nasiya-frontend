import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EyeOutlined,
  StarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import useGetDebtor from "./service/query/use-get-debtor";
import { Button, Image, message, Spin, Table, TableProps } from "antd";
import "./css/debtor-about.css";
import { DebtTableType } from "../../interface";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";
import useDeleteDebt from "./service/mutation/use-delete-debt";
import { useQueryClient } from "@tanstack/react-query";
import useLikeCreate from "./service/mutation/use-like-create";
import useGetLike from "./service/query/use-get-like";
import useDeleteLike from "./service/mutation/use-delete-like";

const DebtorAbout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [messageApi, setOutput] = message?.useMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const debtorId = id ?? "";
  const { data, isError, error, isLoading } = useGetDebtor(debtorId);
  const {
    mutate,
    error: deleteError,
    isPending: deletePending,
  } = useDeleteDebt();

  const goBack = () => {
    navigate(-1);
  };
  // debt table
  const newDebts: DebtTableType[] =
    data?.debts?.map((item, index) => {
      return {
        key: item?.id,
        created_at: String(item?.created_at).split("T")[0],
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

  const onDebtDelete = (data: { key: string }) => {
    mutate(data.key, {
      onSuccess: () => {
        messageApi.success("successfully delete!");
        queryClient.invalidateQueries({ queryKey: ["one_debtor"] });
      },
    });
  };
  if (deleteError) {
    messageApi.error(deleteError.message);
  }

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
    {
      title: "Action",
      className: "table__items",
      key: "action",
      render: (data) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              onClick={() => {
                onDebtDelete(data);
              }}
              type="default"
              disabled={deletePending}
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: "18px",
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
              onClick={() => navigate(`/debt-about/${data.key}`)}
              type="default"
              style={{
                backgroundColor: "green",
                color: "white",
                fontSize: "18px",
              }}
            >
              <EyeOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  //debt create
  const onDebtCreate = () => {
    navigate(`/debt-create/${data?.id}`);
  };

  // likes

  const { mutate: LikeMutate } = useLikeCreate();
  const { data: LikeData } = useGetLike(data?.id || "");
  const { mutate: likeDeletMutate } = useDeleteLike();

  const clickLike = () => {
    if (!LikeData) {
      LikeMutate(debtorId);
    } else if (LikeData?.status_code === 200) {
      likeDeletMutate(LikeData.data.id);
    }
  };

  const likeBtn = {
    fontSize: "20px",
    color: "black",
  };
  if (!LikeData) {
    likeBtn.color = "black";
  } else {
    likeBtn.color = "yellow";
  }

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
              <Button style={likeBtn} type="text" onClick={clickLike}>
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
                    ? data.images.map((item, index) => (
                        <Image key={index} width={200} src={item.image} />
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
