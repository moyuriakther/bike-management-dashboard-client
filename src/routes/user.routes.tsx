import AddProduct from "../pages/user/AddProduct";
import AllProducts from "../pages/user/AllProducts";
import SalesHistory from "../pages/user/SalesHistory";
// import UpdateBikeDetails from "../pages/user/UpdateBikeDetails";
import UpdateProduct from "../pages/user/UpdateProduct";
import UserDashboard from "../pages/user/UserDashboard";
import Users from "../pages/user/Users";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "All Bikes",
    path: "all-bikes",
    element: <AllProducts />,
  },
  {
    name: "Add New Bike",
    path: "add-bike",
    element: <AddProduct />,
  },
  {
    name: "",
    path: ":bikeId/edit-product",
    element: <UpdateProduct />,
  },
  {
    name: "Sales History",
    path: "sales",
    element: <SalesHistory />,
  },
  {
    name: "Users",
    path: "users",
    element: <Users />,
  },
];
