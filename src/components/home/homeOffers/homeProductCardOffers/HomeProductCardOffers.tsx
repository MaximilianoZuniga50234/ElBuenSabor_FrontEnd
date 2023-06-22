import "./homeProductCardOffers.css";

const HomeProductCardOffers = () => {
  return (
    <div className="homeProductOffersCardContainer">
      <div className="homeProductOffersCardImageDetail">
        <img
          className="homeProductOffersCardImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Eataly_Las_Vegas_-_Feb_2019_-_Sarah_Stierch_12.jpg/1200px-Eataly_Las_Vegas_-_Feb_2019_-_Sarah_Stierch_12.jpg"
          alt="Foto producto"
        />
        <h4 className="homeProductOffersCardDiscount">%10</h4>
      </div>
      <div className="homeProductOffersCardDetail">
        <h3>Pizza muzzarella</h3>
        <div className="homeProductOffersPriceButton">
          <div>
            <h5>$123</h5>
            <h5 className="homeProductOffersCardOldPrice">$123</h5>
          </div>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCardOffers;
