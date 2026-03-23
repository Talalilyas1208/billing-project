import Button from "../components/Button";

import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
export default function EmptyInvoicePage() {
  const navigate = useNavigate()
  const handleclick = () => {
    navigate("/dashboard/invoices/new");
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ width: "100%", height: "100vh" }}
      >
        <Button
          onClick={handleclick}
          style={{ width: "100%", height: "100vh" }}
        >
          create product{" "}
        </Button>
      </Flex>
    </>
  );
}
