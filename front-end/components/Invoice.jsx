import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const Invoice = ({ cartItems }) => {
  // Calculate total price
  const totalCost = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>Invoice</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Type of Product</Text>
            <Text style={styles.tableCol}>Name of Product</Text>
            <Text style={styles.tableCol}>Quantity</Text>
            <Text style={styles.tableCol}>Price</Text>
            <Text style={styles.tableCol}>Total Price</Text>
          </View>
          {cartItems.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{item.type}</Text>
              <Text style={styles.tableCol}>{item.name}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{item.price}</Text>
              <Text style={styles.tableCol}>{item.quantity * item.price}</Text>
            </View>
          ))}
          {/* Total price row */}
          <View style={[styles.tableRow, styles.tableFooter]}>
            <Text style={[styles.tableCol, styles.tableFooterText]}>Total</Text>
            <Text style={[styles.tableCol, styles.tableFooterText]}></Text>
            <Text style={[styles.tableCol, styles.tableFooterText]}></Text>
            <Text style={[styles.tableCol, styles.tableFooterText]}></Text>
            <Text style={[styles.tableCol, styles.tableFooterText]}>
              {totalCost}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Register a font
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

// Define some styles
const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    textAlign: "center",
  },
  page: {
    alignContent: "center",
  },
  table: {
    marginTop: 20,
    marginLeft: 20,
    width: "75%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 13,
  },
  tableHeader: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    backgroundColor: "#eee",
  },
  tableFooter: {
    borderTopWidth: 1,
  },
  tableFooterText: {
    fontWeight: "bold",
  },
});

export default Invoice;
