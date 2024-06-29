// import { useState } from "react";

import { Button, Card, Form } from "antd";
import BMForm from "../../components/form/BMForm";
import BMInput from "../../components/form/BMInput";
import { useAddNewBikeMutation } from "../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
// import BMDatePicker from "../../components/form/BMDatePicker";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

type Inputs = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  type: string;
  size: string;
  color: string;
  frameMaterial: string;
  suspension: string;
  image?: string;
};

const AddProduct = () => {
  const [addNewBike, { isSuccess, isError }] = useAddNewBikeMutation();
  const navigate = useNavigate();
  // const [imgUrl, setImgUrl] = useState("");
  // const uploadImageToImgBB = async (imageFile) => {
  //   const data = new FormData();
  //   data.append("image", imageFile); // Assuming 'image' is a file input
  //   // data.append("upload_preset", "dcib8lula"); // Assuming 'image' is a file input
  //   data.append("upload_preset", "bikeManage"); // Assuming 'image' is a file input
  //   // data.append("cloud_name", "bikeManage"); // Assuming 'image' is a file input
  //   data.append("cloud_name", "dcib8lula"); // Assuming 'image' is a file input
  //   // const cloudName = "dcib8lula";
  //   // const publicId = "bikeManage";
  //   // const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;

  //   fetch("https://api.cloudinary.com/v1_1/bikeManage/image/upload", {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    const toastId = toast.loading("Adding..");

    console.log(data);

    const newBikeInfo = {
      name: data.name,
      price: Number(data.price),
      quantity: Number(data.quantity),
      releaseDate: data.releaseDate,
      brand: data.brand,
      model: data.model,
      type: data.type,
      size: data.size,
      color: data.color,
      frameMaterial: data.frameMaterial,
      suspension: data.suspension,
      image: data.image,
    };
    console.log({ newBikeInfo });

    await addNewBike(newBikeInfo).unwrap();
    toast.loading("New Bike Added Successfully", {
      id: toastId,
      duration: 2000,
    });
    navigate("/user/all-bikes");
  };
  if (isError) {
    toast.error("Cant submit empty form");
  }
  if (isSuccess) {
    <p>Bike Added Successfully</p>;
  }

  return (
    <>
      <div>
        <Card
          title="ADD NEW PRODUCT"
          style={{
            maxWidth: "1200px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BMForm onSubmit={onSubmit}>
            <BMInput type="text" name="name" label="NAME" />
            <BMInput type="number" name="price" label="PRICE" />
            <BMInput type="number" name="quantity" label="QUANTITY" />
            <BMInput type="text" name="releaseDate" label="RELEASE DATE" />
            {/* <BMDatePicker type="text" name="releaseDate" label="RELEASE DATE" /> */}
            <BMInput type="text" name="brand" label="BRAND" />
            <BMInput type="text" name="model" label="MODEL" />
            <BMInput type="text" name="type" label="TYPE" />
            <BMInput type="text" name="size" label="SIZE" />
            <BMInput type="text" name="color" label="COLOR" />
            <BMInput type="text" name="frameMaterial" label="FRAME MATERIAL" />
            <BMInput type="text" name="suspension" label="SUSPENSION" />
            <BMInput type="text" name="image" label="IMAGE LINK" />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                ADD PRODUCT
              </Button>
            </Form.Item>
          </BMForm>
        </Card>
      </div>
    </>
  );
};
export default AddProduct;
