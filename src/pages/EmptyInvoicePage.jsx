import Button from "../components/Button";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";

export default function EmptyInvoicePage() {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/dashboard/invoices/new");
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", height: "100vh" }}
    >
      <Button
        onClick={handleclick}
        icon={<PlusCircleFilled />}
        antUI={{ size: "large" }}
        style={{ backgroundColor: "#000", color: "#fff", borderRadius: "9999px" }}>
        Create product
      </Button>
    </Flex>
  );
}