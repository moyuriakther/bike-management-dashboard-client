import { createSlice } from "@reduxjs/toolkit";

// interface FilterState {
//   search: string;
//   price: { min: number; max: number };
//   releaseDate: Date | null;
//   brand: string;
//   model: string;
//   type: string;
//   size: string;
//   color: string;
//   // Add types for other filter criteria
// }

const initialState: any = {
  search: "",
  price: { min: 0, max: 1000 },
  releaseDate: null,
  brand: "",
  model: "",
  type: "",
  size: "",
  color: "",
  minPrice: 0,
  maxPrice: 100000,
  // Add initial values for other filter criteria
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      //   console.log(action.payload);
      return { ...state, ...action.payload };
    },
    setPriceRange(state, action) {
      // console.log(action.payload, state.minPrice, state.maxPrice);
      const { minPrice, maxPrice } = action.payload;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    },
    // Add other filter actions with appropriate types
  },
});

export const { setFilter, setPriceRange } = filterSlice.actions;
export const selectFilter = (state: { filter: any }) => state.filter;
export default filterSlice.reducer;
