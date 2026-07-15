import { Modal } from "antd";

function Modals(props) {
  const { isOpen, children, onCancel, footer, rest  , destroyOnHidden} = props;
  const { style = {}, styles = {}, ...otherRest } = rest || {};
  const { title, width, ...cssStyle } = style;

  const mergedStyles = {
    ...styles,
    body: {
      maxHeight: "60vh",
      overflowY: "auto",
      ...styles.body,
    },
  };

  return (
    <Modal
      open={isOpen}
      title={title}
       destroyOnHidden 
      width={width}
      styles={mergedStyles}
      onCancel={onCancel}
      footer={footer || null}
      style={cssStyle}
      {...otherRest}
    >
      {children}
    </Modal>
  );
}

export default Modals;