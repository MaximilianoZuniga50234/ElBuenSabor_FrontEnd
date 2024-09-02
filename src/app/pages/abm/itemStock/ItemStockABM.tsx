import { Suspense, lazy, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Fade, Modal } from "@mui/material";
import { toast } from "sonner";
import { FaPencilAlt } from "react-icons/fa";
import { ItemStock } from "../../../interfaces/ItemStock";
import {
  addItemStock,
  getAllItemStock,
  updateItemStock,
} from "../../../functions/ItemStockAPI";
import { useStore as useUser } from "../../../store/CurrentUserStore";
import Loader from "../../../components/loader/Loader";
import "./itemStockABM.css";
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

export default function ItemStockABM() {
  const [itemStocks, setItemStocks] = useState<ItemStock[]>([]);
  const [itemStock, setItemStock] = useState<ItemStock | null>({
    id: 0,
    name: "",
    active: true,
    father: undefined,
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
    itemStocks.length < paginaActual * 10
      ? itemStocks.length
      : paginaActual * 10;

  const elementosPaginaActual = itemStocks.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(itemStocks.length / 10))
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
    if (itemStock) {
      setItemStock({ id: 0, name: "", active: true, father: undefined });
    }
    handleOpen();
    setIsNew(true);
  };

  const handleModify = (itemStockParam: ItemStock) => {
    let father: ItemStock | undefined;
    if (typeof itemStockParam.father?.name === "string") {
      father = itemStocks.find(
        (itemStock) => itemStock.name === itemStockParam.father?.name
      );
    } else {
      father = itemStocks.find(
        (itemStock) => itemStock.name === itemStockParam.father?.toString()
      );
    }

    if (itemStock) {
      setItemStock({ ...itemStockParam, father: father });
    }
    handleOpen();
    setIsNew(false);
  };

  const handleConfirm = async () => {
    if (itemStock?.name === "") {
      toast.error("El nombre no puede estar vacío.");
    } else {
      if (!isNew) {
        if (itemStock) {
          try {
            await updateItemStock(itemStock, tokenState);
            toast.success("Rubro actualizado correctamente");
          } catch (error) {
            toast.error("Error al actualizar el rubro");
          }
        }
      } else {
        if (itemStock) {
          try {
            await addItemStock(itemStock, tokenState);
            toast.success("Rubro creado correctamente");
          } catch (error) {
            toast.error("Error al crear el rubro");
          }
        }
      }
      await getAllItems();
      handleClose();
    }
  };

  const getAllItems = async () => {
    try {
      const response = await getAllItemStock();
      setItemStocks(response);
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
    if (itemStock) {
      setItemStock({ ...itemStock, name: event.target.value });
    }
  };

  const handleChangeFather = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const father = itemStocks.find(
      (itemStock) => itemStock.name === event.target.value
    );
    if (itemStock) {
      setItemStock({ ...itemStock, father: father });
    }
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (itemStock) {
      const isActive = event.target.value === "De alta";
      setItemStock({ ...itemStock, active: isActive });
    }
  };

  return (
    user?.role &&
    (user?.role === "Administrador" || user?.role === "Cocinero" ? (
      <Suspense fallback={<Loader />}>
        <div className="itemStockABM__container">
          <div className="itemStockABM__table">
            <div className="itemStockABM__header">
              <h2 className="itemStockABM__title">Rubros de ingredientes</h2>

              <button
                className="itemStockABM__button--header"
                onClick={() => handleAdd()}
              >
                <FaPlus />
                AÑADIR
              </button>
            </div>

            <div className="itemStockABM__labels">
              <h4>ID</h4>
              <h4>NOMBRE</h4>
              <h4>CATEGORÍA</h4>
              <h4>ESTADO</h4>
              <h4>MODIFICAR</h4>
            </div>

            <div className="itemStockABM__rows__container">
              {elementosPaginaActual.map((itemStock) => (
                <div className="itemStockABM__row" key={itemStock.id}>
                  <h4 className="itemStockABM__h4">{itemStock.id}</h4>
                  <h4 className="itemStockABM__h4">{itemStock.name}</h4>
                  <h4 className="itemStockABM__h4">
                    {itemStock.father
                      ? itemStock.father?.name
                      : "Sin categoría"}
                  </h4>
                  <h4 className="itemStockABM__h4">
                    {itemStock.active === true ? "De alta" : "De baja"}
                  </h4>
                  <div className="itemStockABM__icon">
                    <button
                      className="itemStockABM__button itemStockABM__button--icon"
                      onClick={() => handleModify(itemStock)}
                    >
                      <FaPencilAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="itemStockABM__footer">
            <div className="itemStockABM__footer__pagination__info">
              {indiceInicio} - {indiceFin} de {itemStocks.length}
            </div>
            <div className="itemStockABM__footer__pagination__actions">
              {itemStocks.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronDoubleLeft
                  className="itemStockABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(0)}
                />
              )}
              {itemStocks.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronLeft
                  className="itemStockABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(-1)}
                />
              )}
              {itemStocks.length > 10 &&
                paginaActual !== Math.ceil(itemStocks.length / 10) && (
                  <HiOutlineChevronRight
                    className="itemStockABM__footer__pagination__arrow"
                    onClick={() => handleChangePage(1)}
                  />
                )}
              {itemStocks.length > 10 &&
                paginaActual !== Math.ceil(itemStocks.length / 10) && (
                  <HiOutlineChevronDoubleRight
                    className="itemStockABM__footer__pagination__arrow"
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
              <Box className="itemStockABM__modal__box">
                <h3 className="itemStockABM__modal__h3">
                  {isNew ? "Añadir nuevo" : "Modificar"} rubro
                </h3>

                <div className="itemStockABM__modal__name">
                  <label htmlFor="itemStockABM__modal__input">
                    Nombre del rubro
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre"
                    className="itemStockABM__modal__input"
                    defaultValue={!isNew ? itemStock?.name : ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="itemStockABM__modal__father">
                  <label htmlFor="itemStockABM__modal__select">Categoría</label>
                  <select
                    className="itemStockABM__modal__select"
                    defaultValue={
                      itemStock?.father
                        ? itemStock?.father?.name
                        : itemStock?.name
                    }
                    onChange={handleChangeFather}
                  >
                    <option className="itemStockABM__modal__option" key={0}>
                      Sin categoría
                    </option>
                    {itemStocks?.map((i) => {
                      if (i.id !== itemStock?.id)
                        return (
                          <option
                            className="itemStockABM__modal__option"
                            key={i.id}
                          >
                            {i.name}
                          </option>
                        );
                    })}
                  </select>
                </div>

                <div className="itemStockABM__modal__state">
                  <label htmlFor="itemStockABM__modal__select">
                    Estado del rubro
                  </label>
                  <select
                    className="itemStockABM__modal__select"
                    defaultValue={
                      itemStock?.active === true ? "De alta" : "De baja"
                    }
                    onChange={handleChangeOption}
                  >
                    <option className="itemStockABM__modal__option">
                      De alta
                    </option>
                    <option className="itemStockABM__modal__option">
                      De baja
                    </option>
                  </select>
                </div>

                <div className="itemStockABM__modal__buttons">
                  <button
                    className="itemStockABM__modal__button"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    className="itemStockABM__modal__button"
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
