import { Modal, Form } from "antd";
import { useState } from "react";
import MangeProductForm from "../pages/MangeProductForm";
import useConfirmNavigation from "../../hooks/useConfirmNavigation";

export default function AddProductModal({ open, onClose, onCreated }) {
  const [form] = Form.useForm();
  const [statetouch, settouch] = useState(false);
  const confirmNavigation = useConfirmNavigation(statetouch);

  const handleClose = () => {
    form.resetFields();
    settouch(false);
    onClose();
  };

  return (
    <Modal
      title="Add New Product"
      open={open}
      onCancel={() => confirmNavigation(handleClose)}
      footer={null}
      destroyOnClose
      width={760}
    >
      <MangeProductForm
        form={form}
        onClose={handleClose}
        onSuccess={onCreated}
        onTouch={() => settouch(true)}
      />
    </Modal>
  );
}