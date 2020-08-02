import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function () {
    return (
        <View style={styles.container}>
            <View style={styles.illustration} elevation={10}>
                <Image
                    source={require("../../../assets/icons/empty-cart.png")}
                    style={{
                        flex: 1,
                        height: null,
                        width: null,
                    }}
                />
            </View>
            <Text style={styles.title}>Your cart is empty</Text>
            <Text style={styles.subTitle}>
                Add something to make me happy :)
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    illustration: {
        width: 200,
        height: 200,
        borderRadius: 200,
        backgroundColor: "rgba(52, 52, 52, 0.2)",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        // fontFamily: "Iowan Old Style",
    },
    subTitle: {
        fontSize: 15,
    },
});
