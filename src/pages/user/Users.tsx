import { Table, TableProps } from "antd";
import { useGetAllUsersQuery } from "../../redux/features/users/userApi";

interface DataType {
  key: string;
  name: string;
  contactNumber: number;
  email: string;
  role: string;
  _id: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "User Name",
    dataIndex: "name",
    key: "userName",
    responsive: ["md"],
  },
  {
    title: "User Email",
    dataIndex: "email",
    key: "email",
    responsive: ["md"],
  },
  {
    title: "Contact Number",
    key: "contactNumber",
    dataIndex: "contactNumber",
    responsive: ["md"],
  },
  {
    title: "User Role",
    key: "role",
    dataIndex: "role",
    responsive: ["md"],
  },
];

export default function Users() {
  const { data: users } = useGetAllUsersQuery(undefined);

  const usersData = users?.data?.map(
    ({ _id, name, role, email, contactNumber }: DataType) => ({
      key: _id,
      _id,
      name,
      role,
      email,
      contactNumber,
    })
  );

  return <Table columns={columns} dataSource={usersData} scroll={{ x: 800 }} />;
}
