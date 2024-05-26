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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072810/pizza-a-la-piedra-1_juxdcg_tpxh0g.webp" />
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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072792/fotografia-de-hamburguesas_btirdn_ujessh.jpg" />
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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072801/IS7T6CMJQBEKDKX3IEKNHTWQEU_wunvc5_u1g4di.webp" />
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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072824/233556-default_ahldt5_t5tosa.avif" />
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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072786/436282-24a00532-effe-43a2-a025-27d206875cfb_pocuje_aim9yp.jpg" />
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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072790/Empanadas-fritas-o-al-horno_akp5we_rhqsak.webp" />
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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072805/maxresdefault_aoypef_kf5oyp.jpg" />
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
          <img src="https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072806/mejores-bebidas-isotonicas-1640688481_xyacwv_jacatn.jpg" />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
