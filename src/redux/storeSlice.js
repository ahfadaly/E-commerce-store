import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  usrInfo: [],
};

export const storeSlice = createSlice({
  name: "store",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      toast.success("puoduct added successfully", {
        position: "bottom-left",
        theme: "dark",
        autoClose: 3000,
      });
    },
    incrimentQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },
    dencrimentQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, deleteItem, clearCart, incrimentQuantity, dencrimentQuantity } = storeSlice.actions;
export default storeSlice.reducer;
