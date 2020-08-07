import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Overlay, Button } from "react-native-elements";
import { useFonts } from "expo-font";

export default function ({
    navigation,
    visible,
    setVisible,
    total,
    page,
    deliveryCharge,
    loading,
    confirmOrder,
    getTotal,
}) {
    const [loaded] = useFonts({
        "JosefinSans-SemiBold": require("../../../assets/fonts/JosefinSans-SemiBold.ttf"),
    });

    const Confirm = () => (
        <>
            <View style={styles.illustartion}>
                <Image
                    source={require("../../../assets/icons/smiley.gif")}
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
                    marginTop: -30,
                }}
            >
                ₹ {total}{" "}
                <Text style={{ fontSize: 15 }}>+ ₹ {deliveryCharge} </Text>
            </Text>
            <Text
                style={{
                    fontFamily: loaded ? "JosefinSans-SemiBold" : "",
                    fontSize: 15,
                }}
            >
                You have to pay
            </Text>
            <View style={styles.btnContanier}>
                <Button
                    title="Confirm"
                    onPress={() => {
                        // setVisible(false);
                        confirmOrder();
                    }}
                    buttonStyle={styles.btn}
                    loading={loading}
                    titleStyle={{
                        fontFamily: loaded ? "JosefinSans-SemiBold" : "",
                        color: "black",
                    }}
                    loadingStyle={{
                        color: "black",
                    }}
                />
                <Button
                    title="Cancel"
                    onPress={() => {
                        setVisible(false);
                    }}
                    buttonStyle={styles.btnSecondary}
                    titleStyle={{
                        fontFamily: loaded ? "JosefinSans-SemiBold" : "",
                        color: "black",
                    }}
                    disabled={loading}
                    onPress={() => {
                        setVisible(false);
                    }}
                />
            </View>
        </>
    );

    const Success = () => (
        <>
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
                ₹ {getTotal()}
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
        </>
    );

    const getContent = () => {
        if (page === "confirm") return <Confirm />;
        return <Success />;
    };
    return (
        <Overlay
            overlayStyle={styles.overlay}
            isVisible={visible}
            // onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.container}>{getContent()}</View>
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
        width: 100,
        borderRadius: 20,
        margin: 10,
        backgroundColor: "#eec248",
        borderColor: "black",
        borderWidth: 1,
    },
    illustartion: {
        width: 200,
        height: 150,
    },
    btnContanier: {
        flexDirection: "row",
        marginTop: 10,
    },
    btnSecondary: {
        width: 100,
        borderRadius: 20,
        margin: 10,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
    },
});
