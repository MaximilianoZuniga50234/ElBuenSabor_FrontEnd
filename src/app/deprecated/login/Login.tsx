import "./login.css";

const Login = () => {
  return (
    <main className="login_page">
      <img src="/images/fondo_login.jpg" alt="Imagen_fondo" />
      <div className="login_container">
        <form className="login_form">
          <div className="login_input_container">
            <input type="text" required />
            <label>E-mail</label>
          </div>
          <div className="login_input_container">
            <input type="password" required />
            <label>Contraseña</label>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
