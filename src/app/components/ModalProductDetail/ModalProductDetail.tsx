import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Box, Fade, Modal } from "@mui/material";
import {
  FaXmark,
  FaArrowRight,
  FaCartShopping,
  FaCircle,
} from "react-icons/fa6";
import { Product } from "../../interfaces/Product";
import { Stock } from "../../interfaces/Stock";
import "./modalProductDetail.css";

interface ModalProps {
  product: Product | Stock;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onAddToCart: (
    product: Product | Stock,
    e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
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

  const productObj = product as Product;
  const stockObj = product as Stock;
  const isProduct = product.type === "product";

  const productWithoutStock = productObj.details?.some(
    (detail) => detail.stock.currentStock - detail.amount < 0
  );
  const noStock = stockObj.currentStock - 1 < 0;

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
          <button
            onClick={handleClose}
            className="modalProductDetail__close__button"
          >
            <FaXmark />
          </button>
          <div className="modalProductDetail__image__container">
            <img
              src={product?.imgUrl}
              alt={product?.denomination}
              className="modalProductDetail__image"
            />
            {isProduct && (
              <h3 className="modalProductDetail__estimated__time">
                {productObj?.estimatedTimeKitchen} min
              </h3>
            )}
          </div>
          <div className="modalProductDetail__info__container">
            <h3>
              <span>{product?.denomination}</span>
            </h3>
            {isProduct && productObj?.discountPercentaje != 0 ? (
              <div className="modalProductDetail__price__with__discount">
                <h4>
                  Precio: <s>${product?.salePrice}</s>
                </h4>
                <FaArrowRight />
                <h4>
                  $
                  {product !== null
                    ? product.salePrice -
                      (product.salePrice * productObj.discountPercentaje) / 100
                    : 0}
                </h4>
              </div>
            ) : (
              <h4 className="modalProductDetail__price__without__discount">
                Precio: ${product?.salePrice}
              </h4>
            )}
            {isProduct && (
              <div className="modalProductDetail__ingredients__list">
                <p>Ingredientes:</p>
                <ul>
                  {productObj?.details?.map((i) => {
                    return (
                      <li key={i.stock.id}>
                        <FaCircle />
                        {i.stock.denomination}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {!(noStock || productWithoutStock) && (
              <button
                onClick={() => {
                  if (product) onAddToCart(product);
                }}
              >
                <FaCartShopping />
              </button>
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalProductDetail;
