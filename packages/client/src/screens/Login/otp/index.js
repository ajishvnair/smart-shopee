import React from "react";
import { Input, Icon, Button } from "react-native-elements";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export default function () {
    return (
        <View style={styles.main}>
            <View style={styles.textInput}>
                <Input
                    label="Register with Mobile Number"
                    labelStyle={{ color: "white" }}
                    placeholder="987656789"
                    containerStyle={styles.input}
                    keyboardType="numeric"
                    inputStyle={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                    }}
                    leftIcon={
                        <Icon name="phone" type="font-awesome" color="white" />
                    }
                />
            </View>
            <Button
                buttonStyle={{ ...styles.button, backgroundColor: "#FFA500" }}
                title="Generate OTP"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        // backgroundColor: "white",
        height: "60%",
        alignItems: "center",
    },
    textInput: {
        // opacity: 0.4,
        // backgroundColor: "black",
        // borderColor: "black",
        // borderWidth: 1,
        // borderBottomColor: "white",
        // // borderRadius: 25,
        // borderBottomWidth: 1,
        marginHorizontal: 10,
        // height: 40,
    },
    input: {
        // opacity: 0.1,
        // backgroundColor: "black",
        color: "white",
        fontSize: 28,
        // paddingVertical: 5,
        // paddingHorizontal: 10,
        fontWeight: "bold",
        textAlign: "center",
        // height: 50,
        // width: "",
        backgroundColor: "transparent",
    },
    button: {
        width: 200,
        backgroundColor: "white",
        height: 50,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
});
