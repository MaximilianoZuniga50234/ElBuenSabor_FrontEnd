import "./profile.css";

const Profile = () => {
  return (
    <main className="profile_main_container">
      <section className="profile_container">
        <h2>Perfil</h2>
        <img
          src="https://res.cloudinary.com/dycogxoko/image/upload/v1695236534/assets%20for%20elBuenSabor/cnw3rfld20mwipmfdngl.png"
          alt="profile_image"
        />
        <form className="profile_form">
          <div>
            <input type="text" readOnly />
            <label>Nombre</label>
            <input type="text" readOnly />
            <label>Apellido</label>
          </div>
          <input type="text" readOnly />
          <label>Usuario</label>
          <input type="text" readOnly />
          <label>Telefono</label>
        </form>
        <button>Editar</button>
      </section>
    </main>
  );
};

export default Profile;
