import React, { useState } from "react";
import { View, Picker, Text } from "react-native";
import styles from "./styles";

export default function ({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Text>Select Location</Text>
      <Picker
        selectedValue={value}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
        mode="dropdown"
      >
        <Picker.Item label="686512 Pulimudu" value="686512Pulimudu" />
        <Picker.Item label="686512 Parathodu" value="686512Parathodu" />
        <Picker.Item label="686512 Edakkunam" value="686512Edakkunam" />
        <Picker.Item label="686513 Chotti" value="686513Chotti" />
        <Picker.Item label="686514 Chittadi" value="686514Chittadi" />
      </Picker>
    </View>
  );
}
