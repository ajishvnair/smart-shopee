import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay, Button } from "react-native-elements";
import { useFonts } from "expo-font";

export default function ({ visible, setVisible }) {
    const [loaded] = useFonts({
        "JosefinSans-SemiBold": require("../../../assets/fonts/JosefinSans-SemiBold.ttf"),
    });
    return (
        <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
            <View style={styles.container}>
                <Text
                    style={{
                        fontFamily: loaded ? "JosefinSans-SemiBold" : "",
                        fontSize: 20,
                        margin: 10,
                        color: "red",
                    }}
                >
                    Minimum cart value is ₹ 350
                </Text>
                <Button
                    buttonStyle={styles.btn}
                    title="Add More"
                    onPress={() => setVisible(false)}
                />
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        width: 100,
        height: 30,
    },
});
