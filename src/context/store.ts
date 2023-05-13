import { configureStore } from "@reduxjs/toolkit";
import measurementUnitReducer from "./measurementUnitSlice";
import stockReducer from "./stockSlice";
import articuloManufacturadoReducer from "./articuloManufacturadoSlice";
import empleadoReducer from "./empleadosSlice";

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    articuloManufacturado: articuloManufacturadoReducer,
    measurementUnit: measurementUnitReducer,
    empleado: empleadoReducer
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
