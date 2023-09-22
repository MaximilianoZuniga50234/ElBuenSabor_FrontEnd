import "./register.css";

const Register = () => {
  return (
    <main className="register_page">
      <img src="/images/fondo_login.jpg" alt="Imagen_fondo" />
      <div className="register_container">
        <form className="register_form">
          <div className="register_input_container">
            <input type="text" required />
            <label>Nombre</label>
          </div>
          <div className="register_input_container">
            <input type="text" required />
            <label>Apellido</label>
          </div>
          <div className="register_input_container">
            <input type="text" required />
            <label>E-mail</label>
          </div>
          <div className="register_input_container">
            <input type="text" required />
            <label>Teléfono</label>
          </div>
          <div className="register_input_container">
            <input type="text" required />
            <label>Dirección</label>
          </div>
          <div className="register_input_container">
            <input type="text" required />
            <label>Domicilio</label>
          </div>
          <div className="register_input_container">
            <input type="password" required />
            <label>Contraseña</label>
          </div>
          <div className="register_input_container">
            <input type="password" required />
            <label>Confirmar contraseña</label>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
