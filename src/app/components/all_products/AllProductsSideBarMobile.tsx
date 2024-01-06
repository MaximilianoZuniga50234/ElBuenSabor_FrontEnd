import { useEffect, useState } from "react";
import { getAllItemProduct } from "../../functions/ItemProductAPI";
import { useStore as useFilter } from "../../store/FilterStore";
import { ItemProduct } from "../../interfaces/ItemProduct";
import { Filter } from "../../interfaces/Filter";
import { FaBan, FaCaretDown, FaCircleXmark, FaFilter } from "react-icons/fa6";

interface Filter_actions {
  handleOpenClose: () => void;
  handleOpenCloseOrder: () => void;
  handleOpenCloseCategory: () => void;
  handleOpenClosePrice: () => void;
}

interface Props {
  actions: Filter_actions;
  filter: Filter;
}

const AllProductsSideBarMobile = ({ actions, filter }: Props) => {
  const [categories, setCategories] = useState<ItemProduct[]>([]);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  //FILTERS

  const {
    setActive,
    setCategory,
    setOrder,
    setMaxPrice,
    setMinPrice,
    clearFilter,
    params,
  } = useFilter();

  const handleChangeOrder = (order: string) => {
    setActive(true);
    setOrder(order);
  };

  const handleChangeCategory = (category: string) => {
    setActive(true);
    setCategory(category);
  };

  const handlePrice = () => {
    setActive(true);
    setMinPrice(priceMin);
    setMaxPrice(priceMax);
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
        <button
          className="allproducts_filter_button"
          onClick={actions.handleOpenClose}
        >
          Filtrar
          <FaFilter />
        </button>
        <div className="allproducts_order_container">
          <div
            onClick={actions.handleOpenCloseOrder}
            className={filter.order_selected ? "active" : ""}
          >
            <input
              type="text"
              value="Ordenar por..."
              readOnly
              className={filter.order_selected ? "active" : ""}
            />
            <FaCaretDown className={filter.order_selected ? "active" : ""} />
          </div>
          <ul className={filter.order_selected ? "active" : ""}>
            <li
              className={params.productOrder === "1" ? "selected" : ""}
              onClick={() => {
                handleChangeOrder("1");
                actions.handleOpenCloseOrder();
              }}
            >
              Alfabetico A-Z
            </li>
            <li
              className={params.productOrder === "2" ? "selected" : ""}
              onClick={() => {
                handleChangeOrder("2");
                actions.handleOpenCloseOrder();
              }}
            >
              Alfabetico Z-A
            </li>
            <li
              className={params.productOrder === "3" ? "selected" : ""}
              onClick={() => {
                handleChangeOrder("3");
                actions.handleOpenCloseOrder();
              }}
            >
              Menor precio
            </li>
            <li
              className={params.productOrder === "4" ? "selected" : ""}
              onClick={() => {
                handleChangeOrder("4");
                actions.handleOpenCloseOrder();
              }}
            >
              Mayor precio
            </li>
          </ul>
        </div>
      </div>
      <aside
        className={`allproducts_side_bar ${filter.isOpen ? "active" : ""}`}
      >
        <FaCircleXmark
          className="allproducts_filter_close"
          onClick={actions.handleOpenClose}
        />
        <div className="allproducts_filter_container">
          <h4>Filtros</h4>
          <div className="allProducts_dropdown_mobile">
            <div onClick={actions.handleOpenCloseCategory}>
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
                      handleChangeCategory(c.id.toString());
                    }}
                    className={
                      params.productCategory === c.id.toString()
                        ? "selected"
                        : ""
                    }
                  >
                    {c.denomination}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="allProducts_dropdown_mobile">
            <div onClick={actions.handleOpenClosePrice}>
              <input type="text" value="Precio" readOnly />
              <FaCaretDown className={filter.price_selected ? "active" : ""} />
            </div>
            <ul
              className={`filter_price_menu ${
                filter.price_selected ? "active" : ""
              }`}
            >
              <li>
                <input
                  type="number"
                  id="minimum__input"
                  placeholder="Minimo"
                  onChange={(e) => {
                    setPriceMin(e.target.value);
                  }}
                  value={priceMin}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="maximum__input"
                  placeholder="Maximo"
                  onChange={(e) => {
                    setPriceMax(e.target.value);
                  }}
                  value={priceMax}
                />
              </li>
              <li>
                <button onClick={handlePrice}>Aplicar</button>
              </li>
            </ul>
          </div>
          <button
            className="allproducts_undo_filter_button_mobile"
            onClick={clearFilter}
          >
            Deshacer filtros
            <FaBan />
          </button>
        </div>
      </aside>
    </>
  );
};

export default AllProductsSideBarMobile;
