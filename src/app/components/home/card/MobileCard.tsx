import { PiCookingPot } from "react-icons/pi";
import { Product } from "../../../interfaces/Product";
import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";

type Props = {
  product: Product;
};

const MobileCard = ({ product }: Props) => {
  const [extended, setExtended] = useState<boolean>(false);

  const handleExtendDetails = () => {
    setExtended(!extended);
  };

  return (
    <div className="product_card_mobile" onClick={handleExtendDetails}>
      <div className="product_car_body_mobile">
        <img src={product.imgUrl} alt="product_image_mobile" />
        <div>
          <h2>{product.denomination}</h2>
          <h4>$ {product.salePrice}</h4>
          <span>
            <p>{product.estimatedTimeKitchen} min</p>
            <PiCookingPot />
          </span>
        </div>
      </div>
      <div
        className={`product_car_extend_mobile ${extended ? "extended" : ""}`}
      >
        <h4>Ingredientes</h4>
        <ul>
          {product.details.map((d, index) => (
            <li key={index}>{d.stock.denomination}</li>
          ))}
        </ul>
        <BiCartAdd />
      </div>
    </div>
  );
};

export default MobileCard;
