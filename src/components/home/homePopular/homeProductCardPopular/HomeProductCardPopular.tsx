import "./homeProductCardPopular.css"

const HomeProductCardPopular = () => {
  return (
    <div className="homeProductPopularCardContainer">
      <img
        className="homeProductPopularCardImage"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Eataly_Las_Vegas_-_Feb_2019_-_Sarah_Stierch_12.jpg/1200px-Eataly_Las_Vegas_-_Feb_2019_-_Sarah_Stierch_12.jpg"
        alt="Foto producto"
      />
      <div className="homeProductPopularCardDetail">
        <h3>Nombre producto</h3>
        <div className="homeProductPopularPriceButton">
          <h5>$123</h5>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCardPopular;
