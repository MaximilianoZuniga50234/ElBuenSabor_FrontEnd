import { MouseEvent, Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";
import { Stock } from "../../interfaces/Stock";
import { Product } from "../../interfaces/Product";
import { Filter } from "../../interfaces/Filter";
import { getAllProduct } from "../../functions/ProductAPI";
import { getNotIngredients } from "../../functions/StockAPI";
import { applyFilters } from "../../functions/Filter";
import { useStore as useFilter } from "../../store/FilterStore";
import { useStore as useCart } from "../../store/CartStore";
import Loader from "../../components/loader/Loader";
import "./allproducts.css";

const AllProductsCard = lazy(
  () => import("../../components/all_products/AllProductsCard")
);
const AllProductsSideBar = lazy(
  () => import("../../components/all_products/AllProductsSideBar")
);
const AllProductsSideBarMobile = lazy(
  () => import("../../components/all_products/AllProductsSideBarMobile")
);
const ModalProductDetail = lazy(
  () => import("../../components/ModalProductDetail/ModalProductDetail")
);

const INITIAL_STATE_FILTER = {
  isOpen: false,
  order_selected: false,
  category_selected: false,
  price_selected: false,
};

export default function AllProducts() {
  // STATES
  const [products, setProducts] = useState<(Product | Stock)[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState<Filter>(INITIAL_STATE_FILTER);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | Stock>(
    {} as Product
  );

  // TOOLS
  const { params, active, clearFilter } = useFilter();
  const navigate = useNavigate();
  const { add } = useCart();

  //MEDIA CONDITIONS
  const isMobile = useMediaQuery({ maxWidth: 585 });
  const isDesktop = useMediaQuery({ minWidth: 586 });

  // MODAL ACTIONS
  const openModal = (prod: Product | Stock) => {
    setModalProduct(prod);
    setModalIsOpen(true);
  };

  // CART ACTIONS
  const handleCartButtonClick = (
    product: Product | Stock,
    event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | undefined
  ) => {
    event?.stopPropagation();

    // const currentDate = new Date();

    // if (
    //   (currentDate.getDay() > 0 &&
    //     currentDate.getDay() < 6 &&
    //     currentDate.getHours() >= 20) ||
    //   ((currentDate.getDay() === 0 || currentDate.getDay() === 6) &&
    //     (currentDate.getHours() >= 20 ||
    //       (currentDate.getHours() >= 11 && currentDate.getHours() < 15)))
    // ) {
    if (product.type === "product") {
      const productObj = product as Product;

      // Si no hay cantidad suficiente de alguno de los ingredientes, no podemos preparar el producto
      if (
        productObj.details.some(
          (detail) => detail.stock.currentStock - detail.amount < 0
        )
      ) {
        toast.error(
          `Lo sentimos, no hay suficiente stock para preparar el producto "${productObj.denomination}".`
        );
        return;
      }
    }

    if (product.type === "stock") {
      const productStock = product as Stock;
      
      if (productStock.currentStock === 0) {
        toast.error(
          `Lo sentimos, no hay suficiente stock ("${productStock.denomination}").`
        );
        return;
      }
    }

    toast.success("Producto agregado al carrito.");
    add(product);

    // } else {
    //   toast.error(
    //     "Lo sentimos, no puedes agregar un producto al carrito fuera de nuestro horario de atención. El mismo es de 20:00 hs. a 00:00 hs. de lunes a viernes y también de 11:00 hs. a 15:00 hs. los sábados y domingos.",
    //     {
    //       duration: 10000,
    //       icon: <FaClock />,
    //     }
    //   );
    // }
  };

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
      const resElaboratedProducts = await getAllProduct();
      const resDrinks = await getNotIngredients();

      const resProducts = [...resElaboratedProducts, ...resDrinks];

      let filteredProducts = resProducts.filter(
        (item: Product | Stock) => item.active === true
      );

      filteredProducts = applyFilters(filteredProducts, params);

      setProducts(filteredProducts);
    } catch (error) {
      navigate("/error", {
        state: { error: "500", message: "Error al obtener los productos" },
      });
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
    <Suspense fallback={<Loader />}>
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
              return (
                <AllProductsCard
                  product={p}
                  key={p.id}
                  addToCart={handleCartButtonClick}
                  openModal={openModal}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ModalProductDetail
        open={modalIsOpen}
        product={modalProduct}
        setOpen={setModalIsOpen}
        onAddToCart={handleCartButtonClick}
      />
    </Suspense>
  );
}
