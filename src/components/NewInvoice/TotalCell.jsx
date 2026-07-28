import { memo } from "react";
import { Typography } from "antd";
import { rowTotal } from "../hooks/useInvoiceTotals";

const { Text } = Typography;

function TotalCell({ number, unitPrice }) {
  const total = rowTotal({ number, unitPrice });
  return <Text>{total.toFixed(2)}</Text>;
}

export default memo(TotalCell);
