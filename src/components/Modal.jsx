import { Modal } from "antd";



function Modals({ isOpen, onClose, children, title = "Create New Product" }) {
  return (
    <Modal
      title={title}
      centered
      open={isOpen}      
      onCancel={onClose}   
      footer={null}       
      destroyOnClose     
      width={800}          
    >
      {children}
    </Modal>
  );
}

export default Modals;

