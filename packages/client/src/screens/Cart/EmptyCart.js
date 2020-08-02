import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";

export default function () {
    const [loaded] = useFonts({
        "JosefinSans-SemiBold": require("../../../assets/fonts/JosefinSans-SemiBold.ttf"),
    });

    return (
        loaded && (
            <View style={styles.container}>
                <View style={styles.illustration}>
                    <Image
                        source={require("../../../assets/icons/empty-cart.gif")}
                        style={{
                            flex: 1,
                            height: null,
                            width: null,
                            borderRadius: 200,
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontFamily: loaded ? "JosefinSans-SemiBold" : "",
                        fontSize: 25,
                    }}
                >
                    Your cart is empty
                </Text>
                <Text
                    style={{ fontFamily: loaded ? "JosefinSans-SemiBold" : "" }}
                >
                    Add something to make me happy :)
                </Text>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ECEFF1",
    },
    illustration: {
        width: 200,
        height: 200,
        // borderRadius: 200,
        backgroundColor: "rgba(52, 52, 52, 0.2)",
    },
});
