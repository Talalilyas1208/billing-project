import Select from "../Select";

export default function Payementdeadline({
  open,
  onOpenChange,
  customers = [],
  loading,
}) {
  const fallbackCustomers = [
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days" },
    { value: "30", label: "30 days" },
  ];

  const normalizedCustomers = customers?.length ? customers : fallbackCustomers;

  const payementOptions = normalizedCustomers.map((item) => {
    const value = item.value ?? item.id ?? item._id ?? item.days ?? item.day ?? item.code;
    const label =
      item.label ??
      item.name ??
      item.title ??
      item.text ??
      (item.days != null ? `${item.days} days` : item.paymentDeadline ?? item.payment_deadline);

    return {
      value: value ?? "",
      label: label ?? "",
    };
  });

  return (
    <Select
      style={{ width: "100%" }}
      antUI={{ size: "large" }}
      placeholder="Select payment deadline"
      open={open}
      loading={loading}
      options={payementOptions.filter((option) => option.value !== "" && option.label !== "")}
      onOpenChange={onOpenChange}
      showSearch
    />
  );
}