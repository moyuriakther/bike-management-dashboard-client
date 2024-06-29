import { useEffect } from "react";
import { Button, Card, Form, Input } from "antd";
import {
  useGetSingleBikeQuery,
  useUpdateBikeMutation,
} from "../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { bikeId } = useParams();
  const { data } = useGetSingleBikeQuery(bikeId);
  const [updateBike, { isSuccess }] = useUpdateBikeMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        name: data.data.name,
        price: data.data.price,
        quantity: data.data.quantity,
        releaseDate: data.data.releaseDate,
        brand: data.data.brand,
        model: data.data.model,
        type: data.data.type,
        size: data.data.size,
        color: data.data.color,
        frameMaterial: data.data.frameMaterial,
        suspension: data.data.suspension,
        image: data.data.image,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    const toastId = toast.loading("Updating Bike Details..");
    //only changed values get for send server
    const changedValues = Object?.keys(values)?.reduce((acc: any, key) => {
      const formValue = form.getFieldValue(key);
      let newValue;
      if (key === "price" || key === "quantity") {
        newValue =
          formValue !== undefined && !isNaN(formValue)
            ? Number(formValue)
            : formValue;
      } else {
        newValue = formValue;
      }
      if (newValue !== undefined && newValue !== data?.data[key]) {
        acc[key] = newValue;
      }
      return acc;
    }, {});

    try {
      if (Object.keys(changedValues).length > 0) {
        await updateBike({
          bikeId,
          data: { ...changedValues },
        }).unwrap();
        toast.success("Bike Details Updated Successfully", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.info("No changes detected", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  const handleClick = () => {
    navigate("/user/all-bikes");
  };

  if (isSuccess) {
    <p>Bike Details Updated Successfully</p>;
  }

  return (
    <>
      <div>
        <Card
          title="UPDATE PRODUCT DETAILS"
          style={{
            maxWidth: "1200px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item label="NAME" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="PRICE" name="price">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="QUANTITY" name="quantity">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="RELEASE DATE" name="releaseDate">
              <Input />
            </Form.Item>
            <Form.Item label="BRAND" name="brand">
              <Input />
            </Form.Item>
            <Form.Item label="MODEL" name="model">
              <Input />
            </Form.Item>
            <Form.Item label="TYPE" name="type">
              <Input />
            </Form.Item>
            <Form.Item label="SIZE" name="size">
              <Input />
            </Form.Item>
            <Form.Item label="COLOR" name="color">
              <Input />
            </Form.Item>
            <Form.Item label="FRAME MATERIAL" name="frameMaterial">
              <Input />
            </Form.Item>
            <Form.Item label="SUSPENSION" name="suspension">
              <Input />
            </Form.Item>
            <Form.Item label="IMAGE" name="image">
              <Input />
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "40%" }}
                >
                  Update Product
                </Button>
                <Button
                  onClick={handleClick}
                  type="primary"
                  htmlType="submit"
                  style={{ width: "40%" }}
                >
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default UpdateProduct;
