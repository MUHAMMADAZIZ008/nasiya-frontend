import {
  Button,
  Flex,
  Image,
  Input,
  message,
  Select,
  Spin,
  Table,
  TableProps,
} from "antd";
import useGetAllDebtor from "./service/query/use-get-all-debtor";
import "./css/customers.css";
import { TableDataType } from "../../interface";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const columns: TableProps<TableDataType>["columns"] = [
  {
    className: "table__items",
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    className: "table__items",
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    className: "table__items",
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    className: "table__items",
    title: "Phone numbers",
    dataIndex: "phone_numbers",
    key: "phone_numbers",
  },
  {
    className: "table__items",
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    className: "table__items",
    title: "Total debts",
    dataIndex: "total_debts",
    key: "debts",
  },
  {
    className: "table__items",
    title: "Image",
    dataIndex: "images",
    key: "images",
    render: (text: string) => {
      return <Image width={100} height={50} src={text} />;
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
              console.log(data);
            }}
            type="default"
            style={{ backgroundColor: "red", color: "white", fontSize: "18px" }}
          >
            <DeleteOutlined />
          </Button>
          <Button
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

export interface IQuerySearch {
  skip?: number;
  take?: number;
  order_by?: string;
  search?: string;
  search_by?: string;
}

const Customers = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<TableDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState<IQuerySearch>({
    order_by: "ASC",
    search: "",
    search_by: "full_name",
    skip: 0,
    take: 10,
  });

  // const [resultQuery, setResultQuery] = useState<IQuerySearch>({
  //   order_by: "ASC",
  //   search: "",
  //   search_by: "full_name",
  //   skip: 0,
  //   take: 10,
  // });

  const { data, isLoading, error, isError } = useGetAllDebtor(searchQuery);
  console.log(data);

  if (isError) {
    contextHolder;
    contextHolder;
    messageApi.error(error.message);
  }

  useEffect(() => {
    if (typeof data === "object") {
      const newCustomers: TableDataType[] = data?.data?.map((item, index) => {
        return {
          id: String(index + 1),
          created_at: item.created_at.split("T")[0],
          address: item.address,
          full_name: item.full_name,
          images: item.images[0].image,
          total_debts: item.debts.reduce(
            (acc, debt) => +debt.debt_sum + acc,
            0
          ),
          key: item.id,
          phone_numbers: item.phone_numbers[0].phone_number,
        };
      });
      setCustomers(newCustomers);
    }
  }, [data]);

  // useEffect(() => {
  //   if (
  //     searchQuery &&
  //     Object.values(searchQuery).every((v) => v !== undefined)
  //   ) {
  //     setResultQuery(searchQuery);
  //   }
  // }, [searchQuery]);

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

  const searchByFn = (value: string) => {
    if (value) setSearchQuery((state) => ({ ...state, search_by: value }));
  };

  const orderByFn = (value: string) => {
    if (value) setSearchQuery((state) => ({ ...state, order_by: value }));
  };

  const inputFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery((state) => ({ ...state, search: e.target.value }));
  };
  const onChangeCustomerCreate = () => {
    navigate("/customer-create");
  };
  return (
    <section className="customer__page">
      {contextHolder}
      <div className="search__box">
        <div className="search__config">
          <div className="search__wrapper">
            <Input
              onChange={inputFn}
              className="search__input"
              placeholder="Search customers..."
            />
            <Button className="search__btn" type="primary">
              <SearchOutlined />
            </Button>
          </div>
          <Select
            defaultValue="Search type"
            style={{ width: 140 }}
            onChange={searchByFn}
            options={[
              { value: "phone_number", label: "By phone number" },
              { value: "full_name ", label: "By full name" },
            ]}
          />
          <Select
            defaultValue="Type of order"
            style={{ width: 120 }}
            onChange={orderByFn}
            options={[
              { value: "ASC", label: "Sorted" },
              { value: "DESC", label: "Reverse order" },
            ]}
          />
        </div>
        <Button
          style={{ fontSize: "18px" }}
          type="primary"
          icon={<UserAddOutlined />}
          onClick={onChangeCustomerCreate}
        >
          Create
        </Button>
      </div>
      <div>
        <Table<TableDataType>
          columns={columns}
          dataSource={customers}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </section>
  );
};

export default Customers;
