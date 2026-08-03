export function rowTotal({ number = 0, unitPrice = 0 }) {
  return Number(number || 0) * Number(unitPrice || 0);
}
