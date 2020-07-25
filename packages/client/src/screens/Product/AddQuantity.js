import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "./styles";

export default function ({ quantityOperation, quantity }) {
    return (
        <View style={styles.addQuantity}>
            <TouchableHighlight
                activeOpacity={0.1}
                underlayColor="#DDDDDD"
                onPress={() => quantityOperation("-")}
            >
                <Text
                    style={{
                        ...styles.quantityText,
                        color: "#C0C0C0",
                    }}
                >
                    -
                </Text>
            </TouchableHighlight>
            <Text
                style={{
                    ...styles.quantityText,
                    color: "#2cd18a",
                }}
            >
                {quantity}
            </Text>
            <TouchableHighlight
                activeOpacity={0.1}
                underlayColor="#DDDDDD"
                onPress={() => quantityOperation("+")}
            >
                <Text
                    style={{
                        ...styles.quantityText,
                        color: "#2cd18a",
                    }}
                >
                    +
                </Text>
            </TouchableHighlight>
        </View>
    );
}
