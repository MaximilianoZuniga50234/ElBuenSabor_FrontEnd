import "./itemStockABM.css"
import { useStore as useItemStocks } from "../../../store/ItemStockStore"
import { FaPencilAlt } from "react-icons/fa"
import { Box, Fade, Modal } from "@mui/material"
import { Toaster, toast } from "sonner"
import { useEffect, useState } from "react"
import { ItemStock } from "../../../interfaces/ItemStock"
import { useAuth0 } from "@auth0/auth0-react"
import { addItemStock, updateItemStock } from "../../../functions/ItemStockAPI"


export default function ItemStockABM() {

    const { itemStocks } = useItemStocks()
    const [itemStock, setItemStock] = useState<ItemStock | null>({ id: 0, name: "", active: true, father: undefined })
    const [isNew, setIsNew] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [tokenState, setTokenState] = useState("")

    const getToken = async () => {
        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });
            setTokenState(token);
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleAdd = () => {
        const father = itemStocks[0];
        if (itemStock) {
            setItemStock({ id: 0, name: "", active: true, father: father });
        }
        handleOpen()
        setIsNew(true)
    }

    const handleModify = (itemStockParam: ItemStock) => {
        const father = itemStocks.find((itemStock) => itemStock.name === itemStockParam.father?.toString());
        if (itemStock) {
            setItemStock({ ...itemStockParam, father: father });
        }
        handleOpen()
        setIsNew(false)
    }

    const handleConfirm = () => {
        if (!isNew) {
            if (itemStock) {
                updateItemStock(itemStock, tokenState)
            }

        } else {
            if (itemStock) {
                addItemStock(itemStock, tokenState)
            }

        }
        handleClose()
        window.location.reload()
    }

    useEffect(() => {
        if (isAuthenticated) getToken()
    }, [])

    useEffect(() => {
        console.log(itemStock)
    }, [itemStock])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (itemStock) {
            setItemStock({ ...itemStock, name: event.target.value });
        }
    }

    const handleChangeFather = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const father = itemStocks.find((itemStock) => itemStock.name === event.target.value);
        if (itemStock) {
            setItemStock({ ...itemStock, father: father });
        }
    }

    const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (itemStock) {
            const isActive = event.target.value === 'De alta';
            setItemStock({ ...itemStock, active: isActive });
        }
    }

    return (
        <div className='itemStockABM__container'>
            <div className="itemStockABM__table">
                <div className="itemStockABM__header">
                    <div className="itemStockABM__title">
                        <h1 className="itemStockABM__h1">Rubros de ingredientes</h1>
                    </div>

                    <div className="itemStockABM__button__container">
                        <button className="itemStockABM__button" onClick={() => handleAdd()}>
                            Añadir nuevo rubro
                        </button>
                    </div>
                </div>

                <div className="itemStockABM__labels">
                    <h3 className="itemStockABM__h3">Id</h3>
                    <h3 className="itemStockABM__h3">Nombre del rubro</h3>
                    <h3 className="itemStockABM__h3">Padre</h3>
                    <h3 className="itemStockABM__h3">Estado</h3>
                    <h3 className="itemStockABM__h3">Modificar</h3>
                </div>

                <div className="itemStockABM__rows__container">
                    {itemStocks.map(itemStock =>
                        <div className="itemStockABM__row" key={itemStock.id}>
                            <h4 className="itemStockABM__h4">{itemStock.id}</h4>
                            <h4 className="itemStockABM__h4">{itemStock.name}</h4>
                            <h4 className="itemStockABM__h4">{itemStock.father?.toString()}</h4>
                            <h4 className="itemStockABM__h4">{itemStock.active === true ? 'De alta' : 'De baja'}</h4>
                            <div className="itemStockABM__icon">
                                <button className="itemStockABM__button itemStockABM__button--icon" onClick={() => handleModify(itemStock)}>
                                    <FaPencilAlt />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <Toaster position="top-center" richColors visibleToasts={1} />
            <Modal
                open={open}
                onClose={handleClose}
                slotProps={{
                    backdrop: {
                        timeout: 300,
                    },
                }}
                disableScrollLock={true}
            >
                <Fade in={open}>
                    <Box className='itemStockABM__modal__box'>
                        <h3 className="itemStockABM__modal__h3">
                            {isNew ? 'Añadir nuevo' : 'Modificar'} rubro
                        </h3>

                        <div className="itemStockABM__modal__name">
                            <label htmlFor="itemStockABM__modal__input">Nombre del rubro</label>
                            <input type="text"
                                placeholder='Ingrese el nombre'
                                className="itemStockABM__modal__input"
                                defaultValue={!isNew ? itemStock?.name : ''}
                                onChange={handleInputChange} />
                        </div>

                        <div className="itemStockABM__modal__father">

                            <label htmlFor="itemStockABM__modal__select">Rubro Padre</label>
                            <select className="itemStockABM__modal__select" defaultValue={itemStock?.father ? itemStock?.father?.name : "Carne"} onChange={handleChangeFather}>
                                {itemStocks?.map(itemStock =>
                                    <option className="itemStockABM__modal__option" key={itemStock.id}>{itemStock.name}</option>
                                )}
                            </select>
                        </div>

                        <div className="itemStockABM__modal__state">

                            <label htmlFor="itemStockABM__modal__select">Estado del rubro</label>
                            <select className="itemStockABM__modal__select" defaultValue={itemStock?.active === true ? 'De alta' : 'De baja'} onChange={handleChangeOption}>
                                <option className="itemStockABM__modal__option">De alta</option>
                                <option className="itemStockABM__modal__option">De baja</option>
                            </select>
                        </div>

                        <div className="itemStockABM__modal__buttons">
                            <button className="itemStockABM__modal__button" onClick={handleClose}>Cancelar</button>
                            <button className="itemStockABM__modal__button" onClick={function () {
                                itemStock?.name === "" ?
                                    toast.error('El nombre no puede estar vacío.') :
                                    handleConfirm()
                            }
                            }>Confirmar</button>
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}
