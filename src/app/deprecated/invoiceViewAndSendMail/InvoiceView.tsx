import { PDFViewer, pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import InvoicePdf from "../../components/invoice/InvoicePdf";
import { Invoice } from "../../interfaces/Invoice";
import { getAllInvoice } from "../../functions/InvoiceAPI";
import "./invoice.css";

import { sendEmail } from "../../functions/EmailAPI";

const PURCHASE_ORDER_INITIAL_STATE = {
  id: 0,
  fecha: new Date(),
  number: 0,
  estimatedEndTime: 0,
  shippingType: "",
  paymentMethod: "",
  amountToPaid: 0,
  total: 0,
  active: true,
  person: {
    id: "0",
    name: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    user_id: "",
  },
  address: {
    id: 0,
    street: "",
    number: 0,
    department: { id: 0, name: "" },
    person: {
      id: "0",
      name: "",
      email: "",
      lastName: "",
      phoneNumber: "",
      user_id: "",
    },
  },
  status: { id: 0, status: "" },
  details: null,
};

const INVOICE_INITIAL_STATE = {
  id: 0,
  date: new Date(),
  discountAmount: 0,
  totalSale: 0,
  active: true,
  totalCost: 0,
  purchaseOrder: PURCHASE_ORDER_INITIAL_STATE,
  // mercadoPagoData: null,
  details: [],
};

export default function InvoiceView() {
  const [invoice, setInvoice] = useState<Invoice>(INVOICE_INITIAL_STATE);
  const [pdfBase64, setPdfBase64] = useState<string>("");

  const getInvoice = async () => {
    try {
      const response: Invoice[] = await getAllInvoice();
      setInvoice(response[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (invoice.id === 0) {
      getInvoice();
    } else {
      generatePdfBase64();
    }
  }, [invoice]);

  useEffect(() => {
    console.log(pdfBase64);
  }, [pdfBase64]);

  const generatePdfBase64 = () => {
    const pdfBlob = pdf(<InvoicePdf invoice={invoice} />)
      .toBlob()
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setPdfBase64(base64data);
        };
      });
  };

  return (
    <div className="invoice">
      <button
        onClick={() => {
          sendEmail();
        }}
      >
        Enviar correo
      </button>

      <PDFViewer className="pdf">
        <InvoicePdf invoice={invoice} />
      </PDFViewer>
    </div>
  );
}
