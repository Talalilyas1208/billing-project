import { Modal } from "antd";

function Modals(props) {
  const { isOpen, children, style, alert, footer } = props;
  const { width, top, title, height } = style;

  return (
    <Modal
      title={title}
      open={isOpen}
      styles={{
        body: {
          maxHeight: "60vh",
          overflowY: "auto",
        },
      }}
      height={height}
      onCancel={alert}
      footer={footer || null}
      width={width}
      style={{ top }}
    >
      {children}
    </Modal>
  );
}

export default Modals;