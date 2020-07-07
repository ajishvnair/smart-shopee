import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";

export default function ({ value, onChange, placeholder, type }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      keyboardType={type}
      onChangeText={(text) => onChange(text)}
      placeholder={placeholder}
    />
  );
}
