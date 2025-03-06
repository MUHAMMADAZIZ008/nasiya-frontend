import { Flex, Image, Input, Spin, Table, TableProps } from "antd";
import useGetAllDebtor from "./service/query/use-get-all-debtor";
import "./css/customers.css";
import { TableDataType } from "../../interface";
import { useEffect, useState } from "react";

const columns: TableProps<TableDataType>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone numbers",
    dataIndex: "phone_numbers",
    key: "phone_numbers",
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Image",
    dataIndex: "images",
    key: "images",
    render: (text: string) => {
      return <Image width={200} src={text} />;
    },
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<TableDataType[]>([]);
  const { data, isLoading, error } = useGetAllDebtor();

  console.log(data);

  useEffect(() => {
    if (typeof data === "object") {
      const newCustomers: TableDataType[] = data?.data?.map((item, index) => {
        return {
          id: String(index + 1),
          created_at: item.created_at,
          address: item.address,
          full_name: item.full_name,
          images: item.images[0].image,
          key: item.id,
          phone_numbers: item.phone_numbers[0].phone_number,
        };
      });
      setCustomers(newCustomers);
    }
  }, [data]);

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

  return (
    <section className="customer__page">
      <Input placeholder="Search customers..." />
      <div>
        <Table<TableDataType> columns={columns} dataSource={customers} />
      </div>
    </section>
  );
};

export default Customers;
