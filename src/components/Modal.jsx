import { Modal } from "antd";

const { confirm } = Modal;

function Modals(props) {
  const { isOpen, onClose, children, style, form } = props;
  const { width, top, title } = style;
  const handleCloseAndReset = () => {
    onClose();
    if (form) {
      form.resetFields();
    }
  };
  const alert = () => {
    if (!form?.isFieldsTouched()) {
      handleCloseAndReset();
      return;
    }
    confirm({
      title: "Confirm navigation",
      style: { top: 300 },
      content:
        "Your changes have not been saved yet. Are you sure you want to leave this page?",
      okText: "Leave this page",
      okType: "danger",
      cancelText: "No, stay",
      width: "40%",
      onOk() {
        handleCloseAndReset();
      },
    });
  };
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={alert}
      footer={null}
      width={width}
      style={{ top }}>
      {children}
    </Modal>
  );
}

export default Modals;
