import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ItemProduct } from "../../interfaces/ItemProduct";
import { getAllItemProduct } from "../../functions/ItemProductAPI";

const AllProductsSideBar = () => {
  const [categories, setCategories] = useState<ItemProduct[]>([]);

  const getAllCategories = async () => {
    setCategories(await getAllItemProduct());
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <aside className="allProducts__bar">
      <h4 className="allProducts__bar__title">Filtros</h4>
      <div className="allProducts__bar__categories">
        <h6 className="allProducts__bar__categories__title">Categoría</h6>
        <ul className="allProducts__bar__ul">
          {categories.map((c) => {
            return (
              <li key={c.id} className="allProducts__bar__li">
                <Link
                  to={`/u/products/search/cat/${c.denomination.toLowerCase()}`}
                  className="allProducts__bar__link"
                >
                  {c.denomination}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="allProducts__bar__price">
        <h6 className="allProducts__bar__price__title">Precio</h6>
        <ul className="allProducts__bar__ul">
          <li className="allProducts__bar__li allProducts__bar__li--input">
            <label htmlFor="minimum__input">Mínimo</label>
            <input type="number" className="minimum__input" />
          </li>
          <li className="allProducts__bar__li allProducts__bar__li--input">
            <label htmlFor="maximum__input">Máximo</label>
            <input type="number" className="maximum__input" />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AllProductsSideBar;
