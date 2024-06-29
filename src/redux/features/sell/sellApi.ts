import { apiSlice } from "../api/apiSlice";

export const sellApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellHistory: builder.query({
      query: (search) => ({
        url: `/sale/sales-history?saleDate=${search}`,
        method: "GET",
      }),
      providesTags: ["Sells", "Bikes"],
    }),
    sellProduct: builder.mutation({
      query: (data) => ({
        url: "/sale",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sells", "Bikes"],
    }),
  }),
});

export const { useSellProductMutation, useGetSellHistoryQuery } = sellApi;
