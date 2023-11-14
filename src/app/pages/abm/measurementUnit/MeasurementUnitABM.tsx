import "./measurementUnitABM.css"
import { useStore as useMeasurementUnits } from "../../../store/MeasurementUnitStore"
import { FaPencilAlt } from "react-icons/fa"
import { useEffect, useState } from "react";
import { Modal, Fade, Box } from "@mui/material";
import { addMeasurementUnit, updateMeasurementUnit } from "../../../functions/MeasurementUnitAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, Toaster } from "sonner";
import { MeasurementUnit } from "../../../interfaces/MeasurementUnit";

export default function MeasurementUnitABM() {
    const { measurementUnits } = useMeasurementUnits()
    const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>({ id: 0, name: "", active: true })
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
        setMeasurementUnit({ id: 0, name: "", active: true })
        handleOpen()
        setIsNew(true)
    }

    const handleModify = (measurementUnitParam: MeasurementUnit) => {
        setMeasurementUnit(measurementUnitParam)
        handleOpen()
        setIsNew(false)
    }

    const handleConfirm = () => {
        if (!isNew) {
            if (measurementUnit) {
                updateMeasurementUnit(measurementUnit, tokenState)
            }
            handleClose()
            window.location.reload()
        } else {
            if (measurementUnit) {
                addMeasurementUnit(measurementUnit, tokenState)
            }
            handleClose()
            window.location.reload()
        }
    }

    useEffect(() => {
        if (isAuthenticated) getToken()
    }, [])

    useEffect(() => {
        console.log(measurementUnit)
    }, [measurementUnit])


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (measurementUnit) {
            setMeasurementUnit({ ...measurementUnit, name: event.target.value });
        }
    }

    const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (measurementUnit) {
            const isActive = event.target.value === 'De alta';
            setMeasurementUnit({ ...measurementUnit, active: isActive });
        }
    }

    return (
        <div className='measurementUnitABM__container'>
            <div className="measurementUnitABM__table">
                <div className="measurementUnitABM__header">
                    <div className="measurementUnitABM__title">
                        <h1 className="measurementUnitABM__h1">Unidades de medida</h1>
                    </div>

                    <div className="measurementUnitABM__button__container">
                        <button className="measurementUnitABM__button" onClick={() => handleAdd()}>
                            Añadir nueva medida
                        </button>
                    </div>
                </div>

                <div className="measurementUnitABM__labels">
                    <h3 className="measurementUnitABM__h3">Id</h3>
                    <h3 className="measurementUnitABM__h3">Nombre de la unidad de medida</h3>
                    <h3 className="measurementUnitABM__h3">Estado</h3>
                    <h3 className="measurementUnitABM__h3">Modificar</h3>
                </div>

                <div className="measurementUnitABM__rows__container">
                    {measurementUnits.map((measurementUnit: MeasurementUnit) =>
                        <div className="measurementUnitABM__row" key={measurementUnit.id}>
                            <h4 className="measurementUnitABM__h4">{measurementUnit.id}</h4>
                            <h4 className="measurementUnitABM__h4">{measurementUnit.name}</h4>
                            <h4 className="measurementUnitABM__h4">{measurementUnit.active === true ? 'De alta' : 'De baja'}</h4>
                            <div className="measurementUnitABM__icon">
                                <button className="measurementUnitABM__button measurementUnitABM__button--icon" onClick={() => handleModify(measurementUnit)}>
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
                    <Box className='measurementUnitABM__modal__box'>
                        <h3 className="measurementUnitABM__modal__h3">
                            {isNew ? 'Añadir nueva' : 'Modificar'} unidad de medida
                        </h3>

                        <div className="measurementUnitABM__modal__name">
                            <label htmlFor="measurementUnitABM__modal__input">Nombre de la unidad de medida</label>
                            <input type="text"
                                placeholder='Ingrese el nombre'
                                className="measurementUnitABM__modal__input"
                                defaultValue={!isNew ? measurementUnit?.name : ''}
                                onChange={handleInputChange} />
                        </div>

                        <div className="measurementUnitABM__modal__state">

                            <label htmlFor="measurementUnitABM__modal__select">Estado de la unidad de medida</label>
                            <select className="measurementUnitABM__modal__select" defaultValue={measurementUnit?.active === true ? 'De alta' : 'De baja'} onChange={handleChangeOption}>
                                <option className="measurementUnitABM__modal__option">De alta</option>
                                <option className="measurementUnitABM__modal__option">De baja</option>
                            </select>
                        </div>

                        <div className="measurementUnitABM__modal__buttons">
                            <button className="measurementUnitABM__modal__button" onClick={handleClose}>Cancelar</button>
                            <button className="measurementUnitABM__modal__button" onClick={function () {
                                measurementUnit?.name === "" ?
                                    toast.error('El nombre no puede estar vacío.') :
                                    handleConfirm()
                            }
                            }>Confirmar</button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}
