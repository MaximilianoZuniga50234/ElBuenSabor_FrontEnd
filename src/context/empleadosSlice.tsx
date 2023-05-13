import { createSlice } from "@reduxjs/toolkit";
import { Empleado } from "../interface/Empleado";

const initialState = [] as Empleado[];

export const EmpleadoSlice = createSlice({
  name: "Empleado",
  initialState,
  reducers: {
    setEmpleado: (state, action) => {
      const newEmpleado = action.payload;
      if (state.length === 0)
        newEmpleado.map((n: Empleado) => state.push(n));
    },
    addEmpleado: (state, action) => {
      state.push(action.payload);
    },
    modifyEmpleado: (state, action) => {
      const EmpleadoFound = state.find(
        (Empleado) => Empleado.id === action.payload.id
      );
      if (EmpleadoFound)
        state[state.indexOf(EmpleadoFound)] = action.payload;
    },
  },
});

export const { addEmpleado, setEmpleado, modifyEmpleado } =
  EmpleadoSlice.actions;
export default EmpleadoSlice.reducer;
