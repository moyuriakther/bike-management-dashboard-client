import { Form, Button, Card } from "antd";
import BMInput from "../components/form/BMInput";
import BMForm from "../components/form/BMForm";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
};

export default function Registration() {
  const [register, { isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    const toastId = toast.loading("Processing..");
    try {
      const result = await register(data).unwrap();
      toast.loading(result?.message, {
        id: toastId,
        duration: 2000,
      });
      navigate(`/login`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  if (isSuccess) {
    <p>User Created successfully</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        title="Create New Account"
        style={{ width: 300, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <BMForm onSubmit={onSubmit}>
          <BMInput type="text" name="name" label="NAME" />
          <BMInput type="email" name="email" label="EMAIL" />
          <BMInput type="password" name="password" label="PASSWORD" />
          <BMInput type="text" name="contactNumber" label="CONTACT NUMBER" />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
        </BMForm>
        <NavLink to="/login" style={{ textDecoration: "underline" }}>
          Login With Email & Password
        </NavLink>
      </Card>
    </div>
  );
}
