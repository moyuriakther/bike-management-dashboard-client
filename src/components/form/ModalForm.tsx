/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import BMForm from "./BMForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BMInput from "./BMInput";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { useSellProductMutation } from "../../redux/features/sell/sellApi";
import { toast } from "sonner";

type Inputs = {
  quantity: string;
  buyerName: string;
  date: string;
};

const ModalForm = ({ isVisible, onClose, bike }: any) => {
  const [sellProduct, { isSuccess }] = useSellProductMutation();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 3000);
  };

  const handleCancel = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    const sell = {
      bike: bike._id,
      quantity: data?.quantity,
      buyerName: data?.buyerName,
      saleDate: convertDateFormat(data?.saleDate),
    };
    const availableQuantity = bike.quantity;

    if (sell.quantity > availableQuantity) {
      toast.warning("You cannot sell more than the available quantity.");
      return;
    }

    const toastId = toast.loading("Sell Processing..");

    try {
      await sellProduct(sell).unwrap();
      toast.loading("Product Sell Successfully Done", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("You cannot sell more than the available quantity.", {
        id: toastId,
        duration: 2000,
      });
    }
    // onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <>
      <Modal
        open={isVisible}
        title="SELL PRODUCT"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Card
          style={{
            width: 300,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BMForm onSubmit={onSubmit}>
            <BMInput type="text" name="quantity" label="Quantity" />
            <BMInput type="text" name="buyerName" label="Buyer Name" />
            <BMInput type="text" name="saleDate" label="Sale Date" />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                PLACE SELL
              </Button>
            </Form.Item>
          </BMForm>
        </Card>
      </Modal>
    </>
  );
};

export default ModalForm;
