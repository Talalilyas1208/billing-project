import { memo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "../Button";

function RowActionsCell({ onDelete }) {
  return <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />;
}

export default memo(RowActionsCell);
