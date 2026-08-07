export function rowTotal({ number = 1, unitPrice = 0 }) {
  const quantity = Number(number || 1);
  const price = Number(unitPrice || 0);
  const total = quantity * price;
  return Number.isFinite(total) ? total : 0;
}
