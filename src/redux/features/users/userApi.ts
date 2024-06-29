import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => (
        console.log(),
        {
          url: `/users`,
          method: "GET",
        }
      ),
      providesTags: ["Sells", "Bikes"],
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
