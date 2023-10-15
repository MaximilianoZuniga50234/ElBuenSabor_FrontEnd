import { PiCookingPot } from "react-icons/pi";
import { Product } from "../../../interfaces/Product";

type Props = {
  product: Product;
};

const DesktopCard = ({ product }: Props) => {
  return (
    <div className="product_card_desktop">
      <img src={product.imgUrl} alt="productImage" />
      <div className="product_card_desktop_body">
        <h4>{product.denomination}</h4>
        <p>$ {product.salePrice}</p>
        <span>
          <p>{product.estimatedTimeKitchen} min</p>
          <PiCookingPot />
        </span>
      </div>
    </div>
  );
};

export default DesktopCard;
