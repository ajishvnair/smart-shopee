import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Overlay, Button } from "react-native-elements";
import { useFonts } from "expo-font";

export default function ({ navigation, visible, setVisible, total }) {
    const [loaded] = useFonts({
        "JosefinSans-SemiBold": require("../../../assets/fonts/JosefinSans-SemiBold.ttf"),
    });
    return (
        <Overlay
            overlayStyle={styles.overlay}
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.container}>
                <View style={styles.illustartion}>
                    <Image
                        source={require("../../../assets/icons/delivery.gif")}
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
                    ₹ {total}
                </Text>
                <Text
                    style={{
                        fontFamily: loaded ? "JosefinSans-SemiBold" : "",
                        fontSize: 15,
                    }}
                >
                    Order placed successfully
                </Text>
                <Button
                    title="Ok"
                    onPress={() => {
                        setVisible(false);
                        navigation.navigate("Home");
                    }}
                    buttonStyle={styles.btn}
                />
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay: {
        // backgroundColor: "#ECEFF1",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    btn: {
        width: 70,
        borderRadius: 20,
        margin: 10,
        backgroundColor: "#eec248",
    },
    illustartion: {
        width: 150,
        height: 150,
    },
});
