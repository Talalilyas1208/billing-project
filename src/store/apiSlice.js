import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: [
    "Customer",
    "Products",
    "Sidebar",
    "Currency",
    "Revenue",
    "FieldType",
    "Language",
    "Vat",
    "PaymentDeadline",
    "PriceModeOptions",
    "DesignOptions"
  ],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: ({ search = "", page = 1, limit = 10 } = {}) =>
        `/api/customer?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Customer", id: "LIST" },
              ...result.data.map((item) => ({ type: "Customer", id: item.id })),
            ]
          : [{ type: "Customer", id: "LIST" }],
    }),
    addCustomer: builder.mutation({
      query: (customer) => ({
        url: "/api/customer",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
    getProducts: builder.query({
      query: ({ search = "", page = 1, limit = 10 } = {}) =>
        `/api/products?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
      refetchOnMountOrArgChange: false,
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Products", id: "LIST" },
              ...result.data.map((item) => ({ type: "Products", id: item.id })),
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    getSidebar: builder.query({
      query: () => "/api/sidebar",
      providesTags: [{ type: "Sidebar", id: "LIST" }],
    }),
    getCurrencies: builder.query({
      query: ({ limit = 0 } = {}) =>
        limit ? `/api/currency?limit=${limit}` : "/api/currency",
      providesTags: [{ type: "Currency", id: "LIST" }],
    }),
    getRevenueCategories: builder.query({
      query: () => "/api/revnue",
      providesTags: [{ type: "Revenue", id: "LIST" }],
    }),
    getFieldTypeOptions: builder.query({
      query: () => "/api/labelforfield",
      providesTags: [{ type: "FieldType", id: "LIST" }],
    }),
    getLanguages: builder.query({
      query: () => "/api/Language",
      providesTags: [{ type: "Language", id: "LIST" }],
    }),
    getVat: builder.query({
      query: () => "/api/vat",
      providesTags: [{ type: "Vat", id: "LIST" }],
    }),
    getPaymentDeadlines: builder.query({
      query: () => "/api/paymentdeadline",
      providesTags: [{ type: "PaymentDeadline", id: "LIST" }],
    }),
    getPriceModeOptions: builder.query({
      query: () => "/api/priceModeOptions",
      providesTags: [{ type: "PaymentDeadline", id: "LIST" }],
    }),
    getDesignOptions: builder.query({
      query: () => "/api/designOptions",
      providesTags: [{ type: "PaymentDeadline", id: "LIST" }],
    }),

    deleteColumn: builder.mutation({
      query: (id) => ({
        url: `/api/columns/${id}`,
        method: "DELETE",
      }),
    
      invalidatesTags: [{ type: "Columns", id: "LIST" }],
    }),
  }),
});


export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSidebarQuery,
  useGetCurrenciesQuery,
  useGetRevenueCategoriesQuery,
  useGetFieldTypeOptionsQuery,
  useGetLanguagesQuery,
  useGetVatQuery,
  useGetPaymentDeadlinesQuery,
  useGetPriceModeOptionsQuery,
  useGetDesignOptionsQuery,
  useDeleteColumnMutation, 
} = api;
