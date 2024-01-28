import { useAuth0 } from "@auth0/auth0-react";
import { Box, Fade, Modal } from "@mui/material";
import "./modalEmployeeInauthorized.css";
type Props = {
  open: boolean;
};

export default function ModalEmployeeInauthorized({ open }: Props) {
  const { logout } = useAuth0();

  const handleLogOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
      disableScrollLock={true}
    >
      <Fade in={open}>
        <Box className="modalEmployeeInauthorized__box">
          <h2 className="modalEmployeeInauthorized__title">
            Lo sentimos. Estás dado de baja del sistema, por lo que no puedes
            ingresar. Cambia de cuenta para poder navegar sin problemas.
          </h2>

          <button
            className="modalEmployeeInauthorized__button"
            onClick={handleLogOut}
          >
            Cerrar sesión
          </button>
        </Box>
      </Fade>
    </Modal>
  );
}
