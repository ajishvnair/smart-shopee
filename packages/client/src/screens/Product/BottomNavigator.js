import React from "react";
import { View } from "react-native";
import { checkAvailability } from "../../common/commonMethods";
import styles from "./styles";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import AddToCart from "../../components/AddToCart/AddToCart";

export default function ({ quantity, total, item }) {
    return (
        <View style={styles.addToCart}>
            <View style={styles.addButtons}>
                <QuantitySelector
                    quantity={quantity}
                    total={total}
                    available={checkAvailability(item.startTime, item.endTime)}
                />
            </View>
            <View style={styles.addButtons}>
                <AddToCart
                    quantity={quantity}
                    available={checkAvailability(item.startTime, item.endTime)}
                />
            </View>
        </View>
    );
}
