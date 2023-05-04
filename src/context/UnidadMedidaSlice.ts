import { createSlice } from "@reduxjs/toolkit";
import { UnidadMedida } from "../interface/UnidadMedida";

const initialState = [] as UnidadMedida[];

export const UnidadMedidaSlice = createSlice({
  name: "unidadDeMedida",
  initialState,
  reducers: {
    setUnidadMedida: (state, action) => {
      const newUnidadMedida = action.payload;
      if (state.length === 0)
        newUnidadMedida.map((n: UnidadMedida) => state.push(n));
    },
    addUnidadMedida: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUnidadMedida, setUnidadMedida } = UnidadMedidaSlice.actions;
export default UnidadMedidaSlice.reducer;
