import { FormEvent, Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toast } from "sonner";
import Loader from "../../../components/loader/Loader";
import { Product, ProductDetail } from "../../../interfaces/Product";
import { useStore as useUser } from "../../../store/CurrentUserStore";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../../../functions/ProductAPI";
import "./productABM.css";
import { ItemProduct } from "../../../interfaces/ItemProduct";

const ProductTable = lazy(
  () => import("../../../components/products/ProductTable")
);
const ProductABMModalDelete = lazy(
  () => import("../../../components/products/ProductABMModalDelete")
);
const ProductABMModal = lazy(
  () => import("../../../components/products/ProductABMModal")
);
const NoPermissions = lazy(
  () => import("../../../components/noPermissions/NoPermissions")
);

// Estado inicial de un producto
const INITIAL_STATE = {
  id: 0,
  active: true,
  denomination: "",
  details: [] as ProductDetail[],
  discountPercentaje: 0,
  estimatedTimeKitchen: 0,
  imgId: 0,
  imgUrl: "",
  itemProduct: {} as ItemProduct,
  salePrice: 0,
} as Product;

const ProductABM = () => {
  // Estados generales del componente
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  // Estados para manejar el modal
  const [isNew, setIsNew] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(INITIAL_STATE);

  // Variable que almacena el usuario logueado actualmente
  const { user } = useUser();
  const navigate = useNavigate();

  const handleVisibleModal = () => setOpen(!open);
  const handleVisibleDeleteModal = () => setOpenDelete(!openDelete);

  const getProducts = async (name?: string) => {
    const data = await getAllProduct(name);
    setProducts(data);
  };

  const handleSearch = (e: FormEvent, name: string) => {
    e.preventDefault();
    getProducts(name);
  };

  const updateProductsList = (updatedProduct: Product) => {
    if (products.every((p) => p.id !== updatedProduct.id)) {
      setProducts([updatedProduct, ...products]);
    } else {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    }
  };

  // ABM Functions
  const handleDeactive = async () => {
    const response = await deleteProduct(product.id.toString());

    if (response?.id) {
      updateProductsList(response);
      handleVisibleDeleteModal();
      toast.message("Producto dado de baja con éxito");
    } else {
      navigate("/error", {
        state: {
          error: response.status,
          message: "Error al dar de baja un producto",
        },
      });
    }
  };

  const handleConfirmProduct = async (image: string | null) => {
    const productPrice = product.details.reduce(
      (currentPrice: number, detail: ProductDetail) => {
        return (currentPrice += detail.stock.salePrice * detail.amount);
      },
      0
    );
    const productWithPrice = { ...product, salePrice: productPrice };

    const response = isNew
      ? await createProduct(productWithPrice, image)
      : await updateProduct(productWithPrice, image);

    if (response?.id) {
      updateProductsList(response);
      toast(`Producto ${isNew ? "creado" : "actualizado"} con éxito.`);
    } else {
      navigate("/error", {
        state: {
          error: response.status,
          message: `Error al ${isNew ? "crear" : "actualizar"} el producto`,
        },
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {user?.role === "Administrador" ? (
        <main className="main_products_list">
          <div className="title_container">
            <h2>Productos</h2>
            <form onSubmit={(e) => handleSearch(e, search)}>
              <input
                type="text"
                placeholder="Buscar producto"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <FaMagnifyingGlass />
              </button>
            </form>
            <button
              className="product_add_button"
              onClick={() => {
                handleVisibleModal();
                setIsNew(true);
                setProduct(INITIAL_STATE);
              }}
            >
              Añadir nuevo producto
            </button>
          </div>
          {products.length > 0 && (
            <ProductTable
              datos={products}
              newHandler={setIsNew}
              handler={handleVisibleModal}
              handlerDelete={handleVisibleDeleteModal}
              setProduct={setProduct}
            />
          )}
          {products.length === 0 && search !== "" && (
            <div className="no_products">
              <h4>NO HAY PRODUCTOS CON ESA DENOMINACIÓN</h4>
            </div>
          )}
          {products.length === 0 && search === "" && (
            <div className="no_products">
              <h4>NO HAY PRODUCTOS</h4>
            </div>
          )}

          <ProductABMModal
            open={open}
            isNew={isNew}
            handler={handleVisibleModal}
            product={product}
            handleProduct={setProduct}
            handleConfirmProduct={handleConfirmProduct}
          />
          <ProductABMModalDelete
            open={openDelete}
            handler={handleVisibleDeleteModal}
            product={product}
            handleDeactive={handleDeactive}
          />
        </main>
      ) : (
        <NoPermissions />
      )}
    </Suspense>
  );
};

export default ProductABM;
