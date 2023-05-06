import { createSlice } from "@reduxjs/toolkit";
import { UnidadMedida } from "../interface/UnidadMedida";

const initialState = [] as UnidadMedida[];

export const UnidadMedidaSlice = createSlice({
  name: "unidadMedida",
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
    modifyUnidadMedida: (state, action) => {
      const UnidadMedidaFound = state.find(
        (unidadMedida) => unidadMedida.idMedida === action.payload.idMedida
      );
      if (UnidadMedidaFound)
        state[state.indexOf(UnidadMedidaFound)] = action.payload;
    },
  },
});

export const { addUnidadMedida, setUnidadMedida, modifyUnidadMedida } =
  UnidadMedidaSlice.actions;
export default UnidadMedidaSlice.reducer;
