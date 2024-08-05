import { Suspense, lazy, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { FaPencilAlt } from "react-icons/fa";
import { Modal, Fade, Box } from "@mui/material";
import { ItemProduct } from "../../../interfaces/ItemProduct";
import {
  addItemProduct,
  getAllItemProduct,
  updateItemProduct,
} from "../../../functions/ItemProductAPI";
import { useStore as useUser } from "../../../store/CurrentUserStore";
import Loader from "../../../components/loader/Loader";
import "./itemProductABM.css";
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

export default function ItemProductABM() {
  const [itemProducts, setItemProducts] = useState<ItemProduct[]>([]);
  const [itemProduct, setItemProduct] = useState<ItemProduct | null>({
    id: 0,
    denomination: "",
    active: true,
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
    itemProducts.length < paginaActual * 10
      ? itemProducts.length
      : paginaActual * 10;

  const elementosPaginaActual = itemProducts.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(itemProducts.length / 10))
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
    setItemProduct({ id: 0, denomination: "", active: true });
    handleOpen();
    setIsNew(true);
  };

  const handleModify = (itemProductParam: ItemProduct) => {
    setItemProduct(itemProductParam);
    handleOpen();
    setIsNew(false);
  };

  const handleConfirm = async () => {
    if (itemProduct?.denomination === "") {
      toast.error("El nombre no puede estar vacío.");
    } else {
      if (!isNew) {
        if (itemProduct) {
          try {
            await updateItemProduct(itemProduct, tokenState);
            toast.success("Rubro actualizado correctamente");
          } catch (error) {
            toast.error("Error al actualizar el rubro");
          }
        }
      } else {
        if (itemProduct) {
          try {
            await addItemProduct(itemProduct, tokenState);
            toast.success("Rubro creado correctamente");
          } catch (error) {
            toast.error("Error al crear el rubro");
          }
        }
      }
      await getAllItems();
      setItemProduct(null);
      handleClose();
    }
  };

  const getAllItems = async () => {
    try {
      const response = await getAllItemProduct();
      setItemProducts(response);
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
    if (itemProduct) {
      setItemProduct({ ...itemProduct, denomination: event.target.value });
    }
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (itemProduct) {
      const isActive = event.target.value === "De alta";
      setItemProduct({ ...itemProduct, active: isActive });
    }
  };
  return (
    user?.role &&
    (user?.role === "Administrador" || user?.role === "Cocinero" ? (
      <Suspense fallback={<Loader />}>
        <div className="itemProductABM__container">
          <div className="itemProductABM__table">
            <div className="itemProductABM__header">
              <h1 className="itemProductABM__title">Rubros de productos</h1>

              <button
                className="itemProductABM__button itemProductABM__button--header"
                onClick={() => handleAdd()}
              >
                <FaPlus />
                AÑADIR
              </button>
            </div>

            <div className="itemProductABM__labels">
              <h4>ID</h4>
              <h4>NOMBRE</h4>
              <h4>ESTADO</h4>
              <h4>MODIFICAR</h4>
            </div>

            <div className="itemProductABM__rows__container">
              {elementosPaginaActual.map((itemProduct) => (
                <div className="itemProductABM__row" key={itemProduct.id}>
                  <h4 className="itemProductABM__h4">{itemProduct.id}</h4>
                  <h4 className="itemProductABM__h4">
                    {itemProduct.denomination}
                  </h4>
                  <h4 className="itemProductABM__h4">
                    {itemProduct.active === true ? "De alta" : "De baja"}
                  </h4>
                  <div className="itemProductABM__icon">
                    <button
                      className="itemProductABM__button itemProductABM__button--icon"
                      onClick={() => handleModify(itemProduct)}
                    >
                      <FaPencilAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="itemProductABM__footer">
            <div className="itemProductABM__footer__pagination__info">
              {indiceInicio} - {indiceFin} de {itemProducts.length}
            </div>
            <div className="itemProductABM__footer__pagination__actions">
              {itemProducts.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronDoubleLeft
                  className="itemProductABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(0)}
                />
              )}
              {itemProducts.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronLeft
                  className="itemProductABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(-1)}
                />
              )}
              {itemProducts.length > 10 &&
                paginaActual !== Math.ceil(itemProducts.length / 10) && (
                  <HiOutlineChevronRight
                    className="itemProductABM__footer__pagination__arrow"
                    onClick={() => handleChangePage(1)}
                  />
                )}
              {itemProducts.length > 10 &&
                paginaActual !== Math.ceil(itemProducts.length / 10) && (
                  <HiOutlineChevronDoubleRight
                    className="itemProductABM__footer__pagination__arrow"
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
              <Box className="itemProductABM__modal__box">
                <h3 className="itemProductABM__modal__h3">
                  {isNew ? "Añadir nuevo" : "Modificar"} rubro
                </h3>

                <div className="itemProductABM__modal__name">
                  <label htmlFor="itemProductABM__modal__input">
                    Nombre del rubro
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre"
                    className="itemProductABM__modal__input"
                    defaultValue={!isNew ? itemProduct?.denomination : ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="itemProductABM__modal__state">
                  <label htmlFor="itemProductABM__modal__select">
                    Estado del rubro
                  </label>
                  <select
                    className="itemProductABM__modal__select"
                    defaultValue={
                      itemProduct?.active === true ? "De alta" : "De baja"
                    }
                    onChange={handleChangeOption}
                  >
                    <option className="itemProductABM__modal__option">
                      De alta
                    </option>
                    <option className="itemProductABM__modal__option">
                      De baja
                    </option>
                  </select>
                </div>

                <div className="itemProductABM__modal__buttons">
                  <button
                    className="itemProductABM__modal__button"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    className="itemProductABM__modal__button"
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
