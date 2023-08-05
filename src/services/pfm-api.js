import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pfmApi = createApi({
  reducerPath: "pfmApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api/pfm" }),
  tagTypes: ["dashboard", "records", "transactions"],
  endpoints: (builder) => ({
    dashboardData: builder.query({
      query: ({ user_id }) => ({ url: `/dashboard/${user_id}`, method: "GET" }), // This is /dashboard/userid
      providesTags: ["dashboard"],
    }),
    newDashboardData: builder.mutation({
      query: ({ user_id, ...rest }) => ({
        url: `/dashboard/${user_id}`,
        method: "POST",
        body: { user_id, ...rest },
      }),
      invalidatesTags: ["dashboard"],
    }),
    updateDashboardData: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/dashboard/${_id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: ["dashboard"],
    }),
    getRecords: builder.query({
      query: ({ user_id }) => ({ url: `/record/${user_id}`, method: "GET" }), // This is GET /record/userid
      providesTags: ["records"],
    }),
    addRecords: builder.mutation({
      query: ({ user_id, ...rest }) => ({
        url: `/record/${user_id}`,
        method: "POST",
        body: { user_id, ...rest },
      }),
      invalidatesTags: ["records"],
    }),
    editRecords: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/record/${_id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: ["records"],
    }),
    deleteRecords: builder.mutation({
      query: ({ _id }) => ({
        url: `/record/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["records"],
    }),
    getTransaction: builder.query({
      query: ({ user_id }) => ({
        url: `/transactions/${user_id}`,
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
    addTransaction: builder.mutation({
      query: ({ user_id, ...rest }) => ({
        url: `/transactions/${user_id}`,
        method: "POST",
        body: { user_id, ...rest },
      }),
      invalidatesTags: ["transactions", "dashboard"],
    }),
  }),
});

export const {
  useDashboardDataQuery,
  useUpdateDashboardDataMutation,
  useNewDashboardDataMutation,
  useGetRecordsQuery,
  useAddRecordsMutation,
  useEditRecordsMutation,
  useDeleteRecordsMutation,
  useGetTransactionQuery,
  useAddTransactionMutation,
} = pfmApi;
