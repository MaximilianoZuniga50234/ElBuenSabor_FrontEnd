import { useEffect } from "react";
import { useStore as useStoreA } from "../store/AddressStore";
import { useStore as useStoreD } from "../store/DepartmentStore";
import { useStore as useStoreI } from "../store/InvoiceStore";
import { useStore as useStoreIP } from "../store/ItemProductStore";
import { useStore as useStoreIS } from "../store/ItemStockStore";
import { useStore as useStoreMU } from "../store/MeasurementUnitStore";
import { useStore as useStoreMPD } from "../store/MercadoPagoDataStore";
import { useStore as useStoreP } from "../store/PersonStore";
import { useStore as useStorePr } from "../store/ProductStore";
import { useStore as useStorePO } from "../store/PurchaseOrderStore";
import { useStore as useStoreR } from "../store/RoleStore";
import { useStore as useStoreS } from "../store/StatusStore";
import { useStore as useStoreSt } from "../store/StockStore";
import { useStore as useStoreU } from "../store/UserStore";

export const useFetchAll = async () => {
  const { add_all_address } = useStoreA();
  const { add_all_department } = useStoreD();
  const { add_all_invoice } = useStoreI();
  const { add_all_item_product } = useStoreIP();
  const { add_all_item_stock } = useStoreIS();
  const { add_all_measurement_unit } = useStoreMU();
  const { add_all_mercado_pago_data } = useStoreMPD();
  const { add_all_person } = useStoreP();
  const { add_all_product } = useStorePr();
  const { add_all_purchase_order } = useStorePO();
  const { add_all_role } = useStoreR();
  const { add_all_status } = useStoreS();
  const { add_all_stock } = useStoreSt();
  const { add_all_user } = useStoreU();

  useEffect(() => {
    add_all_address();
    add_all_department();
    add_all_invoice();
    add_all_item_product();
    add_all_item_stock();
    add_all_measurement_unit();
    add_all_mercado_pago_data();
    add_all_person();
    add_all_product();
    add_all_purchase_order();
    add_all_role();
    add_all_status();
    add_all_stock();
    add_all_user();
  }, []);
};
