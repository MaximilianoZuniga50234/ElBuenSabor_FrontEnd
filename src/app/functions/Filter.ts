import { Params } from "../interfaces/FilterParams";
import { Product } from "../interfaces/Product";
import { Stock } from "../interfaces/Stock";

const filterByName = (
  productsArray: (Product | Stock)[],
  productName: string
) => {
  return productsArray.filter((item: Product | Stock) =>
    item.denomination.toLowerCase().includes(productName.toLowerCase())
  );
};

const filterByCategory = (
  productsArray: (Product | Stock)[],
  productCategory: string
) => {
  const categoryMapping: { [key: string]: string } = {
    "1": "hamburguesas",
    "2": "pizzas",
    "3": "lomos",
    "4": "panchos",
    "5": "sandwichs",
    "6": "empanadas",
    "7": "minutas",
  };

  return productsArray.filter((item: Product | Stock) => {
    if (productCategory === "8") {
      return item.type === "stock";
    } else {
      if (item.type === "product") {
        const itemProd = item as Product;
        return (
          itemProd.itemProduct.denomination === categoryMapping[productCategory]
        );
      }
    }
    return false;
  });
};

const filterByMinPrice = (
  productsArray: (Product | Stock)[],
  productMinPrice: string
) => {
  return productsArray.filter(
    (item: Product | Stock) => item.salePrice >= parseFloat(productMinPrice)
  );
};

const filterByMaxPrice = (
  productsArray: (Product | Stock)[],
  productMaxPrice: string
) => {
  return productsArray.filter(
    (item: Product | Stock) => item.salePrice <= parseFloat(productMaxPrice)
  );
};

const sortByOrder = (
  productsArray: (Product | Stock)[],
  productOrder: string
) => {
  return productsArray.sort(
    (item1: Product | Stock, item2: Product | Stock) => {
      if (productOrder === "1")
        return item1.denomination.localeCompare(item2.denomination);
      if (productOrder === "2")
        return item2.denomination.localeCompare(item1.denomination);
      if (productOrder === "3") return item1.salePrice - item2.salePrice;
      if (productOrder === "4") return item2.salePrice - item1.salePrice;
      return 0;
    }
  );
};

export const applyFilters = (
  productsToFilter: (Product | Stock)[],
  params: Params
) => {
  if (params.productName !== "")
    productsToFilter = filterByName(productsToFilter, params.productName);
  if (params.productCategory !== "")
    productsToFilter = filterByCategory(
      productsToFilter,
      params.productCategory
    );
  if (params.productMinPrice !== "")
    productsToFilter = filterByMinPrice(
      productsToFilter,
      params.productMinPrice
    );
  if (params.productMaxPrice !== "")
    productsToFilter = filterByMaxPrice(
      productsToFilter,
      params.productMaxPrice
    );
  if (params.productOrder !== "")
    productsToFilter = sortByOrder(productsToFilter, params.productOrder);

  return productsToFilter;
};
