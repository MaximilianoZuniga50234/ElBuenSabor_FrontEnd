import "./header1.css";
export function Header1() {
  return (
    <div className="header1_header">
      <div className="fondo">
        <h1 className="texto">Tentate con nuestros mejores platos</h1>
        <div className="div_boton">
          <button>Ver productos</button>
        </div>
      </div>
      <div>
        <img
          className="header1_img"
          src="/images/fondo_login.jpg"
          alt="Imagen_fondo"
        />
      </div>
    </div>
  );
}
