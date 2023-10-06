import { Product } from "../../interfaces/Product";
import "./Modal.css";
import { BiCartAdd } from "react-icons/bi";

interface ModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const Modal = ({ product, isOpen, onClose, onAddToCart }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
    <div className="modal-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <img
          src={product?.imgUrl}
          alt={product?.denomination}
          className="modal-image"
        />
        <h3 className="estimated-time">
          {product?.estimatedTimeKitchen} min
        </h3>
      <div>
        <div className="modal-info">
          <h3>{product?.denomination}</h3>
          <br />
          <p>Ingredientes:</p>
        </div>
        <div>
          <h4 className="modal-price">${product?.salePrice}</h4>
          <div className="modal-can">
            <p>Cantidad:</p>
            <input type="number" />
            <button
              onClick={() => {
                if (product) onAddToCart(product);
              }}
            >
              <BiCartAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Modal;
