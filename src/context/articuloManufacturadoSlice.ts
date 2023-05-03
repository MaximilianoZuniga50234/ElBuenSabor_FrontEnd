import { createSlice } from "@reduxjs/toolkit";
import { ArticuloManufacturado } from "../interface/ArticuloManufacturado";

const initialState = [] as ArticuloManufacturado[];

export const articuloManufacturadoSlice = createSlice({
  name: "ArticuloManufacturado",
  initialState,
  reducers: {
    setArticuloManufacturado: (state, action) => {
      const newArticuloManufacturado = action.payload;
      if (state.length === 0)
        newArticuloManufacturado.map((n: ArticuloManufacturado) =>
          state.push(n)
        );
    },
  },
});

export const { setArticuloManufacturado } = articuloManufacturadoSlice.actions;
export default articuloManufacturadoSlice.reducer;
