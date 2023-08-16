import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pfmApi = createApi({
  reducerPath: "pfmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pfm-api.vercel.app/api/pfm", // "http://localhost:5001/api/pfm",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.token;
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ["dashboard", "records", "transactions", "users"],
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
    getUsersById: builder.query({
      query: ({ user_id }) => ({
        url: `/user/${user_id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    addNewUserRecord: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        body: { ...userData },
      }),
      invalidatesTags: ["users"],
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "/user/login",
        method: "POST",
        body: loginData,
      }),
    }),
    logout: builder.mutation({
      query: (user) => ({
        url: "/user/logout",
        method: "POST",
        body: { ...user },
      }),
    }),
    isUserLoggedIn: builder.mutation({
      query: (user) => ({
        url: "/user/userloggedin",
        method: "POST",
        body: { user },
      }),
    }),
    checkEmailIsAvailable: builder.mutation({
      query: (email) => ({
        url: `/user/checkEmailAvailability`,
        method: "POST",
        body: { email },
      }),
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
  useGetUsersByIdQuery,
  useAddNewUserRecordMutation,
  useLoginMutation,
  useLogoutMutation,
  useIsUserLoggedInMutation,
  useCheckEmailIsAvailableMutation,
} = pfmApi;
