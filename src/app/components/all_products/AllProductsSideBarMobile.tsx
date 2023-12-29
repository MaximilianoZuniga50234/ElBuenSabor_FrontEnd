import { useEffect, useState } from "react";
import { getAllItemProduct } from "../../functions/ItemProductAPI";
import { ItemProduct } from "../../interfaces/ItemProduct";
import { FaCaretDown, FaCircleXmark, FaFilter } from "react-icons/fa6";

interface Filter {
  isOpen: boolean;
  category: string;
  category_selected: boolean;
  price_selected: boolean;
  order: string;
  order_selected: boolean;
}

const INITIAL_STATE_FILTER = {
  isOpen: false,
  category: "Categoría",
  category_selected: false,
  price_selected: false,
  order: "Ordenar por...",
  order_selected: false,
};

const AllProductsSideBarMobile = () => {
  const [categories, setCategories] = useState<ItemProduct[]>([]);
  const [filter, setFilter] = useState<Filter>(INITIAL_STATE_FILTER);

  const handleOpenCloseOrder = () => {
    setFilter({ ...filter, order_selected: !filter.order_selected });
  };

  const handleOpenClose = () => {
    setFilter({ ...filter, isOpen: !filter.isOpen });
  };

  const handleOpenCloseCategory = () => {
    setFilter({ ...filter, category_selected: !filter.category_selected });
  };

  const handleOpenClosePrice = () => {
    setFilter({ ...filter, price_selected: !filter.price_selected });
  };

  const getAllCategories = async () => {
    setCategories(await getAllItemProduct());
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="allproducts_top_options">
        <button className="allproducts_filter_button" onClick={handleOpenClose}>
          Filtrar
          <FaFilter />
        </button>
        <div className="allproducts_order_container">
          <div
            onClick={handleOpenCloseOrder}
            className={filter.order_selected ? "active" : ""}
          >
            <input
              type="text"
              value={filter.order}
              readOnly
              className={filter.order_selected ? "active" : ""}
            />
            <FaCaretDown className={filter.order_selected ? "active" : ""} />
          </div>
          <ul className={filter.order_selected ? "active" : ""}>
            <li
              className={filter.order === "Alfabetico A-Z" ? "selected" : ""}
              onClick={() => {
                setFilter({
                  ...filter,
                  order: "Alfabetico A-Z",
                });
              }}
            >
              Alfabetico A-Z
            </li>
            <li
              className={filter.order === "Alfabetico Z-A" ? "selected" : ""}
              onClick={() => {
                setFilter({
                  ...filter,
                  order: "Alfabetico Z-A",
                });
              }}
            >
              Alfabetico Z-A
            </li>
            <li
              className={filter.order === "Menor precio" ? "selected" : ""}
              onClick={() => {
                setFilter({
                  ...filter,
                  order: "Menor precio",
                });
              }}
            >
              Menor precio
            </li>
            <li
              className={filter.order === "Mayor precio" ? "selected" : ""}
              onClick={() => {
                setFilter({
                  ...filter,
                  order: "Mayor precio",
                });
              }}
            >
              Mayor precio
            </li>
          </ul>
        </div>
      </div>
      <aside className={filter.isOpen ? "active" : ""}>
        <FaCircleXmark
          className="allproducts_filter_close"
          onClick={handleOpenClose}
        />
        <div className="allproducts_filter_container">
          <h4>Filtros</h4>
          <div className="allProducts_dropdown_mobile">
            <div onClick={handleOpenCloseCategory}>
              <input type="text" value="Categoría" readOnly />
              <FaCaretDown
                className={filter.category_selected ? "active" : ""}
              />
            </div>
            <ul
              className={`filter_category_menu ${
                filter.category_selected ? "active" : ""
              }`}
              style={{
                height: `${
                  filter.category_selected ? 22.5 * categories.length : 0
                }px`,
              }}
            >
              {categories.map((c) => {
                return (
                  <li
                    key={c.id}
                    onClick={() => {
                      setFilter({
                        ...filter,
                        category: c.denomination,
                      });
                    }}
                    className={
                      c.denomination === filter.category ? "selected" : ""
                    }
                  >
                    {c.denomination}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="allProducts_dropdown_mobile">
            <div onClick={handleOpenClosePrice}>
              <input type="text" value="Precio" readOnly />
              <FaCaretDown className={filter.price_selected ? "active" : ""} />
            </div>
            <ul
              className={`filter_price_menu ${
                filter.price_selected ? "active" : ""
              }`}
              style={{
                height: `${filter.price_selected ? 100 : 0}px`,
              }}
            >
              <li>
                <label htmlFor="minimum__input">Mínimo</label>
                <input type="number" id="minimum__input" />
              </li>
              <li>
                <label htmlFor="maximum__input">Máximo</label>
                <input type="number" id="maximum__input" />
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AllProductsSideBarMobile;
