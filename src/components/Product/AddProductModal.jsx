import { Modal, Form } from "antd";
import MangeProductForm from "../pages/MangeProductForm";

export default function AddProductModal({ open, onClose, onCreated }) {
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Product"
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
      width={760}
    >
      <MangeProductForm
        form={form}
        onClose={handleClose}
        onSuccess={onCreated}
      />
    </Modal>
  );
}
