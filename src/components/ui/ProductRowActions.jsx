import { DeleteOutlined } from "@ant-design/icons";
import { memo } from "react";
import Button from "../Button";

function ProductRowActions({ onDelete }) {
  return <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />;
}

export default memo(ProductRowActions);
