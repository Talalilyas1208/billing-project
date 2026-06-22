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
    <>
      <Flex
        justify="center"
        align="center"
        style={{ width: "100%", height: "100vh" }}
      >
        <Button
          onClick={handleclick}
          antUI={"bg-black text-white py-4 px-8 rounded-full"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>create product</span>
        </Button>
      </Flex>
    </>
  );
}
