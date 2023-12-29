import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Product } from "../../interfaces/Product";
import {
  getAllProduct,
  getProductsByCategory,
  getProductsForName,
} from "../../functions/ProductAPI";
import AllProductsCard from "../../components/all_products/AllProductsCard";
import AllProductsSideBar from "../../components/all_products/AllProductsSideBar";
import AllProductsSideBarMobile from "../../components/all_products/AllProductsSideBarMobile";
import "./allproducts.css";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { search, category } = useParams();

  const isMobile = useMediaQuery({ maxWidth: 585 });
  const isDesktop = useMediaQuery({ minWidth: 586 });

  const getAllItems = async () => {
    try {
      const response = search
        ? getProductsForName(search)
        : category
        ? getProductsByCategory(category)
        : getAllProduct();
      setProducts(await response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    getAllItems();
  }, [search, category]);

  useEffect(() => {
    setNoResults(products.length === 0);
  }, [products]);

  useEffect(() => {
    if (search || category) {
      setIsSearching(true);
    }
  }, [search, category]);

  return (
    <div className="allProducts__container">
      {isMobile && <AllProductsSideBarMobile />}
      {isDesktop && <AllProductsSideBar />}
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
