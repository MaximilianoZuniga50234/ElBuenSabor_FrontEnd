import { useEffect, useState } from "react";
import { ItemProduct } from "../../interfaces/ItemProduct";
import { Filter } from "../../interfaces/Filter";
import { getAllItemProduct } from "../../functions/ItemProductAPI";
import { FaBan, FaCaretDown } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { useStore as useFilter } from "../../store/FilterStore";

interface Filter_actions {
  handleOpenCloseOrder: () => void;
  handleOpenCloseCategory: () => void;
  handleOpenClosePrice: () => void;
}

interface Props {
  actions: Filter_actions;
  filter: Filter;
}

const AllProductsSideBar = ({ actions, filter }: Props) => {
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

  //REDEFINE DESKTOP SIZE

  const reDesktop = useMediaQuery({ minWidth: 1024 });

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
    <aside className="allProducts__bar">
      <h4>Ordenar</h4>
      <div className="allproducts_order_desktop">
        <div onClick={actions.handleOpenCloseOrder}>
          <input type="text" value="Ordenar por..." readOnly />
          <FaCaretDown className={filter.order_selected ? "active" : ""} />
        </div>
        <ul className={filter.order_selected ? "active" : ""}>
          <li
            className={params.productOrder === "1" ? "selected" : ""}
            onClick={() => {
              handleChangeOrder("1");
            }}
          >
            Alfabetico A-Z
          </li>
          <li
            className={params.productOrder === "2" ? "selected" : ""}
            onClick={() => {
              handleChangeOrder("2");
            }}
          >
            Alfabetico Z-A
          </li>
          <li
            className={params.productOrder === "3" ? "selected" : ""}
            onClick={() => {
              handleChangeOrder("3");
            }}
          >
            Menor precio
          </li>
          <li
            className={params.productOrder === "4" ? "selected" : ""}
            onClick={() => {
              handleChangeOrder("4");
            }}
          >
            Mayor precio
          </li>
        </ul>
      </div>
      <h4>Filtros</h4>
      <div className="allProducts__bar__categories">
        <h6 onClick={actions.handleOpenCloseCategory}>
          Categoría
          <FaCaretDown className={filter.category_selected ? "active" : ""} />
        </h6>
        <ul
          style={{
            height: `${
              reDesktop && filter.category_selected
                ? 26 * categories.length
                : filter.category_selected
                ? 22 * categories.length
                : 0
            }px`,
          }}
        >
          {categories.map((c) => {
            return (
              <li
                key={c.id}
                className={`allProducts__bar__li ${
                  params.productCategory === c.id.toString() ? "selected" : ""
                }`}
                onClick={() => {
                  handleChangeCategory(c.id.toString());
                }}
              >
                <p className="allProducts__bar__link">{c.denomination}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="allProducts__bar__price">
        <h6 onClick={actions.handleOpenClosePrice}>
          Precio
          <FaCaretDown className={filter.price_selected ? "active" : ""} />
        </h6>
        <ul className={filter.price_selected ? "active" : ""}>
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
        className="allproducts_filter_undo_button_desktop"
        onClick={clearFilter}
      >
        Deshacer filtros <FaBan />
      </button>
    </aside>
  );
};

export default AllProductsSideBar;
