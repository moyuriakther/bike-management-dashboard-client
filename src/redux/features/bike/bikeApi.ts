import { TQueryParam, TResponseRedux } from "../../../types/global";
import { apiSlice } from "../api/apiSlice";

export const bikeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: (args) => {
        // console.log(args);
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/bikes",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ["Bikes"],
    }),
    addNewBike: builder.mutation({
      query: (data) => ({
        url: "/bikes/add-new-bike",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bikes"],
    }),
    getSingleBike: builder.query({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
    }),
    updateBike: builder.mutation({
      query: ({ bikeId, data }) => (
        console.log(data, bikeId),
        {
          url: `/bikes/${bikeId}`,
          method: "PATCH",
          body: data,
        }
      ),
      invalidatesTags: ["Bikes"],
    }),
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bikes"],
    }),
    bikesBulkDelete: builder.mutation({
      query: (bikeIds) => (
        console.log(bikeIds),
        {
          url: `/bikes/bulk-delete/id=${bikeIds[0]}`,
          method: "DELETE",
          body: bikeIds,
        }
      ),
      invalidatesTags: ["Bikes"],
    }),
  }),
});

export const {
  useAddNewBikeMutation,
  useGetAllBikesQuery,
  useGetSingleBikeQuery,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
  useBikesBulkDeleteMutation,
} = bikeApi;
