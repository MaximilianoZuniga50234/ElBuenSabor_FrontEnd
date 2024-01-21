import { Link } from "react-router-dom";
import { useStore as useFilter } from "../../../store/FilterStore";
import "./categories.css";

const Categories = () => {
  const { setCategory } = useFilter();

  return (
    <div className="categories_main_container">
      <h1>CATEGORIAS</h1>
      <div className="categories_items_container">
        <Link
          to="u/products"
          onClick={() => {
            setCategory("2");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Pizzas</label>
          <h6>Pizzas</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/pizza-a-la-piedra-1_juxdcg.webp" />
        </Link>
        <Link
          to="u/products"
          onClick={() => {
            setCategory("1");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Hamburguesas</label>
          <h6>Hamburguesas</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/fotografia-de-hamburguesas_btirdn.jpg" />
        </Link>
        <Link
          to="u/products"
          onClick={() => {
            setCategory("3");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Lomos</label>
          <h6>Lomos</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/IS7T6CMJQBEKDKX3IEKNHTWQEU_wunvc5.webp" />
        </Link>
        <Link
          to="u/products"
          onClick={() => {
            setCategory("4");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Panchos</label>
          <h6>Panchos</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/233556-default_ahldt5.avif" />
        </Link>
        <Link
          to="u/products"
          onClick={() => {
            setCategory("7");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Minutas</label>
          <h6>Minutas</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/436282-24a00532-effe-43a2-a025-27d206875cfb_pocuje.jpg" />
        </Link>
        <Link
          to="u/products"
          onClick={() => {
            setCategory("6");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Empanadas</label>
          <h6>Empanadas</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264947/assets%20for%20elBuenSabor/Empanadas-fritas-o-al-horno_akp5we.webp" />
        </Link>
        <Link
          to="u/products"
          onClick={() => {
            setCategory("5");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Sándwichs</label>
          <h6>Sándwichs</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264947/assets%20for%20elBuenSabor/maxresdefault_aoypef.jpg" />
        </Link>
        <Link
          to="u/products"
          onClick={() => {
            setCategory("8");
          }}
          className="categories_item"
        >
          <div></div>
          <label>Bebidas</label>
          <h6>Bebidas</h6>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264947/assets%20for%20elBuenSabor/mejores-bebidas-isotonicas-1640688481_xyacwv.jpg" />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
