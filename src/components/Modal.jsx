import { Modal } from "antd";

function Modals(props) {
  const { isOpen, children, style, alert } = props;
  const { width, top, title, height } = style;

  return (
    <Modal
      title={title}
      open={isOpen}
      height={height}
      onCancel={alert}
      footer={null}
      width={width}
      style={{ top }}
    >
      {children}
    </Modal>
  );
}

export default Modals;