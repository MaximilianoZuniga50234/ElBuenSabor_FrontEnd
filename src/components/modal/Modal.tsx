import "./modal.css";
import { FiXSquare } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  children: any;
}

const Modal = ({ isOpen, closeModal, children }: Props) => {
  return (
    <div className="modalMain" style={{ display: isOpen ? "grid" : "none" }}>
      <div className="modalContainer">
        <button className="modalCloseButton" onClick={closeModal}>
          <FiXSquare />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
