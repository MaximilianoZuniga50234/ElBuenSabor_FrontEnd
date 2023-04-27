export interface Stock {
  idArticuloInsumo: number;
  denominacion: string;
  precioCompra: number;
  precioVenta?: number;
  stockActual: number;
  stockMinimo: number;
  esinsumo: boolean;
  deAlta: boolean;
}
