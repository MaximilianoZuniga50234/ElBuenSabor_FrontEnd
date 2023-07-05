import "./ProductCart.css"

export function ProductoCart({
    nombreProducto = 'Nombre del Producto', 
    precio ='Precio',
    imagenProducto = 'https://www.clarin.com/img/2022/05/27/0HXb0UR0v_2000x1500__1.jpg'
    }){

    return(
        <>
            <div className="contenedor-producto">
                <img 
                    src={imagenProducto} 
                    alt=""
                    className="imagen-prodcuto" 
                />

                <p className="nombre-producto">{nombreProducto}</p>
                <p className="precio-producto">{precio}</p>


                <div className="container-botones-producto">
                    <button className="left-button-producto">-</button>
                    <span className="text-botones-producto">0</span>
                    <button className="right-button-producto">+</button>
                </div>

                <button
                    className="boton-basura-producto"
                >
                    
                </button>
            </div>
        </>
    )
}

export function Cart(){

    return(
        <>
            <ProductoCart/>
        </>
    )
}