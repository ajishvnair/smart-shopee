import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function ({ quantity, total, available }) {
    return (
        <View style={styles.buttonContainer}>
            {available ? (
                <Text style={styles.text}>
                    {quantity} Item | ₹ {total}
                </Text>
            ) : (
                <Text style={styles.text}>😟We Are Sorry</Text>
            )}
        </View>
    );
}
