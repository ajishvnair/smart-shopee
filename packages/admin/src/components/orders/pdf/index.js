import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        padding: 10,
    },
    products: {
        padding: 5,
        marginLeft: 50,
        fontSize: 13,
        flexDirection: "row",
    },
    product: {
        borderWidth: 1,
        width: "200px",
        padding: 5,
    },
});

// Create Document Component
const MyDocument = ({ value }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Name:{`  ${value.userName}`}</Text>
            </View>
            <View style={styles.section}>
                <Text>Phone Number:{`  ${value.mobileNo}`}</Text>
            </View>
            <View style={styles.section}>
                <Text>Location:{`  ${value.location}`}</Text>
            </View>
            <View style={styles.section}>
                <Text>Address:{`  ${value.address}`}</Text>
            </View>
            <View style={styles.section}>
                <Text>Amount Payable:{`  ${value.totalAmount} `}</Text>
            </View>
            <View style={styles.section}>
                <Text>Products</Text>
            </View>
            {(value.products || []).map((pro) => (
                <View style={styles.products}>
                    <View style={styles.product}>
                        <Text>{`${pro.productNameEnglish}`}</Text>
                    </View>
                    <View style={styles.product}>
                        <Text>{`${pro.unit}`}</Text>
                    </View>
                    <View style={styles.product}>
                        <Text>{`${pro.quantity} unit`}</Text>
                    </View>
                    <View style={styles.product}>
                        <Text>{`${pro.sellingPrice} Rs/unit`}</Text>
                    </View>
                </View>
            ))}
        </Page>
    </Document>
);

export default MyDocument;
