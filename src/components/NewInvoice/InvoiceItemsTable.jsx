import { useMemo, useEffect, useState } from "react";
import { Row, Col, Space, Typography, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Table from "../Table";
import Button from "../Button";
import { useGetProductsQuery } from "../../store/blackListApi";
import AddProductModal from "../Product/AddProductModal";
import InvoiceSummary from "./InvoiceSummary";
import { getInvoiceItemsColumns } from "./InvoiceItemsTableColumns";
const { Text } = Typography;

export default function InvoiceItemsTable({
  items,
  onFieldChange,
  onDeleteItem,
  onMoveItem,
  onAddItem,
}) {
  const { data: productsdata, refetch: refetchProducts } = useGetProductsQuery({ limit: 10 });

  const productList = productsdata?.data || [];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [pendingRowId, setPendingRowId] = useState(null);

  const productOptions = useMemo(
    () =>
      productList.map((p) => ({
        label: p.productname,
        value: p.id,
      })),
    [productList],
  );

  const totalExcludingVat = items.reduce(
  (sum, item) => sum + Number(item.number || 1) * Number(item.unitPrice || 0),
  0,
);

const vatRate = 0.10; 
const vat = totalExcludingVat * vatRate;
const totalIncludingVat = totalExcludingVat + vat;

  const applyProduct = (recordId, selectedProduct) => {
    onFieldChange(recordId, "product", selectedProduct.id);
    onFieldChange(recordId, "description", selectedProduct.description || "");
    onFieldChange(recordId, "unitPrice", selectedProduct.price ?? "");
  };

  const handleProductChange = (recordId, productId) => {
    const selectedProduct = productList.find((p) => p.id === productId);
    onFieldChange(recordId, "product", productId);

    if (selectedProduct) {
      applyProduct(recordId, selectedProduct);
    }
  };

  const handleCreateNew = (recordId) => {
    setPendingRowId(recordId);
    setAddModalOpen(true);
  };

  const handleProductCreated = async (newProduct) => {
    if (typeof refetchProducts === "function") {
      await refetchProducts();
    }

    if (pendingRowId != null && newProduct) {
      applyProduct(pendingRowId, newProduct);
    }

    setPendingRowId(null);
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
    setPendingRowId(null);
  };

  useEffect(() => {
    if (!Array.isArray(items) || items.length === 0) {
      return;
    }

    items.forEach((item) => {
      const total = Number(item.number || 0) * Number(item.unitPrice || 0);
      const normalizedTotal = Number.isFinite(total) ? total : 0;

      if (Number(item.total || 0) !== normalizedTotal) {
        onFieldChange(item.id, "total", normalizedTotal);
      }
    });
  }, [items, onFieldChange]);

  const grandTotal = items.reduce(
    (sum, item) =>
      sum + Number(item.number || 1) * Number(item.unitPrice || 0),
    0,
  );

  const hasProduct = items.some((item) => item.product);

  const columns = getInvoiceItemsColumns({
    items,
    productOptions,
    onMoveItem,
    onProductChange: handleProductChange,
    onCreateNew: handleCreateNew,
    onDescriptionChange: (recordId, value) => onFieldChange(recordId, "description", value),
    onNumberChange: (recordId, value) => onFieldChange(recordId, "number", value),
    onUnitPriceChange: (recordId, value) => onFieldChange(recordId, "unitPrice", value),
    onDeleteItem,
  });

  return (
    <>
      <Table
        columns={columns}
        data={items}
        rowKey="id"
        pagination={false}
        bordered={true}
        scroll={{ x: "max-content" }}
        style={{ padding: "0 8px" }}
      />
      <Row style={{ padding: "16px 8px 0 8px" }}>
        <Col span={1}>
          <Button
            type="text"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddItem}
            block
          />
        </Col>
        <Col span={1} />
      </Row>
      {hasProduct && (
        <Row justify="end" style={{ padding: "16px 8px 0 8px" }}>
          <Col>
            <Space size={12}>
              <Text strong>Grand Total:</Text>
              <Text strong>{grandTotal.toFixed(2)}</Text>
            </Space>
          </Col>
        </Row>
      )}

      <AddProductModal
        open={addModalOpen}
        onClose={handleModalClose}
refetchProducts={refetchProducts}
        onCreated={handleProductCreated}
      />
      <InvoiceSummary
        vatFreeAmount={0}
        taxableAmount={0}
        totalExcludingVat={totalExcludingVat}
        vat={vat}
        totalIncludingVat={totalIncludingVat}
        priceMode={"excl"}
        paymentMethods={["Bank"]}
        design={"standard"}
        onDesignChange={() => {}}
      />

      <Divider/>
    </>
  );
}