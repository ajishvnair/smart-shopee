import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Button } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default function ({ setStatus }) {
    return (
        <View style={{ height: height / 3, justifyContent: "center" }}>
            <Button
                title="SIGN IN"
                buttonStyle={{ ...styles.button, backgroundColor: "#B3B6B7" }}
                onPress={() => setStatus("signIn")}
            />
            <Button
                title="REGISTER"
                buttonStyle={{ ...styles.button, backgroundColor: "#FFA500" }}
                onPress={() => setStatus("otp")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        marginHorizontal: 50,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
});
