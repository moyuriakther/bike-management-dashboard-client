import { Button, Flex, Table } from "antd";
import type { TableProps } from "antd";
import { useGetSellHistoryQuery } from "../../redux/features/sell/sellApi";
import { useState } from "react";

interface DataType {
  key: string;
  buyerName: string;
  quantity: number;
  saleDate: string;
  _id: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Buyer Name",
    dataIndex: "buyerName",
    key: "buyerName",
    responsive: ["md"],
  },
  {
    title: "Product Quantity",
    dataIndex: "quantity",
    key: "quantity",
    responsive: ["md"],
  },
  {
    title: "Sale Id",
    key: "_id",
    dataIndex: "_id",
    responsive: ["md"],
  },
  {
    title: "Sale Date",
    key: "saleDate",
    dataIndex: "saleDate",
    responsive: ["md"],
  },
];

export default function SalesHistory() {
  const [selectedInterval, setSelectedInterval] = useState("");
  const { data: saleHistory } = useGetSellHistoryQuery(selectedInterval);

  const salesData = saleHistory?.data?.map(
    ({ _id, buyerName, saleDate, quantity }: DataType) => ({
      key: _id,
      _id,
      buyerName,
      saleDate,
      quantity,
    })
  );

  const handleButtonClick = async (interval: any) => {
    setSelectedInterval(interval);
  };

  return (
    <>
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Flex gap="small" wrap="wrap">
          <Button type="primary" onClick={() => handleButtonClick("Daily")}>
            Daily
          </Button>
          <Button type="primary" onClick={() => handleButtonClick("Weekly")}>
            Weekly
          </Button>
          <Button type="primary" onClick={() => handleButtonClick("Monthly")}>
            Monthly
          </Button>
          <Button type="primary" onClick={() => handleButtonClick("Yearly")}>
            Yearly
          </Button>
        </Flex>
      </div>
      <Table columns={columns} dataSource={salesData} scroll={{ x: 800 }} />
    </>
  );
}
