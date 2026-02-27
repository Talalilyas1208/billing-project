function Modal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-start justify-start bg-black/50 p-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
      className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-xl mx-auto"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;