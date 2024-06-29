import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
const { Header, Content } = Layout;

export default function MainLayout() {
  //   const handleChange = (e: any) => {
  //     console.log(e.target.value);
  //   };
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        {/* <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Input
              placeholder="Search..."
              style={{ width: 300 }}
              onChange={handleChange}
            />
            <Button type="primary">Search</Button>
          </div>
        </Header> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
