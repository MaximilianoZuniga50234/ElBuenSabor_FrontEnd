import { Dispatch, MouseEvent, SetStateAction } from "react";
import {
  FaXmark,
  FaArrowRight,
  FaCartShopping,
  FaCircle,
} from "react-icons/fa6";
import { Product } from "../../interfaces/Product";
import "./modalProductDetail.css";
import { Box, Fade, Modal } from "@mui/material";

interface ModalProps {
  product: Product | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onAddToCart: (product: Product, e?: MouseEvent) => void;
}

const ModalProductDetail = ({
  product,
  open,
  setOpen,
  onAddToCart,
}: ModalProps) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
        <Box className="modalProductDetail__box">
          <button onClick={handleClose} className="modalProductDetail__close__button">
            <FaXmark />
          </button>
          <div className="modalProductDetail__image__container">
            <img
              src={product?.imgUrl}
              alt={product?.denomination}
              className="modalProductDetail__image"
            />
            <h3 className="modalProductDetail__estimated__time">
              {product?.estimatedTimeKitchen} min
            </h3>
          </div>
          <div className="modalProductDetail__info__container">
            <h3>
              <span>{product?.denomination}</span>
            </h3>
            {product?.discountPercentaje === 0 ? (
              <h4 className="modalProductDetail__price__without__discount">
                Precio: ${product?.salePrice}
              </h4>
            ) : (
              <div className="modalProductDetail__price__with__discount">
                <h4>
                  Precio: <s>${product?.salePrice}</s>
                </h4>
                <FaArrowRight />
                <h4>
                  $
                  {product !== null
                    ? product.salePrice * (1 - product.discountPercentaje / 100)
                    : 0}
                </h4>
              </div>
            )}
            <div className="modalProductDetail__ingredients__list">
              <p>Ingredientes:</p>
              <ul>
                {product?.details.map((i) => {
                  return (
                    <li key={i.stock.id}>
                      <FaCircle />
                      {i.stock.denomination}
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              onClick={() => {
                if (product) onAddToCart(product);
              }}
            >
              <FaCartShopping />
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalProductDetail;
