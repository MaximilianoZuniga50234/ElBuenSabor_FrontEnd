import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { ArticuloManufacturado } from "../../interface/ArticuloManufacturado";
import "./AllProducts.css";

const AllProducts = () => {
  const articuloManufacturadoArray = useSelector(
    (state: RootState) => state.articuloManufacturado
  );

  return (
    <div className="container-fluid" id="contenedorProductos">
      <div className="row" id="filaContenedora">
        <div className="col-2" id="barraLateral">
          <div id="divBarra">
            <h4 className="text-center">EL Buen Sabor</h4>
            <h5 className="text-center">Categorías</h5>
            <ul>
              <li>Pizzas</li>
              <li>Hamburguesas</li>
              <li>papas</li>
              <li>Lomos</li>
            </ul>

            <h5 className="text-center">Precio</h5>
            <ul>
              <li>Ordenar de mayor a menor</li>
              <li>Ordenar de menor a mayor </li>
            </ul>
          </div>
        </div>
        <div className="col-10" id="colProductos">
          <div className="row text-center">
            <h1>Todos los productos</h1>
          </div>
          <div className="row">
            {articuloManufacturadoArray.map(
              (articuloManufacturado: ArticuloManufacturado) => (
                <div
                  className="col-4"
                  key={articuloManufacturado.idArticuloManufacturado}
                >
                  <div className="card">
                    <img
                      src={articuloManufacturado.imagenManufacturado}
                      className="card-img-top"
                      alt="..."
                      width="245px"
                      height="150px"
                    />
                    <div className="card-body">
                      <div className="row text-center">
                        <h5>
                          {articuloManufacturado.denominacion_Manufacturado}
                        </h5>
                      </div>
                      <div className="row text-center ">
                        <div className="col-6">
                          <h4>
                            ${articuloManufacturado.precioVentaManufacturado}
                          </h4>
                        </div>
                        <div className="col-6">
                          <img
                            src="./images/AllProducts/carritoAzul.png"
                            alt="..."
                            height="32px"
                            width="32px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
