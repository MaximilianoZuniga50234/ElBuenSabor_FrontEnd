import "./header1.css";
export function Header1 () {

    return (
        <>
        <header>
            <div className="fondo">
                <h1 className="texto">
                    Tentate con nuestros mejores platos
                </h1>
                <div className="div_boton">
                    <button>Ver productos</button>
                </div>
            </div>
            <div>
                <h1></h1>
                <img src="/public/images/fondo_login.jpg" alt="Imagen_fondo" />
            </div>
        </header>
        </>
    )
}