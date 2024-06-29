import { Button, Card, Checkbox } from "antd";
import { NavLink } from "react-router-dom";
import {
  EditOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDeleteBikeMutation } from "../../redux/features/bike/bikeApi";
import { useState } from "react";

const { Meta } = Card;

export default function ProductCard({
  bike,
  onSellClick,
  onCheckboxChange,
}: any) {
  const [isChecked, setChecked] = useState(false);
  const [deleteBike, { isSuccess }] = useDeleteBikeMutation();
  const { name, image, price, _id, quantity, model } = bike;

  const handleSellClick = () => {
    onSellClick(bike);
  };

  const handleCheckboxChange = (checked: boolean) => {
    console.log(checked, "checked");
    setChecked(checked);
    onCheckboxChange(bike._id, checked);
  };

  if (isSuccess) {
    <p>Bike is Deleted Successfully</p>;
  }

  return (
    <Card
      style={{ width: "100%" }}
      cover={<img alt={name} src={image} />}
      actions={[
        <Button size="small" type="primary" onClick={handleSellClick}>
          {" "}
          Sell
          <ShoppingCartOutlined key="cart" style={{ color: "white" }} />
        </Button>,
        <NavLink to={`/user/${bike._id}/edit-product`}>
          {" "}
          <Button size="small">
            Edit
            <EditOutlined key="edit" style={{ color: "green" }} />
          </Button>
        </NavLink>,
        <Button size="small" onClick={() => deleteBike(_id)}>
          Delete
          <DeleteOutlined key="delete" style={{ color: "red" }} />
        </Button>,
        <Button size="small">
          <Checkbox
            checked={isChecked}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
          >
            Select
          </Checkbox>
        </Button>,
        <Checkbox
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        />,
      ]}
    >
      <Meta title={` ${name}`} description={`Price: ${price}`} />
      <div className="additional">
        <p className="model">Model: {model}</p>
        <p className="price">Stoke Available: {quantity}</p>
      </div>
    </Card>
  );
}
