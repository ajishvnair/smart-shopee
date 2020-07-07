import React from "react";
import { View } from "react-native";

export default function (props) {
  return (
    <View
      style={[
        {
          height: 18,
          width: 18,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        },
        props.style,
      ]}
    >
      {props.selected ? (
        <View
          style={{
            height: 9,
            width: 9,
            borderRadius: 6,
            backgroundColor: "#000",
          }}
        />
      ) : null}
    </View>
  );
}
