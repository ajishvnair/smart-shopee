import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function () {
    return (
        <View style={styles.loader}>
            <ActivityIndicator
                size="large"
                color="#0000ff"
                // style={styles.loader}
            />
        </View>
    );
}
