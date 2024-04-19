import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import cartSlice from "./cartSlice";

const rootReducer = combineReducers({
  user: userSlice,
  products: productSlice,
  categories: categorySlice,
  carts: cartSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
