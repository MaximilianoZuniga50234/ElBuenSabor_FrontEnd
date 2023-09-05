import { create } from "zustand";
import { MeasurementUnit } from "../interfaces/MeasurementUnit";

type Store = {
  measurementUnits: MeasurementUnit[];
  add: (newMeasurementUnit: MeasurementUnit) => void;
  remove: (measurementUnitId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  measurementUnits: [],
  add: (newMeasurementUnit: MeasurementUnit) =>
    set((state) => ({
      measurementUnits: [...state.measurementUnits, newMeasurementUnit],
    })),
  remove: (measurementUnitId: number) =>
    set((state) => ({
      measurementUnits: state.measurementUnits.filter(
        (measurementUnit) => measurementUnit.id !== measurementUnitId
      ),
    })),
}));
