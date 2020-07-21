import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function ({ setStatus }) {
    return (
        <View style={{ height: height / 3, justifyContent: "center" }}>
            <TouchableHighlight
                activeOpacity={0.4}
                underlayColor="#DDDDDD"
                style={styles.button}
                onPress={() => setStatus("signIn")}
            >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    SIGN IN
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={{ ...styles.button, backgroundColor: "#FFA500" }}
                activeOpacity={0.1}
                underlayColor="#DDDDDD"
                onPress={() => setStatus("otp")}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    REGISTER
                </Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
});
