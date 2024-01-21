import "./profile.css";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore"
import { useEffect, useState } from "react";
import ModalEditProfile from "../../components/modalEditProfile/ModalEditProfile";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {

  const { user } = useCurrentUser()
  const { isAuthenticated } = useAuth0()
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false)

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  };

  useEffect(() => {
    if (user?.user_metadata?.address?.number != 0) {
      setIsAddressValid(true)
    } else {
      setIsAddressValid(false)
    }

  }, [user])

  return (
    isAuthenticated && user &&
    <main className="profile__main__container">
      <section className="profile__container">
        <h2>Perfil</h2>
        <img
          src={user?.picture}
        />
        <form className="profile__form">
          <div className="profile__form__div">
            <div className="profile__form__div__name">
              <label>Nombre</label>
              <input type="text" readOnly defaultValue={user?.given_name} />
            </div>

            <div className="profile__form__div__familyName">
              <label>Apellido</label>
              <input type="text" readOnly defaultValue={user?.family_name} />
            </div>
          </div>

          <div className="profile__form__div">
            <div className="profile__form__div__address">
              <label>Dirección</label>
              <input type="text" readOnly defaultValue={user?.user_metadata.address && isAddressValid ? `${user?.user_metadata?.address?.street} ${user?.user_metadata?.address?.number}, ${user?.user_metadata?.address?.department}` : ""} />
            </div>

            <div className="profile__form__div__phoneNumber">
              <label>Teléfono</label>
              <input type="text" readOnly defaultValue={user?.user_metadata?.phone_number != 0 ? user?.user_metadata?.phone_number : ""} />
            </div>
          </div>

          <div className="profile__form__div">
            <div className="profile__form__div__email">
              <label>Email</label>
              <input type="text" readOnly defaultValue={user?.email} />
            </div>

            <div className="profile__form__div__role">
              <label>Rol</label>
              <input type="text" readOnly defaultValue={user?.role} />
            </div>
          </div>

        </form>
        <button className="profile__form__button" onClick={handleOpen}>Editar</button>
      </section>
      <ModalEditProfile open={open} setOpen={setOpen}></ModalEditProfile>
    </main>
  );
};

export default Profile;
