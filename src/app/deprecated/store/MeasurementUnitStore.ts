import { create } from "zustand";
import { MeasurementUnit } from "../../interfaces/MeasurementUnit";

type Store = {
  measurementUnits: MeasurementUnit[];
  add_all_measurement_unit: () => void;
  add: (newMeasurementUnit: MeasurementUnit) => void;
  remove: (measurementUnitId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  measurementUnits: [],
  add_all_measurement_unit: async () => {
    const measurementUnits = await fetch(
      "http://localhost:9000/api/v1/measurementUnit"
    ).then((res) => res.json());
    set({ measurementUnits });
  },
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
