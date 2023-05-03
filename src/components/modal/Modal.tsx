import "./modal.css";

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
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
