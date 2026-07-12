// hooks/useConfirmNavigation.js
import { App } from "antd";

export default function useConfirmNavigation(isTouched) {
  const { modal } = App.useApp();

  const confirmNavigation = (onConfirm, options = {}) => {
    const touched =
      typeof isTouched === "function" ? isTouched() : isTouched;

    if (!touched) {
      onConfirm();
      return;
    }
    modal.confirm({
      title: options.title || "Confirm navigation",
      style: { top: 300 },
      content:
        options.content ||
        "Your changes have not been saved yet. Are you sure you want to leave this page?",
      okText: options.okText || "Leave this page",
      okType: options.okType || "danger",
      cancelText: options.cancelText || "No, stay",
      width: options.width || "40%",
      onOk() {
        onConfirm();
      },
    });
  };

  return confirmNavigation;
}