import { CartItem } from "../interfaces/CartItem";
import { PurchaseOrder } from "../interfaces/PurchaseOrder";
import { PurchaseOrderDetail } from "../interfaces/PurchaseOrderDetail";

export async function getAllPurchaseOrder() {
  return await fetch("http://localhost:9000/api/v1/purchaseOrder").then((r) =>
    r.json()
  );
}

export async function getOnePurchaseOrder(id: string) {
  return await fetch(`http://localhost:9000/api/v1/purchaseOrder/${id}`).then(
    (r) => r.json()
  );
}

export async function createPurchaseOrder(cart: CartItem[]) {
  const createOrder = async () => {
    const newOrder = {
      fecha: new Date(),
      number: 0,
      estimatedEndTime: 0,
      shippingType: "Retiro en el local",
      paymentMethod: "Efectivo",
      status: {
        id: 1,
        status: "Por aceptar",
      },
      address: null,
      details: null,
      total: 0,
      user: null,
    } as PurchaseOrder;
    const newOrderDetailList: PurchaseOrderDetail[] = cart.map((item) => {
      return {
        amount: item.amount,
        subtotal: item.amount * item.product.salePrice,
        product: item.product,
        stock: null,
      } as PurchaseOrderDetail;
    });
    newOrder.details = newOrderDetailList;
    newOrder.total = newOrder.details.reduce((acc, s) => {
      return (acc += s.subtotal);
    }, 0);
    return newOrder;
  };

  return await fetch(`http://localhost:9000/api/v1/purchaseOrder`, {
    method: "POST",
    body: JSON.stringify(await createOrder()),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
}
