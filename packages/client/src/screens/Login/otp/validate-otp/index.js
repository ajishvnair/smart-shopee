import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import firebase from "firebase";

export default function ({ setStatus, verificationId }) {
    // otp
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    // validate otp
    const validateOtp = async () => {
        setLoading(true);
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                otp
            );
            await firebase.auth().signInWithCredential(credential);
            setStatus("register");
        } catch (err) {
            setErrorMessage("Incorrect OTP");
            setLoading(false);
        }
    };
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
                // opertaions
                value={otp}
                onChangeText={(value) => setOtp(value)}
                errorMessage={errorMessage}
                disabled={loading}
            />
            <Button
                title="Verify"
                buttonStyle={{
                    ...styles.button,
                    backgroundColor: "#FFA500",
                }}
                onPress={validateOtp}
                loading={loading}
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
