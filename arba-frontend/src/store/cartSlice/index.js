import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
  },
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
  },
});

export const { setCarts } = cartSlice.actions;

export default cartSlice.reducer;
