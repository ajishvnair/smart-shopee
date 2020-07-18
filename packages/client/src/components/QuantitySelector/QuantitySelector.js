import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function ({ quantity, total }) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.text}>{quantity} Item | ₹ {total}</Text>
    </View>
  );
}

