import { Suspense, lazy, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
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

  const handleConfirm = () => {
    if (!isNew) {
      if (itemProduct) {
        updateItemProduct(itemProduct, tokenState);
      }
      handleClose();
      setItemProduct(null);
      window.location.reload();
    } else {
      if (itemProduct) {
        addItemProduct(itemProduct, tokenState);
      }
      handleClose();
      setItemProduct(null);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isAuthenticated) getToken();
    const getAllItems = async () => {
      try {
        const response = await getAllItemProduct();
        setItemProducts(response);
      } catch (error) {
        console.error("Error", error);
      }
    };

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
  return user?.role === "Administrador" || user?.role === "Cocinero" ? (
    <Suspense fallback={<Loader />}>
      <div className="itemProductABM__container">
        <div className="itemProductABM__table">
          <div className="itemProductABM__header">
            <div className="itemProductABM__title">
              <h1 className="itemProductABM__h1">Rubros de productos</h1>
            </div>

            <div className="itemProductABM__button__container">
              <button
                className="itemProductABM__button"
                onClick={() => handleAdd()}
              >
                Añadir nuevo rubro
              </button>
            </div>
          </div>

          <div className="itemProductABM__labels">
            <h3 className="itemProductABM__h3">Id</h3>
            <h3 className="itemProductABM__h3">Nombre del rubro</h3>
            <h3 className="itemProductABM__h3">Estado</h3>
            <h3 className="itemProductABM__h3">Modificar</h3>
          </div>

          <div className="itemProductABM__rows__container">
            {itemProducts.map((itemProduct) => (
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
                  onClick={function () {
                    itemProduct?.denomination === ""
                      ? toast.error("El nombre no puede estar vacío.")
                      : handleConfirm();
                  }}
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
  );
}
