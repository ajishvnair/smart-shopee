import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function ({ item, quantity }) {
    return (
        <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: item.image }} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.productNameEnglish}</Text>

                <View style={styles.addQuantity}>
                    <View style={styles.addQuantityContainer}>
                        <Text
                            style={{
                                ...styles.quantityText,
                                color: "#C0C0C0",
                            }}
                        >
                            -
                        </Text>
                        <Text
                            style={{
                                ...styles.quantityText,
                                color: "#2cd18a",
                            }}
                        >
                            1
                        </Text>
                        <Text
                            style={{
                                ...styles.quantityText,
                                color: "#2cd18a",
                            }}
                        >
                            +
                        </Text>
                    </View>
                    <Text style={styles.priceText}>₹ 100</Text>
                    <View style={styles.trashContainer}>
                        <Image
                            style={styles.infoPhoto}
                            source={require("../../../assets/icons/cross.png")}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
