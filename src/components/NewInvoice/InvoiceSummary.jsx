import { useEffect, useMemo, useState } from "react";
import {
  useGetCurrenciesQuery,
  useGetDesignOptionsQuery,
  useGetPriceModeOptionsQuery,
} from "../../store/apiSlice";
import InvoiceSummaryDetails from "./InvoiceSummaryDetails";

export default function InvoiceSummary({
  vatFreeAmount = 0,
  taxableAmount = 0,
  totalExcludingVat = 0,
  vat = 0,
  totalIncludingVat = 0,
  priceMode,
  paymentMethods = [],
  design,
  onDesignChange,
}) {
  const [selectedCurrency, setSelectedCurrency] = useState("PKR");
  const { data: currencies, isLoading: currencyloading } = useGetCurrenciesQuery({ limit: 24 });
  const { data: priceModeOptionsData } = useGetPriceModeOptionsQuery();
  const { data: designOptionsData } = useGetDesignOptionsQuery();

  const normalizeOptions = (payload) => {
    if (Array.isArray(payload)) {
      return payload
        .map((item) => {
          if (item && typeof item === "object") {
            const rawValue = item.value ?? item.id ?? item.code ?? item.key ?? item.name ?? item.label ?? item.text ?? item.title ?? "";
            const rawLabel = item.label ?? item.name ?? item.title ?? item.text ?? "";

            return {
              label: rawLabel || rawValue || "",
              value: rawValue || "",
            };
          }

          return null;
        })
        .filter((option) => option && option.value && option.label);
    }

    if (payload && typeof payload === "object") {
      if (Array.isArray(payload.data)) {
        return normalizeOptions(payload.data);
      }

      if (Array.isArray(payload.options)) {
        return normalizeOptions(payload.options);
      }
    }

    return [];
  };

  const buildCurrencyOptions = (source) => {
    const items = Array.isArray(source?.data)
      ? source.data
      : Array.isArray(source)
        ? source
        : [];

    return items
      .map((item) => {
        const code = item?.code ?? item?.currencyCode ?? item?.value ?? item?.id ?? "";
        const normalizedCode = String(code || "").trim().toUpperCase();

        if (!normalizedCode) {
          return null;
        }

        return {
          label: normalizedCode,
          value: normalizedCode,
        };
      })
      .filter(Boolean);
  };

  const currencyOptions = useMemo(() => buildCurrencyOptions(currencies), [currencies]);
  const priceModeOptions = useMemo(() => normalizeOptions(priceModeOptionsData), [priceModeOptionsData]);
  const designOptions = useMemo(() => normalizeOptions(designOptionsData), [designOptionsData]);

  useEffect(() => {
    if (!currencyOptions.length) {
      return;
    }

    if (!currencyOptions.some((option) => option.value === selectedCurrency)) {
      setSelectedCurrency(currencyOptions[0]?.value || "PKR");
    }
  }, [currencyOptions, selectedCurrency]);

  return (
    <InvoiceSummaryDetails
      vatFreeAmount={vatFreeAmount}
      taxableAmount={taxableAmount}
      totalExcludingVat={totalExcludingVat}
      vat={vat}
      totalIncludingVat={totalIncludingVat}
      selectedCurrency={selectedCurrency}
      onCurrencyChange={setSelectedCurrency}
      currencyOptions={currencyOptions}
      priceMode={priceMode}
      priceModeOptions={priceModeOptions}
      design={design}
      designOptions={designOptions}
      onDesignChange={onDesignChange}
      paymentMethods={paymentMethods}
    />
  );
}
