import "./loader.css";
export default function Loader() {
  return (
    <div className="loader__container">
      <div className="loader__spinner">
        <div className="loader__item loader__item-1"></div>
        <div className="loader__item loader__item-2"></div>
        <div className="loader__item loader__item-3"></div>
        <div className="loader__item loader__item-4"></div>
      </div>
      <h4 className="loader__h4">Cargando...</h4>
    </div>
  );
}
