import { FaPencilAlt } from "react-icons/fa"
import { Stock } from "../../../interfaces/Stock"
import "./stockAbm.css"
import { useState, useEffect } from "react"
import { getAllStock } from "../../../functions/StockAPI"
import ModalStock from "../../../components/modal stock/ModalStock"
import ModalStockPurchase from "../../../components/modal stock/ModalStockPurchase"


export default function StockAbm() {

    const [openModalStock, setOpenModalStock] = useState(false);
    const handleOpenModalStock = () => setOpenModalStock(true);
    const handleCloseModalStock = () => setOpenModalStock(false);
    const [isNew, setIsNew] = useState(true);
    const [openModalStockPurchase, setOpenModalStockPurchase] = useState(false);
    const handleOpenModalStockPurchase = () => setOpenModalStockPurchase(true);
    const handleCloseModalStockPurchase = () => setOpenModalStockPurchase(false);

    const stockInitialState: Stock = {
        id: 0,
        denomination: "",
        purchasePrice: 0,
        salePrice: 0,
        currentStock: 0,
        minimumStock: 0,
        isStock: true,
        active: true,
        measurementUnit: { id: 0, name: "", active: true },
        itemStock: { id: 0, name: "", active: true, father: undefined, }
    }

    const [stocks, setStocks] = useState<Stock[]>([stockInitialState])

    const [stock, setStock] = useState<Stock>(stockInitialState)

    const getStocks = async () => {
        const response = await getAllStock()
        setStocks(response)
    }

    useEffect(() => {
        getStocks()
    }, [])

    const handleAdd = () => {
        setStock(stockInitialState);
        handleOpenModalStock();
        setIsNew(true);
    };

    const handleModify = (stockParam: Stock) => {
        setStock(stockParam);
        handleOpenModalStock();
        setIsNew(false);
    };

    const handleRegisterPurchase = () => {
        setStock(stockInitialState);
        handleOpenModalStockPurchase();
    };

    return (
        <div className='stockAbm__container'>
            <div className="stockAbm__table">
                <div className="stockAbm__header">
                    <div className="stockAbm__title">
                        <h1 className="stockAbm__h1">Ingredientes</h1>
                    </div>

                    <div className="stockAbm__buttons__container">
                        <button className="stockAbm__button stockAbm__button--header" onClick={handleRegisterPurchase}>
                            Registrar compra
                        </button>

                        <button className="stockAbm__button stockAbm__button--header"
                            onClick={handleAdd}
                        >
                            Añadir nuevo ingrediente
                        </button>

                    </div>
                </div>

                <div className="stockAbm__labels">
                    <h3 className="stockAbm__h3">Nombre</h3>
                    <h3 className="stockAbm__h3">Rubro</h3>
                    <h3 className="stockAbm__h3">Costo</h3>
                    <h3 className="stockAbm__h3">Stock mínimo</h3>
                    <h3 className="stockAbm__h3">Stock actual</h3>
                    <h3 className="stockAbm__h3">Unidad de medida</h3>
                    <h3 className="stockAbm__h3">Estado</h3>
                    <h3 className="stockAbm__h3">Modificar</h3>
                </div>

                <div className="stockAbm__rows__container">
                    {stocks.map((stock: Stock) => (
                        <div className="stockAbm__row" key={stock.id}>
                            <h4 className="stockAbm__h4">{stock.denomination}</h4>
                            <h4 className="stockAbm__h4">{stock.itemStock?.name}</h4>
                            <h4 className="stockAbm__h4">{stock.purchasePrice}</h4>
                            <h4 className="stockAbm__h4">{stock.minimumStock}</h4>
                            <h4 className="stockAbm__h4">{stock.currentStock}</h4>
                            <h4 className="stockAbm__h4">{stock.measurementUnit.name}</h4>
                            <h4 className="stockAbm__h4">{stock.active === true ? 'De alta' : 'De baja'}</h4>
                            <div className="stockAbm__icon">
                                <button className="stockAbm__button stockAbm__button--icon" onClick={() => { handleModify(stock) }}>
                                    <FaPencilAlt />
                                </button>
                            </div>
                            <div className="stockAbm__icon">

                            </div>
                        </div>
                    ))}

                </div>

            </div>
            <ModalStock
                stock={stock} setStock={setStock} isOpen={openModalStock} handleClose={handleCloseModalStock} isNew={isNew}
            ></ModalStock>

            <ModalStockPurchase
                stock={stock} setStock={setStock} isOpen={openModalStockPurchase} handleClose={handleCloseModalStockPurchase}
            ></ModalStockPurchase>

        </div>
    )
}
