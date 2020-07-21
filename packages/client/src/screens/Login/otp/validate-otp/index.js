import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function () {
    return (
        <>
            <Input
                label="Enter OTP"
                labelStyle={{ color: "white" }}
                containerStyle={styles.input}
                keyboardType="numeric"
                inputStyle={{
                    fontSize: 20,
                    color: "white",
                    fontWeight: "bold",
                }}
                leftIcon={
                    <Icon name="shield" type="font-awesome" color="white" />
                }
            />
            <Button
                title="Verify"
                buttonStyle={{
                    ...styles.button,
                    backgroundColor: "#FFA500",
                }}
            />
        </>
    );
}
const styles = StyleSheet.create({
    input: {
        width: 200,
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "transparent",
    },
    button: {
        width: 100,
        backgroundColor: "white",
        height: 50,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
});
