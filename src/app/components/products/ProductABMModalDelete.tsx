import { Box, Fade, Modal } from "@mui/material";
import { Product } from "../../interfaces/Product";

type Props = {
  open: boolean;
  handler: () => void;
  product: Product;
  handleDeactive: () => void;
};

const ProductABMModalDelete = ({
  open,
  handler,
  product,
  handleDeactive,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={handler}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
      disableScrollLock={true}
    >
      <Fade in={open}>
        <Box className="product_abm_modal_delete_container">
          <h2 className="product_abm_modal_delete_title">
            ¿Dar de baja el producto "{product?.denomination}"?
          </h2>
          <div className="product_abm_modal_delete_buttons">
            <button onClick={() => handler()}>Cancelar</button>
            <button onClick={() => handleDeactive()}>Confirmar</button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductABMModalDelete;
