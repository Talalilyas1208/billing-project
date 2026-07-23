import { useState } from "react";
import { Row, Col, Form, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import Modals from "../components/Modal";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";
import NewCustomers from "../components/NewCustomers/NewCustomers";
import Invoicecol from "../components/ui/Invoicecol";
import useConfirmNavigation from "../hooks/useConfirmNavigation";
import InvoiceHeader from "../components/InvoiceHeader";
import CustomerSelect from "../components/CustomerSelect";
import InvoiceItemsTable from "../components/InvoiceItemsTable";
import usefetch from "../hooks/Usefetch";

export default function Newinvoice() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [statetouch, settouch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [items, setItems] = useState([
    {
      id: 1,
      product: "",
      description: "",
      number: "",
      unitPrice: "",
    },
  ]);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    data: Customer,
    loading: CustomerLoading,
    refetch: refetchCustomers,
  } = usefetch(`/api/Customer?search=${searchText}`);

  const confirmNavigation = useConfirmNavigation(statetouch);

  const handleOpen = () => {
    setIsOpen(true);
    setSelectOpen(false);
  };

  const handleclose = () => {
    setIsOpen(false);
    settouch(false);
  };

  const handleBack = () => {
    navigate("/dashboard/invoices");
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1,
        product: "",
        description: "",
        number: "",
        unitPrice: "",
      },
    ]);
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFieldChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const moveItem = (index, direction) => {
    setItems((prev) => {
      const target = index + direction;

      if (target < 0 || target >= prev.length) {
        return prev;
      }

      const updated = [...prev];

      [updated[index], updated[target]] = [updated[target], updated[index]];

      return updated;
    });
  };

  return (
    <Config>
      <InvoiceHeader onBack={handleBack} />

      <Modals
        isOpen={isOpen}
        onClose={handleclose}
        onCancel={() => confirmNavigation(handleclose)}
        destroyOnHidden
        rest={{
          okText: "Done",
          style: {
            width: 900,
            top: 170,
            title: "Create New Customer",
          },
        }}
      >
        <NewCustomers
          refetchCustomers={refetchCustomers}
          onClose={handleclose}
          onTouch={() => settouch(true)}
          form={form}
        />
      </Modals>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CardComponent
            style={{
              width: "100%",
              borderRadius: "10px",
              borderColor: "#b9adadff",
            }}
          >
            <Row gutter={[24, 16]} justify="space-between">
              <Col xs={24} sm={12} md={10} lg={8}>
                <Row gutter={[0, 16]}>
                  <Col span={20}>
                    <CustomerSelect
                      open={selectOpen}
                      onOpenChange={setSelectOpen}
                      onCreateNew={handleOpen}
                      // Pass the customer data
                      customers={Customer?.data || []}
                      // Pass loading
                      loading={CustomerLoading}
                    />
                  </Col>

                  <Invoicecol />
                  <Invoicecol />
                </Row>
              </Col>

              <Col xs={24} sm={12} md={10} lg={8}>
                <Row gutter={[0, 16]}>
                  <Col span={20}>
                    <DatePicker
                      onChange={onChange}
                      format={{
                        format: "YYYY-MM-DD ",
                        type: "mask",
                      }}
                      size="large" 
                      defaultValue={dayjs()}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <InvoiceItemsTable
              items={items}
              onFieldChange={handleFieldChange}
              onDeleteItem={handleDeleteItem}
              onMoveItem={moveItem}
              onAddItem={handleAddItem}
            />
          </CardComponent>
        </Col>
      </Row>
    </Config>
  );
}
