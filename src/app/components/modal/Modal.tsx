import { MouseEvent } from "react";
import {
  FaXmark,
  FaArrowRight,
  FaCartShopping,
  FaCircle,
} from "react-icons/fa6";
import { Product } from "../../interfaces/Product";
import "./modal.css";

interface ModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, e?: MouseEvent) => void;
}

const Modal = ({ product, isOpen, onClose, onAddToCart }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          <FaXmark />
        </button>
        <div className="modal_image_container">
          <img
            src={product?.imgUrl}
            alt={product?.denomination}
            className="modal-image"
          />
          <h3 className="estimated-time">
            {product?.estimatedTimeKitchen} min
          </h3>
        </div>
        <div className="modal_info_container">
          <h3>
            <span>{product?.denomination}</span>
          </h3>
          {product?.discountPercentaje === 0 ? (
            <h4 className="modal_price_without_discount">
              Precio: ${product?.salePrice}
            </h4>
          ) : (
            <div className="modal_price_with_discount">
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
          <div className="modal_ingredients_list">
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
      </div>
    </div>
  );
};

export default Modal;
