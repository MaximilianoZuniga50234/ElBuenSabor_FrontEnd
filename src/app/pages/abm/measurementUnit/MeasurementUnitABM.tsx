import { Suspense, lazy, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaPencilAlt } from "react-icons/fa";
import { Modal, Fade, Box } from "@mui/material";
import { toast } from "sonner";
import {
  addMeasurementUnit,
  getAllMeasurementUnit,
  updateMeasurementUnit,
} from "../../../functions/MeasurementUnitAPI";
import { MeasurementUnit } from "../../../interfaces/MeasurementUnit";
import { useStore as useUser } from "../../../store/CurrentUserStore";
import Loader from "../../../components/loader/Loader";
import "./measurementUnitABM.css";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";

const NoPermissions = lazy(
  () => import("../../../components/noPermissions/NoPermissions")
);

export default function MeasurementUnitABM() {
  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnit[]>(
    []
  );
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>({
    id: 0,
    name: "",
    active: true,
    abbreviation: "",
  });
  const [isNew, setIsNew] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [tokenState, setTokenState] = useState("");
  const { user } = useUser();

  const [paginaActual, setPaginaActual] = useState<number>(1);
  const indiceInicio = (paginaActual - 1) * 10;
  const indiceFin =
    measurementUnits.length < paginaActual * 10
      ? measurementUnits.length
      : paginaActual * 10;

  const elementosPaginaActual = measurementUnits.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(measurementUnits.length / 10))
      : setPaginaActual(paginaActual + n);
  };

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

  const handleAdd = () => {
    setMeasurementUnit({
      id: 0,
      name: "",
      active: true,
      abbreviation: "",
    });
    handleOpen();
    setIsNew(true);
  };

  const handleModify = (measurementUnitParam: MeasurementUnit) => {
    setMeasurementUnit(measurementUnitParam);
    handleOpen();
    setIsNew(false);
  };

  const handleConfirm = async () => {
    if (measurementUnit.name === "") {
      toast.error("El nombre no puede estar vacío.");
    } else {
      if (!isNew) {
        if (measurementUnit) {
          try {
            await updateMeasurementUnit(measurementUnit, tokenState);
            toast.success("Unidad de medida actualizada correctamente");
          } catch (error) {
            toast.error("Error al actualizar la unidad de medida");
          }
        }
      } else {
        if (measurementUnit) {
          try {
            await addMeasurementUnit(measurementUnit, tokenState);
            toast.success("Unidad de medida actualizada correctamente");
          } catch (error) {
            toast.error("Error al actualizar la unidad de medida");
          }
        }
      }
      await getAllItems();
      handleClose();
    }
  };

  const getAllItems = async () => {
    try {
      const response = await getAllMeasurementUnit();
      setMeasurementUnits(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getToken();
  }, [isAuthenticated]);

  useEffect(() => {
    getAllItems();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (measurementUnit) {
      setMeasurementUnit({ ...measurementUnit, name: event.target.value });
    }
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (measurementUnit) {
      const isActive = event.target.value === "De alta";
      setMeasurementUnit({ ...measurementUnit, active: isActive });
    }
  };

  return (
    user?.role &&
    (user?.role === "Administrador" || user?.role === "Cocinero" ? (
      <Suspense fallback={<Loader />}>
        <div className="measurementUnitABM__container">
          <div className="measurementUnitABM__table">
            <div className="measurementUnitABM__header">
              <h1 className="measurementUnitABM__title">Unidades de medida</h1>

              <button
                className="measurementUnitABM__button--header"
                onClick={() => handleAdd()}
              >
                <FaPlus />
                AÑADIR
              </button>
            </div>

            <div className="measurementUnitABM__labels">
              <h4>ID</h4>
              <h4>NOMBRE</h4>
              <h4>ESTADO</h4>
              <h4>MODIFICAR</h4>
            </div>

            <div className="measurementUnitABM__rows__container">
              {elementosPaginaActual.map((measurementUnit: MeasurementUnit) => (
                <div
                  className="measurementUnitABM__row"
                  key={measurementUnit.id}
                >
                  <h4 className="measurementUnitABM__h4">
                    {measurementUnit.id}
                  </h4>
                  <h4 className="measurementUnitABM__h4">
                    {measurementUnit.name}
                  </h4>
                  <h4 className="measurementUnitABM__h4">
                    {measurementUnit.active === true ? "De alta" : "De baja"}
                  </h4>
                  <div className="measurementUnitABM__icon">
                    <button
                      className="measurementUnitABM__button measurementUnitABM__button--icon"
                      onClick={() => handleModify(measurementUnit)}
                    >
                      <FaPencilAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="measurementUnitABM__footer">
            <div className="measurementUnitABM__footer__pagination__info">
              {indiceInicio} - {indiceFin} de {measurementUnits.length}
            </div>
            <div className="measurementUnitABM__footer__pagination__actions">
              {measurementUnits.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronDoubleLeft
                  className="measurementUnitABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(0)}
                />
              )}
              {measurementUnits.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronLeft
                  className="measurementUnitABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(-1)}
                />
              )}
              {measurementUnits.length > 10 &&
                paginaActual !== Math.ceil(measurementUnits.length / 10) && (
                  <HiOutlineChevronRight
                    className="measurementUnitABM__footer__pagination__arrow"
                    onClick={() => handleChangePage(1)}
                  />
                )}
              {measurementUnits.length > 10 &&
                paginaActual !== Math.ceil(measurementUnits.length / 10) && (
                  <HiOutlineChevronDoubleRight
                    className="measurementUnitABM__footer__pagination__arrow"
                    onClick={() => handleChangePage(2)}
                  />
                )}
            </div>
          </div>

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
              <Box className="measurementUnitABM__modal__box">
                <h3 className="measurementUnitABM__modal__h3">
                  {isNew ? "Añadir nueva" : "Modificar"} unidad de medida
                </h3>

                <div className="measurementUnitABM__modal__name">
                  <label htmlFor="measurementUnitABM__modal__input">
                    Nombre de la unidad de medida
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre"
                    className="measurementUnitABM__modal__input"
                    defaultValue={!isNew ? measurementUnit?.name : ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="measurementUnitABM__modal__state">
                  <label htmlFor="measurementUnitABM__modal__select">
                    Estado de la unidad de medida
                  </label>
                  <select
                    className="measurementUnitABM__modal__select"
                    defaultValue={
                      measurementUnit?.active === true ? "De alta" : "De baja"
                    }
                    onChange={handleChangeOption}
                  >
                    <option className="measurementUnitABM__modal__option">
                      De alta
                    </option>
                    <option className="measurementUnitABM__modal__option">
                      De baja
                    </option>
                  </select>
                </div>

                <div className="measurementUnitABM__modal__buttons">
                  <button
                    className="measurementUnitABM__modal__button"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    className="measurementUnitABM__modal__button"
                    onClick={handleConfirm}
                  >
                    Confirmar
                  </button>
                </div>
              </Box>
            </Fade>
          </Modal>
        </div>
      </Suspense>
    ) : (
      <>
        <NoPermissions />
      </>
    ))
  );
}
