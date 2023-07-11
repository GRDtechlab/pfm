import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pfmApi = createApi({
  reducerPath: "pfmApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api/pfm" }),
  tagTypes: ["dashboard"],
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
  }),
});

export const {
  useDashboardDataQuery,
  useUpdateDashboardDataMutation,
  useNewDashboardDataMutation,
} = pfmApi;
