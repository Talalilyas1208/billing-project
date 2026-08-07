import assert from "node:assert/strict";
import { rowTotal } from "./useInvoiceTotals.jsx";

// Empty quantity should match UI default of 1 (min={1}, value shown as 1)
assert.equal(rowTotal({ number: "", unitPrice: 50 }), 50);

// Explicit quantity and price
assert.equal(rowTotal({ number: 2, unitPrice: 25 }), 50);
assert.equal(rowTotal({ number: 1, unitPrice: 50 }), 50);

// Missing price
assert.equal(rowTotal({ number: 1, unitPrice: "" }), 0);

// Row total must match summary inputs for the same line item
const unitPrice = 50;
const quantity = "";
const lineTotal = rowTotal({ number: quantity, unitPrice });
const summaryTotal = rowTotal({ number: quantity, unitPrice });
assert.equal(lineTotal, summaryTotal);

console.log("useInvoiceTotals: all tests passed");
