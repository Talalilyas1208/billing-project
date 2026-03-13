import React from "react";

export default function Table(props) {
  const {products} = props ;

  if (!products || products.length === 0) {
    return (
      <div className="mt-32 text-center">
        <p className="text-xl text-gray-400 font-medium">No product added</p>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50">
            <th className="px-6 py-4 w-1/2 text-left text-sm font-semibold text-gray-900">
              <div className="flex items-center gap-1">
                Name
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Account
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product, index) => (
            <tr key={product.id || index} className="group hover:bg-gray-50 transition-colors">
              <td className="px-6 py-5 text-left">
                <div className="text-sm font-medium text-gray-900">
                  {product.productname}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {product.productNumber}
                </div>
              </td>
              <td className="px-6 py-5 text-sm text-gray-600">
                {product.revenueCategory || "—"}
              </td>
              <td className="px-6 py-5 text-sm text-right text-gray-900 font-medium">
                {product.price} <span className="text-xs text-gray-400 font-normal">{product.currency}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}