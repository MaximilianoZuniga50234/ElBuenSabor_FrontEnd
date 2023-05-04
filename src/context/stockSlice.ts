import { createSlice } from "@reduxjs/toolkit";
import { Stock } from "../interface/Stock";

const initialState = [] as Stock[];

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStock: (state, action) => {
      const newStock = action.payload;
      if (state.length === 0) newStock.map((n: Stock) => state.push(n));
    },
    addStock: (state, action) => {
      state.push(action.payload);
      console.log(state);
    },
    changeDeAlta: (state, action) => {
      const stockFound = state.find((stock) => stock.id === action.payload.id);
      if (stockFound) {
        stockFound.deAlta
          ? (stockFound.deAlta = false)
          : (stockFound.deAlta = true);
        state[state.indexOf(stockFound)] = stockFound;
      }
    },
  },
});

export const { addStock, changeDeAlta, setStock } = stockSlice.actions;
export default stockSlice.reducer;
