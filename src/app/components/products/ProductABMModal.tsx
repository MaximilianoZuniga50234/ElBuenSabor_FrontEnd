import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Box, Fade, Modal } from "@mui/material";
import { toast } from "sonner";
import { FaPenToSquare, FaPlus, FaMinus, FaCaretDown } from "react-icons/fa6";
import { Product, ProductDetail } from "../../interfaces/Product";
import { Stock } from "../../interfaces/Stock";
import { ItemProduct } from "../../interfaces/ItemProduct";
import { getAllIngredients } from "../../functions/StockAPI";
import { getAllItemProduct } from "../../functions/ItemProductAPI";

type Props = {
  open: boolean;
  isNew: boolean;
  product: Product;
  handler: () => void;
  handleProduct: Dispatch<SetStateAction<Product>>;
  handleConfirmProduct: (salePrice: number, image: string | null) => void;
};

const NO_IMAGE_PRODUCT =
  "https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072796/image-2935360_1920_ig8cze_fqw8ji.png";

const SEARCH_DEFAULT = "Buscar ingrediente...";
const DECIMAL_REGEXP = /^[0-9]+(.[0-9]+)?$/;

const ProductABMModal = ({
  open,
  isNew,
  handler,
  product,
  handleProduct,
  handleConfirmProduct,
}: Props) => {
  const [inputKey, setInputKey] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [ingredientSearch, setIngredientSearch] =
    useState<string>(SEARCH_DEFAULT);
  const [allIngredients, setAllIngredients] = useState<Stock[]>([]);
  const [allCategories, setAllCategories] = useState<ItemProduct[]>([]);
  const [select, setSelect] = useState<boolean>(false);
  const [ProductPrice, setProductPrice] = useState<number>(
    product.salePrice | 0
  );

  const filteredIngredients: Stock[] = allIngredients
    .filter((i: Stock) =>
      i.denomination.match(new RegExp(ingredientSearch, "gi"))
    )
    .sort((a, b) => a.denomination.localeCompare(b.denomination));

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setInputKey((prevKey) => prevKey + 1);
        toast.error("Por favor selecciona una imagen.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchAllIngredients = async () => {
    const response = await getAllIngredients();
    setAllIngredients(response);
  };

  const fetchAllCategories = async () => {
    const response = await getAllItemProduct();
    setAllCategories(response);
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    handleProduct({ ...product, [e.target?.name]: e.target?.value });
  };

  const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleProduct({ ...product, active: e.target?.checked });
  };

  const changeCategory = (category: ItemProduct) => {
    handleProduct({ ...product, itemProduct: category });
  };

  const addIngredient = (ingredientName: string) => {
    const newIngredient = allIngredients.find(
      (ingredient: Stock) => ingredient.denomination === ingredientName
    );

    const repeated = product.details.find(
      (detail) => detail.stock?.denomination === ingredientName
    );

    if (newIngredient && !repeated) {
      const newDetail = {
        amount: 0,
        stock: newIngredient,
        product: product,
      };

      handleProduct({ ...product, details: [...product.details, newDetail] });
    }
  };

  const deleteIngredient = (ingredientId: number) => {
    const updatedDetails: ProductDetail[] = product.details.filter(
      (detail) => detail.stock.id !== ingredientId
    );

    handleProduct({ ...product, details: updatedDetails });
  };

  const changeIngredient = (
    e: ChangeEvent<HTMLInputElement>,
    ingredientId: number
  ) => {
    let ingredientQuantity = e.target.value;
    if (ingredientQuantity === "") {
      ingredientQuantity = "0";
    }

    const updatedDetails: ProductDetail[] = product.details.map((detail) => {
      if (detail.stock.id === ingredientId) {
        detail = { ...detail, amount: parseFloat(ingredientQuantity) };
      }
      return detail;
    });

    handleProduct({ ...product, details: updatedDetails });
  };

  const handleSearchIngredient = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIngredientSearch(e.target.value);
  };

  const handleFocusBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault();
    e.type === "focus"
      ? setIngredientSearch("")
      : setIngredientSearch(SEARCH_DEFAULT);
  };

  const verificarAmount = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === "" || !DECIMAL_REGEXP.test(e.target.value)) {
      toast.error(
        "El ingrediente que acaba de modificar tiene una cantidad inválida o está vacío..."
      );
    }
  };

  const handleConfirm = () => {
    if (!product.denomination || product.denomination === "") {
      toast.error("El nombre del producto no puede estar vacío...");
      return;
    }
    if (!product.estimatedTimeKitchen || product.estimatedTimeKitchen < 1) {
      toast.error("El tiempo de cocina no es válido...");
      return;
    }
    if (
      !product.discountPercentaje ||
      product.discountPercentaje < 0 ||
      product.discountPercentaje > 100
    ) {
      toast.error("El porcentaje de descuento no es válido...");
      return;
    }
    if (!product.itemProduct.id) {
      toast.error("Debe seleccionar un rubro para el producto...");
      return;
    }
    if (!product.details || product.details.length === 0) {
      toast.error("El plato debe tener al menos un ingrediente...");
      return;
    }
    if (!product.details.every((detail) => detail.amount)) {
      toast.error("Al menos un ingrediente no tiene cantidad");
      return;
    }
    if (!product.details.every((detail) => detail.amount > 0)) {
      toast.error("Al menos un ingrediente tiene una cantidad menor a cero...");
      return;
    }

    handleConfirmProduct(ProductPrice, image);
    handler();
  };

  const calcProductPrice = () => {
    setProductPrice(
      product.details.reduce((currentPrice: number, detail: ProductDetail) => {
        return (currentPrice += detail.stock.salePrice * detail.amount);
      }, 0)
    );
    console.log(ProductPrice);
  };

  useEffect(() => {
    setSearchActive(ingredientSearch !== SEARCH_DEFAULT);
  }, [ingredientSearch]);

  useEffect(() => {
    calcProductPrice();
  }, [product.details]);

  useEffect(() => {
    fetchAllIngredients();
    fetchAllCategories();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handler}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
      disableScrollLock={true}
    >
      <Fade in={open}>
        <Box className="product_abm_modal_container">
          <h3>{isNew ? "AÑADIR NUEVO PRODUCTO" : "EDITAR PRODUCTO"}</h3>
          <div className="product_abm_modal_body">
            <div className="product_abm_modal_inputs">
              <label>Denominación</label>
              <input
                type="text"
                name="denomination"
                placeholder="Nombre del producto"
                value={product.denomination}
                onChange={changeValue}
              />
              <label>Tiempo de cocina en minutos</label>
              <input
                type="number"
                name="estimatedTimeKitchen"
                placeholder="Minutos de cocción"
                value={product.estimatedTimeKitchen}
                onChange={changeValue}
              />
              <label>Porcentaje de descuento</label>
              <input
                type="number"
                name="discountPercentaje"
                placeholder="Porcentaje de descuento"
                value={product.discountPercentaje}
                onChange={changeValue}
              />
              <label>Rubro</label>
              <div className="product_abm_modal_category_container">
                <div
                  className="product_abm_modal_category_input"
                  onClick={() => setSelect(!select)}
                >
                  <input
                    type="text"
                    readOnly
                    className={select ? "selected" : ""}
                    defaultValue={product.itemProduct.denomination}
                    placeholder="Seleccionar un rubro..."
                  />
                  <FaCaretDown className={`${select ? "selected" : ""}`} />
                </div>
                <ul className={select ? "selected" : ""}>
                  {allCategories.map((category: ItemProduct) => {
                    const liClassName = [
                      product.itemProduct.denomination === category.denomination
                        ? "selected"
                        : "",
                      category.active ? "" : "disabled",
                    ]
                      .join(" ")
                      .trim();

                    return (
                      <li
                        key={category.id}
                        className={liClassName}
                        onClick={() => {
                          changeCategory(category);
                          setSelect(!select);
                        }}
                      >
                        {category.denomination}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="product_abm_modal_switch_box">
                <label className="product_abm_modal_switch_text">Activo</label>
                <div>
                  <input
                    type="checkbox"
                    id="switch"
                    className="product_abm_modal_switch_input"
                    checked={product.active}
                    onChange={changeChecked}
                  />
                  <label
                    htmlFor="switch"
                    className="product_abm_modal_switch_label"
                  ></label>
                </div>
              </div>
            </div>
            <div className="product_abm_modal_details">
              <h4>Gestionar ingredientes</h4>
              <div className="product_abm_modal_details_ingredients">
                <input
                  type="text"
                  className={`product_abm_modal_input_ingredients ${
                    searchActive ? "active" : ""
                  }`}
                  value={ingredientSearch}
                  onChange={handleSearchIngredient}
                  onFocus={handleFocusBlur}
                  onBlur={handleFocusBlur}
                />
                <ul className={searchActive ? "active" : ""}>
                  {filteredIngredients.map((ingredient: Stock) => {
                    return (
                      <li
                        key={ingredient.id}
                        onMouseDown={() => {
                          addIngredient(ingredient.denomination);
                        }}
                        className={ingredient.active ? "" : "disabled"}
                      >
                        {ingredient.denomination}
                      </li>
                    );
                  })}
                </ul>
                <p>Precio de venta: ${ProductPrice}</p>
                <table cellPadding={0} cellSpacing={0}>
                  <tbody>
                    {product.details
                      .sort((a: ProductDetail, b: ProductDetail) =>
                        a.stock?.denomination.localeCompare(
                          b.stock?.denomination
                        )
                      )
                      .map((ingredient) => {
                        return (
                          <tr key={ingredient.stock?.id}>
                            <td>{ingredient.stock?.denomination}</td>
                            <td>
                              <input
                                type="text"
                                onChange={(e) => {
                                  changeIngredient(e, ingredient.stock?.id);
                                }}
                                onBlur={(e) => verificarAmount(e)}
                                defaultValue={ingredient.amount.toString()}
                              />
                            </td>
                            <td>
                              {ingredient.stock?.measurementUnit?.abbreviation}
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  deleteIngredient(ingredient.stock?.id)
                                }
                              >
                                <FaMinus />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="product_abm_modal_image">
              <h4>Seleccionar imagen</h4>
              <input
                type="file"
                id="input_imagen"
                style={{ display: "none" }}
                accept="image/*"
                key={inputKey}
                onChange={handleFileChange}
              />
              <label htmlFor="input_imagen">
                {product.imgUrl === "" && image === null ? (
                  <FaPlus />
                ) : (
                  <FaPenToSquare />
                )}
              </label>
              <img
                src={
                  image
                    ? image
                    : product.imgUrl && product.imgUrl !== ""
                    ? product.imgUrl
                    : NO_IMAGE_PRODUCT
                }
              />
            </div>
            <div className="product_abm_modal_buttons">
              <button
                onClick={() => {
                  handler();
                  setTimeout(() => {
                    setImage(null);
                  }, 300);
                }}
              >
                Cancelar
              </button>
              <button onClick={handleConfirm}>Confirmar</button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductABMModal;
