import { Popover } from "antd";

export default function DropDowns(props) {
  const {
    trigger,
    children,
    className = "",
    variant = "popover", 
    isOpen = false,
    onToggle,
    closeOnOutsideClick = true,
    placement = "topLeft",
    width = 224,
    ...rest
  } = props;

  const handleToggle = () => {
    onToggle?.(!isOpen);
  };

  const menu = (
    <div
      style={{ width }}
      className="p-2 space-y-2 bg-white rounded-xl shadow-2xl"
    >
      {children}
    </div>
  );

  if (variant === "sidebar") {
    return (
      <div className={`relative w-full ${className}`} {...rest}>
        <div
          onClick={handleToggle}
          className="cursor-pointer"
        >
          {trigger}
        </div>

        {isOpen && (
          <div className="relative w-full mt-1">
            {menu}
          </div>
        )}
      </div>
    );
  }

  // POPOVER VARIANT
  return (
    <Popover
      open={isOpen}
      trigger="click"
      placement={placement}
      onOpenChange={(open) => {
        if (closeOnOutsideClick) {
          onToggle?.(open);
        }
      }}
      content={menu}
    >
      <div
        className={`cursor-pointer ${className}`}
        onClick={handleToggle}
        {...rest}
      >
        {trigger}
      </div>
    </Popover>
  );
}