import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../functions/ProductAPI";
import { Product } from "../../interfaces/Product";

export default function AllProductsCards() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await getAllProduct();
        setProducts(response);
      } catch (error) {
        console.error("Error", error);
      }
    };

    getAllItems();
  }, []);

  return (
    <>
      {products.map((product) => (
        <div className="allProducts__card" key={product.id}>
          <figure className="allProducts__card__figure">
            <img
              src={product.imgUrl}
              alt=""
              className="allProducts__card__img"
            />
          </figure>
          <div className="allProducts__card__text">
            <div className="allProducts__card__productName">
              <p className="allProducts__card__p">{product.denomination}</p>
            </div>
            <div className="allProducts__card__priceAndCart">
              <div className="allProducts__card__price">
                <p className="allProducts__card__p">${product.salePrice}</p>
              </div>

              <div className="allProducts__card__cart">
                <Link
                  to="#"
                  className="allProducts__bar__link allProducts__bar__link--cart"
                >
                  <FaCartShopping />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
