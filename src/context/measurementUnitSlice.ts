import { createSlice } from "@reduxjs/toolkit";
import { MeasurementUnit } from "../interface/MeasurementUnit";

const initialState = [] as MeasurementUnit[];

export const measurementUnitSlice = createSlice({
  name: "measurementUnit",
  initialState,
  reducers: {
    setMeasurementUnit: (state, action) => {
      const newMeasurementUnit = action.payload;
      if (state.length === 0)
        newMeasurementUnit.map((n: MeasurementUnit) => state.push(n));
    },
    addMeasurementUnit: (state, action) => {
      state.push(action.payload);
    },
    modifyMeasurementUnit: (state, action) => {
      const MeasurementUnitFound = state.find(
        (MeasurementUnit) => MeasurementUnit.id === action.payload.id
      );
      if (MeasurementUnitFound)
        state[state.indexOf(MeasurementUnitFound)] = action.payload;
    },
  },
});

export const { addMeasurementUnit, setMeasurementUnit, modifyMeasurementUnit } =
  measurementUnitSlice.actions;
export default measurementUnitSlice.reducer;
