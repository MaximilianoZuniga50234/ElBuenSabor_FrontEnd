import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Product } from "../../interfaces/Product";
import { Filter } from "../../interfaces/Filter";
import { getAllProduct } from "../../functions/ProductAPI";
import { useStore as useFilter } from "../../store/FilterStore";
import AllProductsCard from "../../components/all_products/AllProductsCard";
import AllProductsSideBar from "../../components/all_products/AllProductsSideBar";
import AllProductsSideBarMobile from "../../components/all_products/AllProductsSideBarMobile";
import "./allproducts.css";

const INITIAL_STATE_FILTER = {
  isOpen: false,
  order_selected: false,
  category_selected: false,
  price_selected: false,
};

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState<Filter>(INITIAL_STATE_FILTER);

  const { params, active, clearFilter } = useFilter();

  //MEDIA CONDITIONS

  const isMobile = useMediaQuery({ maxWidth: 585 });
  const isDesktop = useMediaQuery({ minWidth: 586 });

  //FILTER ACTIONS OBJECT

  const filterActions = {
    handleOpenClose: () => {
      setFilter({ ...filter, isOpen: !filter.isOpen });
    },
    handleOpenCloseOrder: () => {
      setFilter({ ...filter, order_selected: !filter.order_selected });
    },
    handleOpenCloseCategory: () => {
      setFilter({ ...filter, category_selected: !filter.category_selected });
    },
    handleOpenClosePrice: () => {
      setFilter({ ...filter, price_selected: !filter.price_selected });
    },
  };

  const getAllItems = async () => {
    try {
      const response = getAllProduct(
        params.productName,
        params.productOrder,
        params.productCategory,
        params.productMinPrice,
        params.productMaxPrice
      );
      setProducts(
        (await response).filter((product: Product) => product.active === true)
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    return () => {
      clearFilter();
    };
  }, []);

  useEffect(() => {
    getAllItems();
    setIsSearching(active);
    window.scrollTo(0, 0);
  }, [params]);

  useEffect(() => {
    setNoResults(products.length === 0);
  }, [products]);

  return (
    <div className="allProducts__container">
      {isMobile && (
        <AllProductsSideBarMobile actions={filterActions} filter={filter} />
      )}
      {isDesktop && (
        <AllProductsSideBar actions={filterActions} filter={filter} />
      )}
      <div className="allProducts__main">
        <div className="allProducts__main__title">
          {!isSearching ? (
            <h1>Todos los productos</h1>
          ) : !noResults ? (
            <h1>Resultados de la búsqueda</h1>
          ) : (
            <h1>No hay resultados para la búsqueda</h1>
          )}
        </div>
        <div className="allProducts__main__container">
          {products.map((p) => {
            return <AllProductsCard product={p} key={p.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
