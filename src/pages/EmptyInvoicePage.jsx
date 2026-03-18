import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";
export default function EmptyInvoicePage() {
  const navigate = useNavigate;
  const handleclick = () => {
    navigate("/NEW");
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
