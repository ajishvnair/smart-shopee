import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function () {
    return (
        <View style={styles.delivery}>
            <Text style={styles.deliveryHeading}>Delivery Details</Text>
            <View style={styles.divider}></View>

            <View style={styles.location}>
                <Image
                    style={styles.locationIcon}
                    source={require("../../../assets/icons/pin.png")}
                />
                {/* <Text style={styles.address}>
                                    Pulimudu, Parathodu, 686512{" "}
                                </Text> */}
                {/* location */}
            </View>
            <Text style={styles.subText}>
                We will reach out you with in 5 hours
            </Text>
            <Text style={styles.subText}>
                Delivery time will vary depending on products in your cart
            </Text>
            <Text style={styles.subText}>
                For any queries contact our customer support
            </Text>
            <Text style={styles.subText}>+91 9988776655</Text>
        </View>
    );
}
