import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice";
import articuloManufacturadoReducer from "./articuloManufacturadoSlice";
import unidadMedidaReducer from "./UnidadMedidaSlice";

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    articuloManufacturado: articuloManufacturadoReducer,
    unidadMedida: unidadMedidaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
