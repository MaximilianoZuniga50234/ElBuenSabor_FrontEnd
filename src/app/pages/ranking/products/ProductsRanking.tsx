import { Suspense, lazy, useEffect, useState } from "react";
import { getAllProduct } from "../../../functions/ProductAPI";
import { Product } from "../../../interfaces/Product";
import { PurchaseOrder } from "../../../interfaces/PurchaseOrder";
import { getAllPurchaseOrder } from "../../../functions/PurchaseOrderAPI";
import { PurchaseOrderDetail } from "../../../interfaces/PurchaseOrderDetail";
import { useStore } from "../../../store/CurrentUserStore";
import "./productsRanking.css";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";
import Loader from "../../../components/loader/Loader";
import NoPermissions from "../../../components/noPermissions/NoPermissions";
import { Stock } from "../../../interfaces/Stock";
import { getNotIngredients } from "../../../functions/StockAPI";

const ProductsRankingTable = lazy(
  () => import("../../../components/ranking/products/ProductsRankingTable")
);

export default function ProductsRanking() {
  const [products, setProducts] = useState<Product[]>([]);
  const [drinks, setDrinks] = useState<Stock[]>([]);
  const [showProducts, setShowProducts] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | Stock[]>(
    []
  );
  const [filteredOrders, setFilteredOrders] = useState<PurchaseOrder[]>();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>();
  const [datesToFilter, setDatesToFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useStore();
  const getProducts = async () => {
    try {
      const response = await getAllProduct();
      response && setProducts(response);
    } catch (err) {
      console.error(err);
    }
  };

  const getDrinks = async () => {
    try {
      const response = await getNotIngredients();
      response && setDrinks(response);
    } catch (err) {
      console.error(err);
    }
  };

  const getPurchaseOrders = async () => {
    try {
      const response = await getAllPurchaseOrder();
      response && setPurchaseOrders(response.filter((order: PurchaseOrder) => order.active && order.status?.status != "Anulado"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
    getDrinks();
    getPurchaseOrders();
  }, []);

  useEffect(() => {
    if (purchaseOrders) {
      setFilteredOrders(purchaseOrders);
    }
  }, [purchaseOrders]);

  useEffect(() => {
    if (user && filteredOrders) {
      setIsLoading(false);
      if (
        products.length > 1 &&
        filteredOrders?.length > 0 &&
        drinks.length > 1
      ) {
        products.forEach((p) => {
          if (p.quantitySold) {
            p.quantitySold = 0;
          }
        });

        drinks.forEach((d) => {
          if (d.quantitySold) {
            d.quantitySold = 0;
          }
        });

        filteredOrders.forEach((order: PurchaseOrder) => {
          order.details?.forEach((detail: PurchaseOrderDetail) => {
            const productIndex = products?.findIndex(
              (product: Product) => product.id === detail.product?.id
            );

            const stockIndex = drinks?.findIndex(
              (drink: Stock) => drink.id === detail.stock?.id
            );

            if (productIndex !== -1) {
              const quantity = products[productIndex].quantitySold ?? 0;
              products[productIndex] = {
                ...products[productIndex],
                quantitySold: quantity
                  ? quantity + detail.amount
                  : detail.amount,
              };
            }

            if (stockIndex !== -1) {
              const quantity = drinks[stockIndex].quantitySold ?? 0;
              drinks[stockIndex] = {
                ...drinks[stockIndex],
                quantitySold: quantity
                  ? quantity + detail.amount
                  : detail.amount,
              };
            }
          });
        });
      }
    }
  }, [products, user, filteredOrders, drinks]);

  useEffect(() => {
    if (filteredOrders?.length != 0) {
      if (showProducts && products) {
        setFilteredProducts(
          products
            .filter((p: Product) => p.quantitySold)
            .sort((a, b) => {
              return a.quantitySold && b.quantitySold
                ? b.quantitySold - a.quantitySold
                : 1;
            })
        );
      } else {
        setFilteredProducts(
          drinks
            .filter((drink: Stock) => drink.quantitySold)
            .sort((a, b) => {
              return a.quantitySold && b.quantitySold
                ? b.quantitySold - a.quantitySold
                : 1;
            })
        );
      }
    } else {
      setFilteredProducts([]);
    }
  }, [showProducts, products, filteredOrders, drinks]);

  const handleClick = () => {
    if (
      isNaN(datesToFilter.startDate.getTime()) &&
      isNaN(datesToFilter.endDate.getTime())
    ) {
      setFilteredOrders(purchaseOrders);
      toast.success("Pedidos filtrados correctamente.");
    } else if (datesToFilter.startDate.getHours() != 0) {
      toast.error("Debe especificar una fecha de inicio para filtrar.");
    } else if (
      datesToFilter.endDate.getHours() != 23 ||
      datesToFilter.endDate.getMinutes() != 59 ||
      datesToFilter.endDate.getSeconds() != 59
    ) {
      toast.error("Debe especificar una fecha de fin para filtrar.");
    } else if (
      datesToFilter.startDate.getTime() > datesToFilter.endDate.getTime()
    ) {
      toast.error("La fecha de inicio debe ser menor que la de fin.");
    } else {
      const orders = purchaseOrders?.filter((order: PurchaseOrder) => {
        const orderDate = new Date(order.fecha);

        return (
          orderDate >= datesToFilter.startDate &&
          orderDate <= datesToFilter.endDate
        );
      });
      setFilteredOrders(orders);
      toast.success("Pedidos filtrados correctamente.");

    }
  };

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    newStartDate.setDate(newStartDate.getDate() + 1);
    newStartDate.setHours(0);
    setDatesToFilter({
      ...datesToFilter,
      startDate: newStartDate,
    });
  };

  const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    newEndDate.setDate(newEndDate.getDate() + 1);
    newEndDate.setHours(23);
    newEndDate.setMinutes(59);
    newEndDate.setSeconds(59);
    setDatesToFilter({
      ...datesToFilter,
      endDate: new Date(newEndDate),
    });
  };

  return (
    user?.role && (
      <Suspense fallback={<Loader />}>
        {user?.role === "Administrador" ? (
          <div className="productsRanking__container">
            <div className="productsRanking__header">
              <h2 className="productsRanking__title">Ranking de productos</h2>
              <div className="productsRanking__filter">
                <input type="date" onChange={handleChangeStartDate} />
                <label>-</label>
                <input type="date" onChange={handleChangeEndDate} />
                <button onClick={handleClick}>
                  <FaSearch />
                </button>
              </div>
            </div>
              <div className="productsRanking__options">
                <button
                  className={`productsRanking__option__products ${
                    showProducts ? "active" : ""
                  }`}
                  onClick={() => {
                    setShowProducts(true);
                  }}
                >
                  Comidas
                </button>
                <button
                  className={`productsRanking__option__drinks ${
                    !showProducts ? "active" : ""
                  }`}
                  onClick={() => {
                    setShowProducts(false);
                  }}
                >
                  Bebidas
                </button>
              </div>
            {!isLoading && (
              <ProductsRankingTable
                products={filteredProducts}
                showProducts={showProducts}
                datesToFilter={datesToFilter}
              />
            )}
          </div>
        ) : (
          <NoPermissions />
        )}
      </Suspense>
    )
  );
}
