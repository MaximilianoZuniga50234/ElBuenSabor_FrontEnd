import { Link } from "react-router-dom";
import "./categories.css";

const Categories = () => {
  return (
    <div className="categories_main_container">
      <h1>CATEGORIAS</h1>
      <div className="categories_items_container">
        <Link to="u/products/search/cat/pizzas" className="categories_item">
          <div></div>
          <label>Pizzas</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/pizza-a-la-piedra-1_juxdcg.webp" />
        </Link>
        <Link to="u/products/search/cat/hamburguesas" className="categories_item">
          <div></div>
          <label>Hamburguesas</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/fotografia-de-hamburguesas_btirdn.jpg" />
        </Link>
        <Link to="u/products/search/cat/lomos" className="categories_item">
          <div></div>
          <label>Lomos</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/IS7T6CMJQBEKDKX3IEKNHTWQEU_wunvc5.webp" />
        </Link>
        <Link to="u/products/search/cat/panchos" className="categories_item">
          <div></div>
          <label>Panchos</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/233556-default_ahldt5.avif" />
        </Link>
        <Link to="u/products/search/cat/minutas" className="categories_item">
          <div></div>
          <label>Minutas</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264946/assets%20for%20elBuenSabor/436282-24a00532-effe-43a2-a025-27d206875cfb_pocuje.jpg" />
        </Link>
        <Link to="u/products/search/cat/empanadas" className="categories_item">
          <div></div>
          <label>Empanadas</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264947/assets%20for%20elBuenSabor/Empanadas-fritas-o-al-horno_akp5we.webp" />
        </Link>
        <Link to="u/products/search/cat/sándwichs" className="categories_item">
          <div></div>
          <label>Sándwichs</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264947/assets%20for%20elBuenSabor/maxresdefault_aoypef.jpg" />
        </Link>
        <Link to="u/products/search/cat/bebidas" className="categories_item">
          <div></div>
          <label>Bebidas</label>
          <img src="https://res.cloudinary.com/dycogxoko/image/upload/v1695264947/assets%20for%20elBuenSabor/mejores-bebidas-isotonicas-1640688481_xyacwv.jpg" />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
