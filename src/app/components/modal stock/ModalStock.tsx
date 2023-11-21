import { Toaster, toast } from "sonner"
import "./modalStock.css"
import { Box, Fade, Modal } from "@mui/material"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { ItemStock } from "../../interfaces/ItemStock";
import { MeasurementUnit } from "../../interfaces/MeasurementUnit";
import { getAllItemStock } from "../../functions/ItemStockAPI";
import { getAllMeasurementUnit } from "../../functions/MeasurementUnitAPI";
import { Stock } from "../../interfaces/Stock";
import { useAuth0 } from "@auth0/auth0-react";
import { addStock, updateStock } from "../../functions/StockAPI";

interface ModalStockProps {
    stock: Stock,
    isOpen: boolean,
    handleClose: () => void,
    setStock?: Dispatch<SetStateAction<Stock>>,
    isNew: boolean
}

export default function ModalStock({ stock, setStock, isOpen, handleClose, isNew }: ModalStockProps) {

    const [itemStocks, setItemStocks] = useState<ItemStock[]>([])
    const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnit[]>([]);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [tokenState, setTokenState] = useState("");

    const getToken = async () => {
        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });
            setTokenState(token);
        } catch (error) {
            console.error(error);
        }
    };

    const getItemStocks = async () => {
        const response = await getAllItemStock()
        setItemStocks(response)
    }

    const getMeasurementUnits = async () => {
        const response = await getAllMeasurementUnit()
        setMeasurementUnits(response)
    }

    useEffect(() => {
        if (isAuthenticated) getToken();
        getItemStocks()
        getMeasurementUnits()
    }, [])

    useEffect(() => {
        if (itemStocks.length > 0 && measurementUnits.length > 0 && setStock) {
            setStock({ ...stock, itemStock: itemStocks[0], measurementUnit: measurementUnits[0] })
        }
    }, [isOpen])

    const handleConfirm = () => {
        if (!isNew) {
            updateStock(stock, tokenState)
        } else {
            addStock(stock, tokenState)
        }
        handleClose();
        window.location.reload();
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (stock && setStock) {
            setStock({ ...stock, denomination: event.target.value });
        }
    }

    const handleChangeItemStock = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const itemStock = itemStocks.find(
            (itemStock) => itemStock.name === event.target.value
        );
        if (stock && setStock) {
            setStock({ ...stock, itemStock: itemStock });
        }
    }

    const handleChangeMinimumStock = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (stock && setStock) {
            setStock({ ...stock, minimumStock: Number(event.target.value) });
        }
    }

    const handleChangeCurrentStock = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (stock && setStock) {
            setStock({ ...stock, currentStock: Number(event.target.value) });
        }
    }

    const handleChangeMeasurementUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const measurementUnit = measurementUnits.find(
            (measurementUnit) => measurementUnit.name === event.target.value
        );
        if (stock && measurementUnit && setStock) {
            setStock({ ...stock, measurementUnit: measurementUnit });
        }
    }

    const handleChangeActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const isActive = event.target.value === "De alta";
        if (stock && setStock) {
            setStock({ ...stock, active: isActive });
        }
    }

    return (
        <>
            <Toaster position="top-center" richColors visibleToasts={1} />
            <Modal
                open={isOpen}
                onClose={handleClose}
                slotProps={{
                    backdrop: {
                        timeout: 300,
                    },
                }}
                disableScrollLock={true}
            >
                <Fade in={isOpen}>
                    <Box className='modalStock__box'>
                        <h3 className="modalStock__h3">
                            {
                                isNew === true ?
                                    "Añadir ingrediente" :
                                    "Modificar Ingrediente"
                            }
                        </h3>

                        <div className="modalStock__name">
                            <label htmlFor="modalStock__input">Nombre del ingrediente</label>
                            <input type="text"
                                className="modalStock__input"
                                defaultValue={stock.denomination}
                                onChange={handleChangeName}
                                placeholder="Ingese el nombre del ingrediente"
                            />
                        </div>

                        <div className="modalStock__itemStock">
                            <label htmlFor="modalStock__select">Seleccionar rubro</label>
                            <select className="modalStock__select"
                                defaultValue={stock?.itemStock?.name}
                                onChange={handleChangeItemStock}
                            >
                                {itemStocks.map((itemStock: ItemStock) => (
                                    <option className="modalStock__option" key={itemStock.id}>{itemStock.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modalStock__minimumStock">
                            <label htmlFor="modalStock__input">Stock mínimo</label>
                            <input type="number"
                                className="modalStock__input"
                                defaultValue={stock.minimumStock}
                                min={0}
                                onChange={handleChangeMinimumStock}
                            />
                        </div>

                        <div className="modalStock__currentStock">
                            <label htmlFor="modalStock__input">Stock actual</label>
                            <input type="number"
                                className="modalStock__input"
                                defaultValue={stock.currentStock}
                                min={0}
                                onChange={handleChangeCurrentStock}
                            />
                        </div>


                        <div className="modalStock__measurementUnit">
                            <label htmlFor="modalStock__select">Seleccionar unidad de medida</label>
                            <select className="modalStock__select"
                                defaultValue={stock?.measurementUnit.name}
                                onChange={handleChangeMeasurementUnit}
                            >
                                {measurementUnits.map((measurementUnit: MeasurementUnit) => (
                                    <option className="modalStock__option" key={measurementUnit.id}>{measurementUnit.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modalStock__state">
                            <label htmlFor="modalStock__select">Seleccionar estado</label>
                            <select className="modalStock__select"
                                defaultValue={stock?.active === true ? 'De alta' : 'De baja'}
                                onChange={handleChangeActive}
                            >
                                <option className="modalStock__option" >De alta</option>
                                <option className="modalStock__option" >De baja</option>
                            </select>
                        </div>

                        <div className="modalStock__buttons">
                            <button className="modalStock__button" onClick={() => { handleClose() }}>Cancelar</button>
                            <button className="modalStock__button" onClick={function () {
                                stock.denomination === "" ?
                                    toast.error('El nombre no puede estar vacío.') :
                                    handleConfirm()
                            }
                            }>Confirmar</button>
                        </div>
                    </Box>
                </Fade>
            </Modal >
        </>
    )
}
