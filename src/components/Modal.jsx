import { Modal } from "antd";
import { App } from 'antd';
const { confirm } = Modal;

function Modals(props) {
  const { isOpen, onClose, children, style, form } = props;
  const { width, top, title, height } = style;
   const { modal } = App.useApp(); 
  const handleCloseAndReset = () => {
    onClose();
    if (form) {
      form.resetFields();
    }};
  const alert = () => {
    if (!form?.isFieldsTouched()) {
      handleCloseAndReset();
      return;}
    modal.confirm({
      title: "Confirm navigation",
      style: { top: 300 },
      content:"Your changes have not been saved yet. Are you sure you want to leave this page?",
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
      height={height}
      onCancel={alert}
      footer={null}
      width={width}
      style={{ top }}>
      {children}
    </Modal>
  );
}

export default Modals;
