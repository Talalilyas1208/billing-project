import { Modal } from "antd";

function Modals(props) {
  const { isOpen, children, style, alert, footer } = props;

  return (
    <Modal
      open={isOpen}
      styles={{
        body: {
          maxHeight: "60vh",
          overflowY: "auto",
        },
      }}
      onCancel={alert}
      footer={footer || null}
      {...style}
    >
      {children}
    </Modal>
  );
}

export default Modals;
