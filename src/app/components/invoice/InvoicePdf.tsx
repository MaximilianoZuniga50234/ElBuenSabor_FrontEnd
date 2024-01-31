import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Invoice } from "../../interfaces/Invoice";
import { useEffect, useState } from "react";

interface Props {
  invoice: Invoice;
}

const styles = StyleSheet.create({
  img: { objectFit: "contain", width: "100px" },
  container: { display: "flex", flexDirection: "column" },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "30px",
    alignItems: "center",
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginHorizontal: "30px",
    paddingVertical: "30px",
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginHorizontal: "30px",
    paddingVertical: "30px",
    textAlign: "center",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    padding: "5px",
  },
  tableContent: {
    display: "flex",
    flexDirection: "row",
    padding: "5px",
  },
});

export default function InvoicePdf({ invoice }: Props) {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (invoice && !date) {
      setDate(invoice.date.toLocaleDateString());
    }
  }, [invoice, date]);

  return (
    <Document>
      <Page style={styles.container}>
        <View style={styles.header}>
          <Image src="/images/logo.png" style={styles.img} />

          <View style={styles.headerInfo}>
            <Text style={{ fontSize: "15px" }}>El Buen Sabor</Text>
            <Text style={{ fontSize: "15px" }}>Calle Rodriguez 273</Text>
            <Text style={{ fontSize: "15px" }}>Ciudad, Mendoza</Text>
            <Text style={{ fontSize: "15px" }}>2634123456</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={{ fontSize: "15px" }}>Factura N° {invoice.id}</Text>
          <Text style={{ fontSize: "15px" }}>Fecha: {date}</Text>
          <Text style={{ marginTop: "10px", fontSize: "15px" }}>
            {`${invoice.purchaseOrder.person?.name} ${invoice.purchaseOrder.person?.lastName} `}
          </Text>
          <Text style={{ marginTop: "3px", fontSize: "15px" }}>
            {/* {" "} */}
            {invoice.purchaseOrder.person?.phoneNumber}
          </Text>
          <Text style={{ marginTop: "3px", fontSize: "15px" }}>
            {`${invoice.purchaseOrder.address?.street} ${invoice.purchaseOrder.address?.number}, ${invoice.purchaseOrder.address?.department.name}`}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ flex: 2, fontSize: "15px" }}>Concepto</Text>
            <Text style={{ flex: 1, fontSize: "15px" }}>Precio</Text>
            <Text style={{ flex: 1, fontSize: "15px" }}>Unidades</Text>
            <Text style={{ flex: 1, fontSize: "15px" }}>Total</Text>
          </View>

          {invoice.purchaseOrder.details?.map((detail) => (
            <View key={Math.random()} style={styles.tableContent}>
              <Text style={{ flex: 2, fontSize: "15px" }}>
                {detail.product?.denomination}
              </Text>
              <Text style={{ flex: 1, fontSize: "15px" }}>
                ${detail.product?.salePrice}
              </Text>
              <Text style={{ flex: 1, fontSize: "15px" }}>{detail.amount}</Text>
              <Text style={{ flex: 1, fontSize: "15px" }}>
                ${detail.subtotal}
              </Text>
            </View>
          ))}
        </View>
        {invoice.discountAmount && invoice.discountAmount > 0 && (
          <>
            <Text
              style={{
                fontSize: "15px",
                textAlign: "right",
                marginRight: "30px",
              }}
            >
              Subtotal: ${`${invoice.totalCost}`}
            </Text>
            <Text
              style={{
                fontSize: "15px",
                textAlign: "right",
                marginRight: "30px",
                paddingVertical: "10px",
              }}
            >
              Descuento: ${`${invoice.discountAmount}`}
            </Text>
          </>
        )}
        <Text
          style={{
            fontSize: "24px",
            textAlign: "right",
            marginRight: "30px",
          }}
        >
          Total: ${`${invoice.totalSale}`}
        </Text>
      </Page>
    </Document>
  );
}
