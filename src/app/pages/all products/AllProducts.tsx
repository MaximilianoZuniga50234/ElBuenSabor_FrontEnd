
import "./allproducts.css"
import { Header1 } from "../../components/header/header1/Header1"
import { Link } from "react-router-dom"
import AllProductsCards from "./AllProductsCards"

export default function AllProducts() {

    return (
        <>
            <Header1 />
            <div className="allProducts__container">
                <div className="allProducts__bar">
                    <h4 className="allProducts__bar__title">
                        Filtros
                    </h4>
                    <div className="allProducts__categories__mobile">
                        <select className="allProducts__categories__mobile__select">
                            <option className="allProducts__categories__mobile__option">
                                Filtrar por categoría
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Pizzas
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Hamburguesas
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Lomos
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Panchos
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Minutas
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Empanadas
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Sándwiches
                            </option>
                            <option className="allProducts__categories__mobile__option">
                                Bebidas
                            </option>
                        </select>
                    </div>
                    <div className="allProducts__bar__categories">
                        <h6 className="allProducts__bar__categories__title">
                            Categoría
                        </h6>
                        <ul className="allProducts__bar__ul">
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Pizzas
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Hamburguesas
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Lomos
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Panchos
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Minutas
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Empanadas
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Sándwiches
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Bebidas
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="allProducts__price__mobile">
                        <select className="allProducts__price__mobile__select">
                            <option className="allProducts__price__mobile__option">
                                Ordenar por precio
                            </option>
                            <option className="allProducts__price__mobile__option">
                                Ordenar de menor a mayor
                            </option>
                            <option className="allProducts__price__mobile__option">
                                Ordenar de mayor a menor
                            </option>
                        </select>
                    </div>
                    <div className="allProducts__bar__price">
                        <h6 className="allProducts__bar__price__title">
                            Precio
                        </h6>
                        <ul className="allProducts__bar__ul">
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Ordenar de menor a mayor
                                </Link>
                            </li>
                            <li className="allProducts__bar__li">
                                <Link to="#" className="allProducts__bar__link">
                                    Ordenar de mayor a menor
                                </Link>
                            </li>
                            {/* <li className="allProducts__bar__li allProducts__bar__li--input">
                                <label htmlFor="minimum__input">
                                    Mínimo
                                </label>
                                <input type="number" className="minimum__input" />
                            </li>
                            <li className="allProducts__bar__li allProducts__bar__li--input">
                                <label htmlFor="maximum__input">
                                    Máximo
                                </label>
                                <input type="number" className="maximum__input" />

                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="allProducts__main">
                    <div className="allProducts__main__title">
                        <h1>

                            Todos los productos
                        </h1>
                    </div>
                    <div className="allProducts__main__container">
                        <AllProductsCards />
                    </div>
                </div>
            </div>
        </>
    )
}